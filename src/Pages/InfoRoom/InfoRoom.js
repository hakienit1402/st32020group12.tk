import React, { useState, useEffect } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  Row,
  Col,
  Input,
  Button,
  Popover,
  Descriptions,
  Form,
  Select,
  Drawer,
  Switch,
  Divider,
  Table,
  Modal,
  Space,
} from "antd";
import {
  useHistory,
  useParams
} from "react-router-dom";
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
export const InfoRoom = () => {
  const { id } = useParams();
  //console.log(id)
  const [dataShow, setDataShow] = useState([]);
  const [search, setSearch] = useState("");
  const [member, setMember] = useState(
    JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member"))
      : []
  );
  const [infoEdit, setInfoEdit] = useState([]);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("rooms"))
      ? JSON.parse(localStorage.getItem("rooms"))
      : []
  );

  const memberFilter = member.filter((mem) => {
    return mem.idroom.includes(dataShow.id);
  });
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(data));
    localStorage.setItem("member", JSON.stringify(member));
  }, [data, member]);
  const idmem = () => {
    return s4() + "-" + s4();
  };
  const onSearch = (value) => {
    setSearch(value);
  };
  const onPaid = () => {
    setDataShow({
      ...dataShow,
      status: dataShow.status == 0 ? 1 : 0,
    });
    let dataIndex = data.findIndex((item) => item.id === dataShow.id);
    const tmpdata = [...data];
    tmpdata[dataIndex].status = dataShow.status == 0 ? 1 : 0;
    setData(tmpdata);
  };

  //table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => onDeleteMem(record)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const onAddMember = () => {
    setMember([
      ...member,
      {
        key: idmem(),
        idroom: dataShow.id,
        name: "",
        phone: "",
        gender: "",
        status: 0,
      },
    ]);
  };
  const onEditInfo = (info) => {
    setInfoEdit(info);
    setIsEditInfo(true);
    //console.log(info);
  };
  const onSaveInfo = (values) => {
    //console.log(values);
    let dataIndex = member.findIndex((item) => item.key === infoEdit.key);
    const tmpmember = [...member];
    tmpmember[dataIndex].name = values.name;
    tmpmember[dataIndex].phone = values.phone;
    tmpmember[dataIndex].gender = values.gender;
    setMember(tmpmember);
    setIsEditInfo(false);
  };
  const onDeleteMem = (record) => {
    // //console.log(record)
    let dataIndex = member.findIndex((item) => item.key === record.key);
    const newDataMem = [...member];
    newDataMem.splice(dataIndex, 1);
    setMember(newDataMem);
  };
  const infoMember = (value) => {
    return isEditInfo == true ? (
      <Form
        layout="inline"
        size="small"
        initialValues={{
          name: value.name,
          phone: value.phone,
          gender: value.gender,
        }}
        onFinish={onSaveInfo}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input user name!",
            },
          ]}
        >
          <Input placeholder="Name..." />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input phone!",
            },
          ]}
        >
          <Input placeholder="Phone number..." style={{ width: 150 }} />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "Please input gender!",
            },
          ]}
        >
          <Select style={{ width: 100 }}>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    ) : (
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          {"Name: " +
            value.name +
            " - Phone: " +
            (value.phone !== "" ? value.phone : "Please update phone!") +
            " - Gender: " +
            (value.gender !== "" ? value.gender : "Please update gender!")}
        </p>
        <Button style={{ marginRight: 20 }} onClick={() => onEditInfo(value)}>
          Edit
        </Button>
      </Row>
    );
  };

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Room </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 480,
          overflow: "auto",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Search
            placeholder="Search user name ..."
            onSearch={(value) => onSearch(value)}
            style={{ width: 300,float:'right'}}
          />
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              size="small"
              title={"Room " + dataShow.id}
              extra={
                <Switch
                  checked={dataShow.status == 1 ? true : false}
                  onChange={onPaid}
                  checkedChildren="Paid"
                  unCheckedChildren="Unpaid"
                />
              }
            >
              <Descriptions title="Infomation Room" column={1}>
                <Descriptions.Item label="Name">
                  {dataShow.name}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {dataShow.date}
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  {dataShow.type}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={16}>
            <Divider>List members</Divider>
            <Table
              columns={columns}
              dataSource={memberFilter}
              pagination={{ pageSize: 4 }}
              size="small"
              title={() => <Button onClick={onAddMember}>Add member</Button>}
              expandable={{
                expandedRowRender: (record) => infoMember(record),
              }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
