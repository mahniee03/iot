import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import mqtt from 'mqtt';

const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [dataSensor, setDataSensor] = useState({});
    
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [brightnessData, setBrightnessData] = useState([]);
    const [randomValueData, setRandomValueData] = useState([]);
    const [timeData, setTimeData] = useState([]);

    const handleNewData = useCallback((newData) => {
        console.log('Updating sensor data:', newData); // Log dữ liệu đầu vào
      
        const maxDataPoints = 10;
      

        setTemperatureData(prev => {
          const updated = [...prev, newData.temperature];
          console.log('Updated Temperature Data:', updated);
          return updated.slice(-maxDataPoints);
        });
      
        setHumidityData(prev => {
          const updated = [...prev, newData.humidity];
          console.log('Updated Humidity Data:', updated);
          return updated.slice(-maxDataPoints);
        });
      
        setBrightnessData(prev => {
          const updated = [...prev, newData.brightness];
          console.log('Updated Brightness Data:', updated);
          return updated.slice(-maxDataPoints);
        });

        setRandomValueData(prev => {
          const updated = [...prev, newData.random_value];
          console.log('Updated Random Value Data:', updated);
          return updated.slice(-maxDataPoints);
        });

        setTimeData(prev => {
          const updated = [...prev, newData.time];
          console.log('Updated Time Data:', updated);
          return updated.slice(-maxDataPoints);
        });
      }, []);
      

    useEffect(() => {
      const options = {
        host: '194.195.90.124', // Địa chỉ MQTT broker
        port: 9001,             // Port MQTT
        username: 'test',       // Tên đăng nhập
        password: '123456',      // Mật khẩu
      };
        const mqttClient = mqtt.connect(options);

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttClient.subscribe('home/sensordata');
            setConnected(true);
        });

        mqttClient.on('message', (topic, message) => {
            if (topic === 'home/sensordata') {
              const newData = JSON.parse(message.toString());
              console.log('Received MQTT data:', newData); // Kiểm tra dữ liệu nhận được
              setDataSensor(newData);
              handleNewData(newData);
            }
          });
          

        mqttClient.subscribe('home/sensordata', (err) => {
            if (err) {
              console.error('Failed to subscribe to topic:', err);
            } else {
              console.log('Subscribed to topic: home/sensordata');
            }
          });
          

        mqttClient.on('error', (err) => {
            console.error('MQTT connection error: ', err);
        });

        mqttClient.on('close', () => {
            console.log('Disconnected from MQTT broker');
            setConnected(false);
        });

        setClient(mqttClient);

        return () => {
            if (mqttClient) {
                mqttClient.end();
            }
        };
    }, [handleNewData]);

    

    return (
        <MQTTContext.Provider value={{ client, connected, dataSensor, temperatureData, humidityData, brightnessData, randomValueData, timeData }}>
            {children}
        </MQTTContext.Provider>
    );
};

export const useMQTT = () => {
    const context = useContext(MQTTContext);
    if (!context) {
        throw new Error('useMqtt must be used within an MqttProvider');
    }
    return context;
};