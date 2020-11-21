import React, { useState, useEffect } from "react";
import firebase from '../../firebase/Firebase'
import Moment from 'moment';
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
  Dropdown,
  Menu,
  Popconfirm,Skeleton, message, Empty
} from "antd";
import {
  BookOutlined,
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,StopOutlined,CheckCircleTwoTone,ExclamationCircleTwoTone,EyeOutlined
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
export const Main = () => {
  const history = useHistory
  const [visible, setVisible] = useState(false);
  const [visiblePop, setVisiblePop] = useState(false);
  const [visibleDraw, setVisibleDraw] = useState(false);
  const [dataShow, setDataShow] = useState([]);
  const [dataLease,setDataLease] = useState([])
  const [dataEdit,setDataEdit] = useState([])
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [infoRoom,setInfoRoom] = useState([])
  const [isLease,setIsLease] = useState(false)
  const [idOwner,setIdOwner] = useState( JSON.parse(localStorage.getItem("idOwner"))
 )
  const [member, setMember] = useState([]);
  const [infoEdit, setInfoEdit] = useState([]);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading,setLoading] = useState(false)
  const dataFilter = rooms.filter((filterData) => {
    return  filterData.key.toLowerCase().includes(search.toLowerCase())

  })
  const orderFilter = async (value) => {
    const db = firebase.firestore().collection('users').doc(idOwner)

   if (value=='VIP' || value == 'NORMAL') {
       db.collection('rooms').where('type','==', value )
      .onSnapshot( (data)=> { 
        setLoading(false)
      setRooms(data.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id
        })))
      })  
  } else if (value=='true') { 
       db.collection('rooms').where('status','==', true )
      .onSnapshot( (data)=> { 
        setLoading(false)
      setRooms(data.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id
        })))
      })
  } else if (value=='false') {
   
       db.collection('rooms').where('status','==', false )
      .onSnapshot( (data)=> { 
        setLoading(false)
      setRooms(data.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id
        })))
      })
   
  } else {
   
    db.collection('rooms')
   .onSnapshot( (data)=> { 
     setLoading(false)
   setRooms(data.docs.map(doc => ({
       ...doc.data(), 
       id: doc.id
     })))
   })
  }
  }
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  useEffect(() => {
    localStorage.setItem('idOwner', JSON.stringify(idOwner))
  }, [idOwner]);
  const genid = () => {
    return s4();
  };

  const onLease = (item) => {
    //console.log(item)
    setVisible(true);
    setDataLease({
      ...dataLease,
      leaseAt: Moment(new Date()).format('DD/MM/YYYY'),
      type: item.type,
      nameLease: item.nameLease,
      id: item.id,
      status: item.status,
      key: item.key
    });
  };
 
  useEffect(() => {
    if (rooms.length === 0){
      setLoading(true)
    } 
    const fetchData = async () => {
      const db = firebase.firestore()
      await db.collection('users').doc(idOwner).collection('rooms')
      .onSnapshot( (data)=> { 
        setLoading(false)
      setRooms(data.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id
        })))
      })
    }
   fetchData()
  }, [])
  
  const onAddVip = () => {
    const db = firebase.firestore();
    db.collection('users').doc(idOwner).collection('rooms').add({
      key:genid(),
      nameLease:'',
      type:'VIP',
      status:false, 
      leaseAt:''
    })
   db.collection('users').doc(idOwner).collection('rooms')
    .onSnapshot( (data)=> { 
    setRooms(data.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id
      })))
    })
  };
  const onAddNormal = () => {
    const db = firebase.firestore();
    db.collection('users').doc(idOwner).collection('rooms').add({
      key:s4(),
      nameLease:'',
      type:'NORMAL',
      status:false,
      leaseAt:''
    })
    db.collection('users').doc(idOwner).collection('rooms')
    .onSnapshot( (data)=> { 
    setRooms(data.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id
      })))
    })
  }
  // Moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
  const onView = (item) => {
    if (item.nameLease=='') {
      setVisibleDraw(false)
      message.warning('The room has not been rented !!!',1)
    } else {
    setVisibleDraw(true);
    setInfoRoom(item);
    const fetchData = async () => {
      const db = firebase.firestore()
     await db.collection('users').doc(idOwner).collection('rooms').doc(item.id).collection('members')
      .onSnapshot((data)=> { 
        setMember(data.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id
        })))
      })
    }
   fetchData()
  }
  };

  const onUpdate = (values) => {
    const db = firebase.firestore();
    db.collection('users').doc(idOwner).collection('rooms').doc(dataEdit.id).set({
    nameLease:values.nameLease,
    leaseAt:values.leaseAt,
    type:values.type, 
    key: dataEdit.key,
    status:dataEdit.status
  }).then(()=> setVisible(false))

  }
  const handleCancel = () => {
    setIsLease(false)
    setIsEdit(false)
    setVisible(false)
  }
  const onEdit = (item) => {
    if (item.nameLease === '') {
      message.warning('The room has not been rented !!!',1)
    } else {
    setIsEdit(true)
    setVisible(true)
    setDataEdit(item)
  }
  };
  const onSaveLease = (values) => {
    //console.log(values)
    const db = firebase.firestore();
    db.collection('users').doc(idOwner).collection('rooms').doc(dataLease.id).set({
      nameLease:values.nameLease,
      leaseAt:values.leaseAt,
      type:values.type, 
      key: dataLease.key,
      status:dataLease.status
    }).then(()=> {
    setVisible(false)
    setDataLease([])
    setIsLease(false)
    }
    )
  };
  const onRefresh = (item) => {
    const db = firebase.firestore();
    db.collection('users').doc(idOwner).collection('rooms').doc(item.id).set({
    nameLease:'',
    leaseAt:'',
    type:item.type, 
    key: item.key,
    status:false
  }).then( () => {
    setVisible(false)
  })
  }
  const onPaid = (item) => {
    setInfoRoom({
      ...infoRoom,
      status: item.status == true ? false : true
    })
    //console.log(item)
    const db = firebase.firestore();
    db.collection('users').doc(idOwner).collection('rooms').doc(item.id).set({
    nameLease :item.nameLease,
    leaseAt :item.leaseAt,
    type :item.type, 
    key : item.key,
    status : item.status === true ? false : true
  })
  };
  const confirmDelete = (item) => {
  //console.log(item)
  const db = firebase.firestore();
  db.collection('users').doc(idOwner).collection('rooms').doc(item.id).delete()
  db.collection('users').doc(idOwner).collection('rooms')
  .onSnapshot( (data)=> { 
  setRooms(data.docs.map(doc => ({
      ...doc.data(), 
      id: doc.id
    })))
  })
  }

  const menuOptionAdd = (
    <Menu>
      <Menu.Item onClick={onAddVip}> 
      VIP
      </Menu.Item>
      <Menu.Item onClick={onAddNormal}>
      NORMAL
      </Menu.Item>
    </Menu>
  )

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 7,
      span: 16,
    },
  };
