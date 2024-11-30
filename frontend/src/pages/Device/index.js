import { Button, ConfigProvider, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { getActionHistory } from "../../service/deviceService";
import { formatDate } from "../../config/formatDate";


function Device() {

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Clear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setPageSize(pagination.pageSize);
    setPage(pagination.current);
  };
  
  const onShowSizeChange = (current, size) => {
    console.log(current, size);
    setPageSize(size);
    setPage(current);
  }
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      // key: "id",
      // sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Device",
      dataIndex: "device",
      ...getColumnSearchProps("device")

    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      ...getColumnSearchProps("action"),
      render: (text) => {
        if (text === "1" || text === 1) {
          // Trạng thái là "1" (ON)
          return <Tag color="green">ON</Tag>;
        } else if (text === "0" || text === 0) {
          // Trạng thái là "0" (OFF)
          return <Tag color="red">OFF</Tag>;
        } else {
          // Trường hợp không xác định
          return <Tag color="default">—</Tag>;
        }
      },
      filters: [
        {
          text: "ON",
          value: "1",
        },
        {
          text: "OFF",
          value: "0",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.action === value,
    },
    
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      ...getColumnSearchProps("time"),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await getActionHistory(pageSize, page, searchText, searchedColumn);
        setTotalCount(result.totalCount);
        if(result.data){
          const formattedData = result.data.map(record => ({
            ...record,
            time: formatDate(record.time),
          }));
          setData(formattedData);
        }
    }
    getData();
  }, [page, pageSize, searchText, searchedColumn])

  return (
    <>
      {/* <h1>Device's State</h1> */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF7F50",
          },
        }}
      >
        <Table
          pagination={{
            position: ["topRight", "bottomCenter"],
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChange,
            defaultCurrent: 1,
            total: totalCount,
          }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </ConfigProvider>
    </>
  );
}

export default Device;
