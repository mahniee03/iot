import { Button, ConfigProvider, Input, Space, Table, Tag, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect} from 'react';
import Highlighter from 'react-highlight-words';
import { getDataSensor } from "../../service/dataService";
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
            Close
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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Brightness (lx)",
      dataIndex: "brightness",
      render: (text) => <div style={{ color: "#FFA500" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("brightness"),
    },
    {
      title: "Temperature (°C)",
      dataIndex: "temperature",
      render: (text) => <div style={{ color: "red" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("temperature"),
    },
    {
      title: "Humidity (%RH)",
      dataIndex: "humidity",
      render: (text) => <div style={{ color: "blue" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("humidity"),
    },
    {
      title: 'Random',
      dataIndex: 'random_value',
      render: (text) => <div style={{ color: "green" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("random_value"),
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      ...getColumnSearchProps("time"),

    },
  ];

  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPageSize(pageSize);
    setPage(current);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setPageSize(pagination.pageSize);
    setPage(pagination.current);
    if (sorter.order !== undefined) {
      setSortField(sorter.field)
      setSortOrder(sorter.order);
    } else {
      setSortField("")
      setSortOrder("");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getDataSensor(pageSize, page, searchText, searchedColumn, sortField, sortOrder);
      setTotalCount(result.totalCount);
      if (result.data) {
        const formattedData = result.data.map(record => ({
          ...record,
          time: formatDate(record.time),
        }));
        setData(formattedData);
      }
    }
    getData();
  }, [page, pageSize, searchText, searchedColumn, sortField, sortOrder])

  return (
    <>
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
            total: totalCount
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

