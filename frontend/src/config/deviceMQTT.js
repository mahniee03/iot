import React, { createContext, useState, useContext, useCallback } from 'react';

const deviceMQTT = createContext();

export const DeviceProvider = ({ children }) => {
  const [isFanOn, setIsFanOn] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isACOn, setIsACOn] = useState(false);
  const [isLed1On, setIsLed1On] = useState(false);
  const [isLed2On, setIsLed2On] = useState(false);

  const toggleFan = useCallback(() => setIsFanOn(prev => !prev), []);
  const toggleLight = useCallback(() => setIsLightOn(prev => !prev), []);
  const toggleAC = useCallback(() => setIsACOn(prev => !prev), []);
  const toggleLed1 = useCallback(() => setIsLed1On(prev => !prev), []);
  const toggleLed2 = useCallback(() => setIsLed2On(prev => !prev), []);

  return (
    <deviceMQTT.Provider value={{
      isFanOn, toggleFan,
      isLightOn, toggleLight,
      isACOn, toggleAC,
      isLed1On, toggleLed1,
      isLed2On, toggleLed2,
    }}>
      {children}
    </deviceMQTT.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(deviceMQTT);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};