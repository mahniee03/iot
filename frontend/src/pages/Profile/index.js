import React from "react";
import { ConfigProvider, Descriptions } from "antd";
import { Card } from "antd";
import { Col, Row, Tabs } from "antd";
import { FaBook } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { BsWrenchAdjustable, BsTerminalFill } from "react-icons/bs";
import Education from "../../components/Education";
import Skills from "../../components/Skill";
import Projects from "../../components/Project";
import Details from "../../components/Details";
const { Meta } = Card;

const items = [
  {
    key: "1",
    label: "Name",
    children: "Đàm Minh Anh",
  },
  {
    key: "2",
    label: "Date of birth",
    children: "20/02/2003",
  },
  {
    key: "3",
    label: "Address",
    children: "Hà Nội, Việt Nam",
  },

  {
    key: "5",
    label: "Gender",
    children: "Female",
  },
  {
    key: "6",
    label: "Gmail",
    children: "damminhanh.work@gmail.com",
  },
  {
    key: "2",
    label: "Phone number",
    children: "0961700689",
  },
];

const tabItems = [
  {
    key: 1,
    label: "Project's Details",
    children: <Details />,
    icon: <AiFillFile />,
  },
  {
    key: 2,
    label: "Education",
    children: <Education />,
    icon: <FaBook />,
  },
  {
    key: 3,
    label: "Skills",
    children: <Skills />,
    icon: <BsWrenchAdjustable />,
  },
  {
    key: 4,
    label: "Projects",
    children: <Projects />,
    icon: <BsTerminalFill />,
  },
];

function Profile() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Descriptions: {
              titleColor: "#1E3175",
            },
            Tabs: {
              itemColor: "#000",
              itemSelectedColor: "#1E3175",
              inkBarColor: "#1E3175",
              itemHoverColor: "#1E3175",
              itemActiveColor: "#1E3175",
            }
          },
          token: {
            fontSize: 16,
          },
        }}
      >
        <Row>
          <Col span={18} push={6}>
            <Descriptions title="My Profile" margin={10} layout="vertical" items={items} />
            <br />
            <Tabs defaultActiveKey="3" items={tabItems} />
          </Col>
          <Col span={6} pull={18}>
          <a href="https://www.facebook.com/profile.php?id=100044682945477" target="_blank" rel="noopener noreferrer">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <img
                  alt="avt"
                  src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/332495579_758789185867999_8467011211957057698_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGF8V3qlC2bh-nZ8Do2GNwl2YuFPbTOnXTZi4U9tM6ddIXYYNJPa9qlEd5trTbZAHJmE6JqV1NBDfuSsMIAJ9JG&_nc_ohc=v9YyixnYVi4Q7kNvgFrqcXo&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=ASDf_-bxARqocqFkztY9HT2&oh=00_AYBOSlV48rTkEMIYoGlt8J63mPmAYcdnR2zHxfdX8i0XRg&oe=6755BD4A"
                />
              }
            >
              <Meta
                title="Đàm Minh Anh"
                description="Posts and Telecommunications Institute of Technology"
              />
            </Card>
            </a>
          </Col>
        </Row>
      </ConfigProvider>
    </>
  );
}

export default Profile;
