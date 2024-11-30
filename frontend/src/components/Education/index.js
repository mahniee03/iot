import { ConfigProvider, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

function Education() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 17,
            
          },
        }}
      >
        <div style={{marginTop: "30px"}}>
          <Timeline
            items={[
              {
                children: "2013 - Graduated at Tien Duong Primary School",
                color: "#1E3175",
              },
              {
                children: "2018 - Graduated at Nguyen Huy Tuong Secondary School",
                color: "#1E3175",
              },
              {
                children: "2021 - Graduated at Dong Anh High School",
                color: "#1E3175",
              },
              {
                children:
                  "2024 - Studying at Posts and Telecommunications Institute of Technology",
                // dot: <ClockCircleOutlined />,
                color: "#1E3175",
              },
            ]}
          />
        </div>
      </ConfigProvider>
    </>
  );
}

export default Education;