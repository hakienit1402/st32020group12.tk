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

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
export const Room = () => {
  const [visible, setVisible] = useState(false);
  const [visiblePop, setVisiblePop] = useState(false);
  const [visibleDraw, setVisibleDraw] = useState(false);
  const [dataShow, setDataShow] = useState([]);
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
 
  const [member, setMember] = useState(JSON.parse(localStorage.getItem("member"))
  ? JSON.parse(localStorage.getItem("member"))
  : []);
  const [infoEdit,setInfoEdit] = useState([])
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("rooms"))
      ? JSON.parse(localStorage.getItem("rooms"))
      : []
  );

  const dataFilter = data.filter((value) => {
    return value.name.toLowerCase().includes(search.toLowerCase());
  });
  const memberFilter = member.filter((mem)=> {
    return mem.idroom.includes(dataShow.id) 
  })
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(data));
    localStorage.setItem('member',JSON.stringify(member))
  }, [data,member]);
  const guid = () => {
    return s4();
  };
  const idmem = () => {
    return s4() + "-" + s4();
  };
  const onShow = (item) => {
    setVisible(true);
    setDataShow({
      ...dataShow,
      date: item.date==''? Date() : item.date,
      type: item.type,
      name: item.name,
      id: item.id,
      status: item.status,
    });
  };
  const onSearch = (value) => {
    setSearch(value);
  };
  const onAdd = () => {
    setData([
      ...data,
      {
        id: guid(),
        name: "Un lease",
        date: "",
        type: "",
        status: 0,
      },
    ]);
  };
  const onView = () => {   
    setVisibleDraw(true);
  };
  const onDelete = (value) => {
    let dataIndex = data.findIndex((item) => item.id === value.id);
    const newData = [...data];
    newData.splice(dataIndex, 1);
    setData(newData);
    setVisiblePop(false);
    setVisible(false)
  };
  const onEdit = () => {
    setIsEdit(true);
  };
  const onSave = (values) => {
    //console.log("Success:", values);
    let dataIndex = data.findIndex((item) => item.id === dataShow.id);
    const tmpdata = [...data];
    tmpdata[dataIndex].name = values.name;
    tmpdata[dataIndex].date = values.date;
    tmpdata[dataIndex].type = values.type;
    setData(tmpdata);
    setVisible(false);
    setIsEdit(false)
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
      width:100,
      render: (record) => (
        <Space size="middle">
          <Button onClick={()=>onDeleteMem(record)}>Delete</Button>
        </Space>
      )
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
    setInfoEdit(info)
    setIsEditInfo(true)
    //console.log(info)
  }
  const onSaveInfo = (values)=> {
      //console.log(values)
      let dataIndex = member.findIndex((item) => item.key === infoEdit.key);
    const tmpmember = [...member];
    tmpmember[dataIndex].name = values.name;
    tmpmember[dataIndex].phone = values.phone;
    tmpmember[dataIndex].gender = values.gender;
    setMember(tmpmember);
    setIsEditInfo(false)
  }
  const onDeleteMem = (record) => {
      // //console.log(record)
      let dataIndex = member.findIndex((item) => item.key === record.key);
      const newDataMem = [...member];
      newDataMem.splice(dataIndex, 1);
      setMember(newDataMem);
      
  }
  const infoMember = (value) => {
    return (
      (isEditInfo == true ?  <Form layout="inline" size="small" 
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
          <Input placeholder="Phone number..." style={{width:150}} />
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
      </Form> : (
          <Row  style={{display: "flex",
          justifyContent: "space-between" } }>

            <p>{'Name: ' + value.name + ' - Phone: ' + (value.phone!=='' ? value.phone : 'Please update phone!') + ' - Gender: ' + (value.gender!=='' ? value.gender : 'Please update gender!') }</p>
           <Button style={{ marginRight:20 }} onClick={()=> onEditInfo(value)}>Edit</Button>
        </Row>
         
      )
       )
     
    );
  };
 
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Room Management</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          overflow: "auto",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Button onClick={onAdd}>Add room</Button>
          <Search
            placeholder="Search user name ..."
            onSearch={(value) => onSearch(value)}
            style={{ width: 300 }}
          />
        </Row>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {dataFilter.map((item, index) => (
              <Col span={8} key={index} style={{ marginBottom: 20 }}>
                <Card
                  size="small"
                  title={"Room " + item.id}
                  extra={item.type=='' ? <Button onClick={() => onShow(item)}>Lease</Button> : <Button onClick={() => onShow(item)}>View more</Button>}
                  style={{ width: 300, maxHeight: 250, minHeight: 250 }}
                >
                  <Descriptions title="Infomation Room" column={1}>
                    <Descriptions.Item label="Name">
                      {item.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date">
                      {item.date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">
                      {item.type}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Modal
        title={"Room " + dataShow.id}
        visible={visible}
        footer=" "
        width="400px"
        onCancel={() => setVisible(false)}
      >
        {isLease == true ? (
          <Form
            size="small"
            name="basic"
            onFinish={onSave}
            initialValues={{
              name: dataShow.name,
              date: dataShow.date,
              type: dataShow.type,
            }}
          >
            <Descriptions title="Infomation Room" column={1} />
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Date" name="date">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input room types",
                },
              ]}
            >
              <Select style={{ width: 200 }}>
                <Option value="NORMAL">NORMAL</Option>
                <Option value="VIP">VIP</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Descriptions title="Infomation Room" column={1}>
            <Descriptions.Item label="Name">{dataShow.name}</Descriptions.Item>
            <Descriptions.Item label="Date">{dataShow.date}</Descriptions.Item>
            <Descriptions.Item label="Type">{dataShow.type}</Descriptions.Item>
          </Descriptions>
        )}
        <Popover
          content={
            <Button onClick={() => onDelete(dataShow)} size="small">
              OK
            </Button>
          }
          title="Are you sure ?"
          trigger="click"
          visible={visiblePop}
          onVisibleChange={() => setVisiblePop(visible)}
        >
          <Button style={{ float: "right", margin: 4 }}>Delete</Button>
        </Popover>
        {isEdit == true ? (
          <Button
            style={{ float: "right", margin: 4 }}
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
        ) : (
          dataShow.type=='' ? <Button style={{ float: "right", margin: 4 }} onClick={onEdit}>
          Lease
        </Button> : <Button style={{ float: "right", margin: 4 }} onClick={onEdit}>
          Edit
        </Button>
          
        )}
        <Button
          style={{ float: "right", margin: 4 }}
          onClick={() => onView(dataShow)}
        >
          View
        </Button>
      </Modal>
      <Drawer
        title={"Infomation Room " + dataShow.id}
        placement="right"
        closable={false}
        onClose={() => setVisibleDraw(false)}
        visible={visibleDraw}
        width={700}
      >
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
            <Descriptions.Item label="Name">{dataShow.name}</Descriptions.Item>
            <Descriptions.Item label="Date">{dataShow.date}</Descriptions.Item>
            <Descriptions.Item label="Type">{dataShow.type}</Descriptions.Item>
          </Descriptions>
        </Card>
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
      </Drawer>
    </Layout>
  );
};
