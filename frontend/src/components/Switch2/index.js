import { ConfigProvider, Descriptions } from "antd";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useDevices } from "../../config/deviceMQTT";
import { useMQTT } from "../../config/MQTTContext";
import { postActionHistory } from "../../service/deviceService";
import "./Switch2.scss";

// const SwitchComponent = ({ topic }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const client = mqtt.connect('mqtt://192.168.1.6:1883', { // Thay đổi địa chỉ IP của MQTT broker
//     username: 'minhanh',
//     password: 'MinhAnh_1',
//   });



function Switches2() {

  const [led1, setLed1] = useState(null);
  const [led2, setLed2] = useState(null);

  const { client, connected } = useMQTT();
  const { isLed1On, toggleLed1, isLed2On, toggleLed2 } = useDevices();
  const [device, setDevice] = useState("");
  const [action, setAction] = useState("");

  const led1RefCallback = (dotLottie) => {
    setLed1(dotLottie);
  };

  const led2RefCallback = (dotLottie) => {
    setLed2(dotLottie);
  };


  const handleLed1Switch = (state) => {
    setDevice("Led1");
    setAction(state);
    let led1State = state ? "1" : "0";
    if (client && connected) {
      client.publish("home/led1", led1State);
    }
    toggleLed1();
    if (isLed1On) {
      led1.stop();
    } else {
      led1.play();
    }
  };

  const handleLed2Switch = (state) => {
    setDevice("Led2");
    setAction(state);
    let led2State = state ? "1" : "0";
    if (client && connected) {
      client.publish("home/led2", led2State);
    }
    toggleLed2();
    if (isLed2On) {
      led2.stop();
    } else {
      led2.play();
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
            autoplay={isLed1On}
            dotLottieRefCallback={led1RefCallback}
          />
          <p className="name-switch">Led 1</p>
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
            checked={isLed1On}
            onChange={() => handleLed1Switch(!isLed1On)}
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
              src="https://lottie.host/af13daac-d33a-4370-81cb-889542a67c2e/v71ZzBSYu4.json"
              loop
              autoplay={isLed2On}
              dotLottieRefCallback={led2RefCallback}
            />
            <p className="name-switch">Led 2</p>
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
              checked={isLed2On}
              onChange={() => handleLed2Switch(!isLed2On)}
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
      <div style={{ padding: "0px 80px 0px 0px", marginBottom: "20px", marginTop: "20px" }}>
        {/* <h3 style={{ color: "rgba(60, 160, 236, 1)" }}>Device's Switch</h3> */}

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

export default Switches2;