// info room mem
  const columns = [
    {
      title: "Name",
      dataIndex: "memName",
      key: "memName",
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
      title: "Start Date",
      dataIndex: "startAt",
      key: "startAt",
    }
    ,
    {
      title: "Action",
      key: "action",
      width:100,
      render: (record) => (
        <Space size="middle">
          <Popconfirm placement="top" title={"Are you sure ?"} onConfirm={()=>confirmDeleteMem(record)} okText="Yes" cancelText="No">
                   
                    <Button> <DeleteOutlined /> Delete</Button>
                    </Popconfirm>
       
        </Space>
      )
    },
  ];
  const onAddMember = () => {
    const db = firebase.firestore();
      db.collection('users').doc(idOwner)
      .collection('rooms').doc(infoRoom.id)
      .collection('members').add({
      key:genid(),
      memName:'New member',
      startAt:'',
      gender:'', 
      phone:''
    })
  };
  const onEditInfo = (info) => {
    setInfoEdit(info)
    setIsEditInfo(true)
    
  }
  const onSaveInfo = (values)=> {
      //console.log(values)
      const db = firebase.firestore();
      db.collection('users').doc(idOwner)
      .collection('rooms').doc(infoRoom.id)
      .collection('members').doc(infoEdit.id).set({
      memName:values.memName,
      startAt:values.startAt,
      gender:values.gender, 
      key: infoEdit.key,
      phone: values.phone
  }).then(()=> setIsEditInfo(false))
      
  }
  const confirmDeleteMem = async (record) => {
    const db = firebase.firestore();
      await db.collection('users').doc(idOwner)
      .collection('rooms').doc(infoRoom.id)
      .collection('members').doc(record.id).delete()
  } 
  const infoMember = (value) => {
    return (
      (isEditInfo == true ?  <Form layout="inline" size="large" 
      initialValues={{
        memName: value.memName,
        phone: value.phone,
        gender: value.gender,
        startAt:value.startAt
      }}
      onFinish={onSaveInfo}
      >
        <Form.Item
          name="memName"
          rules={[
            {
              required: true,
              message: "Please input user name!",
            },
          ]}
        >
          <Input placeholder="Name..." style={{width:170}} />
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
          <Input placeholder="Phone number..." style={{width:113}} />
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
          <Select style={{ width: 110 }}>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="startAt"
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
        >
          <Input placeholder="Start date ..." style={{width:130}} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form> : (
          <Row  style={{display: "flex",
          justifyContent: "space-between" } }>
            <Descriptions title='Info Member' size='small' layout='horizontal' column={1} bordered style={{width:500}}>
              <Descriptions.Item label='Name'>{value.memName}</Descriptions.Item>
              <Descriptions.Item label='Phone number'>{(value.phone!=='' ? value.phone : 'Please update phone!')}</Descriptions.Item>
              <Descriptions.Item label='Gender'>{value.gender!=='' ? value.gender : 'Please update gender!'}</Descriptions.Item>
              <Descriptions.Item label='Start at'>{value.startAt!=='' ? value.startAt : 'Please update start date!'}</Descriptions.Item>
            </Descriptions>
           
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
      {loading==true ? 
      <Row>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Row> : 
   
        <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 450,
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
          
          <Dropdown overlay={menuOptionAdd} placement="bottomCenter">
          <Button>Add room</Button>
          </Dropdown>
          <Space>
          <Select style={{ width: 100 }} defaultValue='All' onChange={orderFilter}>
          <Option value="">All</Option>
          <Option value="NORMAL">NORMAL</Option>
          <Option value="VIP">VIP</Option>
          <Option value='true'>Paid</Option>
          <Option value="false">Unpaid</Option>
          </Select>
          <Search
            placeholder="Search ..."
            onSearch={(value) => setSearch(value)}
            style={{ width: 300 }}
          />
          </Space>
        </Row>
       
          <Row>
          {dataFilter.length == 0 ?  <Empty style={{margin:'auto',width:200,height:200}}
      description={
        <strong >No rooms!</strong>
      }
    />  :
    dataFilter.map((item) => (

              <Col key={item.key} style={{marginBottom:20,marginRight:10}}>
                <Card
                  size="small"
                  title={"Room " + item.key}
                  actions={[
                    
                    <BookOutlined key="setting" onClick={()=> onLease(item)} />,
                    <EditOutlined key="edit" onClick={()=>onEdit(item)}/>,
                    <EyeOutlined onClick={()=>onView(item)}/>,
                    <Popconfirm placement="top" title={"Are you sure ?"} onConfirm={()=>confirmDelete(item)} okText="Yes" cancelText="No">
                    <DeleteOutlined />
                    </Popconfirm>,
                   

                  ]}
                    extra={item.status==true ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <ExclamationCircleTwoTone twoToneColor="red"/>}
                  style={{ width: 250, maxHeight: 250, minHeight: 250 }}
                >
                  <Descriptions title="Infomation Room" column={1}>
                    <Descriptions.Item label="Renter Name" style={{width: 150}}>
                      {item.nameLease}
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Date" style={{width: 150}}>
                      {item.leaseAt}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type" style={{width: 150}}>
                      {item.type}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              
            ))}
          </Row>
      </Content>
      }
      <Modal
        title={isEdit === true ? `Room ${dataEdit.key}` :  `Room ${dataLease.key}`  }
        visible={visible}
        footer=" "
        width="450px"
        onCancel={handleCancel}
        afterClose={()=>setDataShow([])}
      > 
        {isEdit === true ? <Form
            {...layout}
            size="small"
            name="basic"
            onFinish={onUpdate}
            initialValues={{
              nameLease: dataEdit.nameLease,
              leaseAt: dataEdit.leaseAt,
              type: dataEdit.type,
            }}
          >
            <Descriptions title="Infomation Room" column={1} />
            <Form.Item
              label="Renter Name"
              name="nameLease"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
              ]}
            >
              <Input placeholder="Renter Name" />
            </Form.Item>

            <Form.Item label="Start date" name="leaseAt" rules={[
                {
                  required: true,
                  message: "Please input date",
                },
              ]}>
            <Input placeholder="Start date (DD/MM/YYYY) " />
            
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
            <Form.Item {...tailLayout} >
              <Button
                type="primary"
                size='middle'
                htmlType="submit"
               
              >
                Update
              </Button>
            </Form.Item>
          </Form> : (isLease === true) ? (
          <Form
            {...layout}
            size="small"
            name="basic"
            onFinish={onSaveLease}
            initialValues={{
              nameLease: dataLease.nameLease,
              leaseAt: dataLease.leaseAt,
              type: dataLease.type,
            }}
          >
            <Descriptions title="Infomation Room" column={1} />
            <Form.Item
              label="Renter Name"
              name="nameLease"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
              ]}
            >
              <Input placeholder="Renter Name" />
            </Form.Item>

            <Form.Item label="Start date" name="leaseAt">
            <Input placeholder="Start date ... " />
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
            <Form.Item {...tailLayout} >
              <Button
                type="primary"
                size='middle'
                htmlType="submit"
               
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        ): (
          <Descriptions title="Infomation Room" column={1} bordered>
            <Descriptions.Item label="Renter Name">{dataLease.nameLease}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{dataLease.leaseAt}</Descriptions.Item>
            <Descriptions.Item label="Type">{dataLease.type}</Descriptions.Item>
          </Descriptions>
        ) }
           {dataLease.nameLease !== '' ?  <Button style={{ float: "right", margin: 6 }} onClick={()=>onRefresh(dataLease)}>
          Refresh
          </Button>  : 
          (isEdit === true || isLease === true ? <Button style={{ float: "right", margin: 6 }} onClick={()=>onRefresh(dataLease)}>
          Refresh
          </Button>  :  <Button style={{ float: "right", margin: 6 }} onClick={()=>setIsLease(true)}>
          Lease
          </Button>  )
          }
         
          <Button
            style={{ float: "right", margin: 6 }}
            onClick={() => setVisible(false)}
          >
            Back
          </Button>
        
      </Modal>
      <Drawer
        title={"Infomation Room " + infoRoom.key}
        placement="right"
        closable={false}
        onClose={() => setVisibleDraw(false)}
        visible={visibleDraw}
        width={750}
      >
        <Card
          size="small"
          title={"Room " + infoRoom.key}
          extra={
            <Switch
              checked={infoRoom.status == true ? true : false}
              onChange={()=> onPaid(infoRoom)}
              checkedChildren="Paid"
              unCheckedChildren="Unpaid"
            />
          }
        >
          <Descriptions title="Infomation Room" column={1} bordered style={{background:'white'}}>
            <Descriptions.Item label="Renter Name">{infoRoom.nameLease}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{infoRoom.leaseAt}</Descriptions.Item>
            <Descriptions.Item label="Type">{infoRoom.type}</Descriptions.Item>
        <Descriptions.Item label="Total members">{member.length + ' '} members</Descriptions.Item>
          </Descriptions>
        </Card>
        <Divider>List members</Divider>
        <Table
          columns={columns}
          dataSource={member}
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
