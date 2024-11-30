import { ConfigProvider, Descriptions } from "antd";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useDevices } from "../../config/deviceMQTT";
import { useMQTT } from "../../config/MQTTContext";
import { postActionHistory } from "../../service/deviceService";
import "./Switch.scss";

// const SwitchComponent = ({ topic }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const client = mqtt.connect('mqtt://192.168.1.6:1883', { // Thay đổi địa chỉ IP của MQTT broker
//     username: 'minhanh',
//     password: 'MinhAnh_1',
//   });



function Switches() {

  const [fan, setFan] = useState(null);
  const [light, setLight] = useState(null);
  const [AC, setAC] = useState(null);

  const { client, connected } = useMQTT();
  const { isFanOn, toggleFan, isLightOn, toggleLight, isACOn, toggleAC } = useDevices();
  const [device, setDevice] = useState("");
  const [action, setAction] = useState("");

  const fanRefCallback = (dotLottie) => {
    setFan(dotLottie);
  };

  const lightRefCallback = (dotLottie) => {
    setLight(dotLottie);
  };

  const ACRefCallback = (dotLottie) => {
    setAC(dotLottie);
  };


  const handleFanSwitch = (state) => {
    setDevice("Fan");
    setAction(state);
    let fanState = state ? "1" : "0";
    if (client && connected) {
      client.publish("home/fan", fanState);
    }
    toggleFan();
    if (isFanOn) {
      fan.stop();
    } else {
      fan.play();
    }
  };

  const handleLightSwitch = (state) => {
    setDevice("Light");
    setAction(state);
    let lightState = state ? "1" : "0";
    if (client && connected) {
      client.publish("home/light", lightState);
    }
    toggleLight();
    if (isLightOn) {
      light.stop();
    } else {
      light.play();
    }
  };

  const handleACSwitch = (state) => {
    setDevice("Air Conditioner");
    setAction(state);
    let acState = state ? "1" : "0";
    if (client && connected) {
      client.publish("home/air_conditioner", acState);
    }
    toggleAC();
    if (isACOn) {
      AC.stop();
    } else {
      AC.play();
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="label-switch">
          <DotLottieReact
            src="https://lottie.host/af13daac-d33a-4370-81cb-889542a67c2e/v71ZzBSYu4.json"
            loop
            autoplay={isLightOn}
            dotLottieRefCallback={lightRefCallback}
          />
          <p className="name-switch">Light</p>
        </div>

      ),
      children: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "green",
            },
          }}
        >
          <Switch
            checked={isLightOn}
            onChange={() => handleLightSwitch(!isLightOn)}
          />
        </ConfigProvider>
      ),
      span: 3,
    },
    {
      key: "2",
      label: (
        <div className="label-switch">
          <DotLottieReact
            src="https://lottie.host/c792ef80-50c9-424f-8a2a-89c6e7ac1526/MMOA5SODEE.json"
            loop
            autoplay={isFanOn}
            dotLottieRefCallback={fanRefCallback}
          />
          <p className="name-switch">Fan</p>
        </div>
      ),
      children: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "green",
            },
          }}
        >
          <Switch
            checked={isFanOn}
            onChange={() => handleFanSwitch(!isFanOn)}
          />
        </ConfigProvider>
      ),
      span: 3,
    },
    {
      key: "3",
      label: (
        <div className="label-switch">
          <DotLottieReact
            src="https://lottie.host/b3726b9f-f5cd-436f-a1cd-73846ee6282f/GDZMRCniyZ.json"
            loop
            autoplay={isACOn}
            dotLottieRefCallback={ACRefCallback}
          />
          <p className="name-switch">AC</p>
        </div>
      ),
      children: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "green",
            },
          }}
        >
          <Switch checked={isACOn}
            onChange={() => handleACSwitch(!isACOn)}
          />
        </ConfigProvider>
      ),
      span: 3,
    },
  ];

  useEffect(() => {
    if (device !== "" && action !== "") {
      const actionHistoryData = {
        device: device,
        action: action ? "1" : "0",
      };

      const postData = async () => {
        const result = await postActionHistory(actionHistoryData);
        if (result) {
          console.log(result);
        }
      };

      postData();
      console.log(actionHistoryData);
    }
  }, [device, action]);

  return (
    <>
      <div style={{ padding: "0px 80px 0px 0px", marginBottom: "20px" }}>
        <h3 style={{ color: "rgba(60, 160, 236, 1)" }}>Device's Switch</h3>

        <ConfigProvider

          theme={{
            token: {
              colorSplit: "gray",
            },
            components: {
              Descriptions: {
                labelBg: "white",
              },
            },
          }}
        >
          <Descriptions bordered items={items} />
        </ConfigProvider>
      </div>
    </>
  );
}

export default Switches;
