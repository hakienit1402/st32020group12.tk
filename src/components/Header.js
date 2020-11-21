import React, { useState, useEffect } from "react";
import firebase from '../firebase/Firebase'
import {
  UserOutlined,
  SettingFilled,
  LogoutOutlined,
  LockOutlined,QuestionCircleOutlined ,FormOutlined,FacebookFilled
} from "@ant-design/icons";
import { Menu, Modal, Form, Input, Button, Checkbox, Row, notification, message, Descriptions, Col,Image } from "antd";
import { Switch, Route, Link, useHistory } from "react-router-dom";
const { SubMenu } = Menu;
const Header = () => {
  const [visibleAbout,setVisibleAbout] = useState(false)
  const [errorPass,setErrorPass] = useState('')
  const [idOwner,setIdOwner] = useState( JSON.parse(localStorage.getItem("idOwner"))
  )
  const [visiblePass,setVisiblePass] = useState(false)
  const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('isAuth')));
  const [owner,setOwner] = useState(JSON.parse(localStorage.getItem('owner')))
  const [dataUser, setDataUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isHas, setHas] = useState(true);
  const [error,setEror] = useState('')
  const [errorLogin,setErorLogin] = useState('')
const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
const gID = () => {
  return s4()+'-'+s4();
};
  const logout = () => {
    setIsLogin(false);
    localStorage.setItem('isAuth',false)
    window.location.reload()
  };
  const login = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const register = () => {
    setHas(false);
  };
  useEffect(() => {
    
    const fetchData = async () => {
      const db = firebase.firestore()
      db.collection('users').onSnapshot((data)=> { 
        setDataUser(data.docs.map(doc => ({
          ...doc.data(), 
          id: doc.id
        })))
      })
    }
   fetchData()
  }, [])

  const onLogin = (values) => {
    //console.log(values);
    let index = dataUser.findIndex((item) => item.username === values.username);
    if (index === -1) {
      setErorLogin('Username is not exist !')
    } else if (values.password !== dataUser[index].password) {
      setErorLogin('Error password !')
    } else if (values.username === dataUser[index].username && values.password === dataUser[index].password){
       localStorage.setItem('isAuth',true)
    setIsLogin(true)
    setVisible(false)
    setErorLogin('')
    window.location.reload()
    localStorage.setItem('owner',JSON.stringify(dataUser[index].fullName))
    localStorage.setItem('idOwner',JSON.stringify(dataUser[index].id))
    }
   
  };
  const onRegister = (values)=> {
    //console.log(values)
    let index = dataUser.findIndex((item) => item.username === values.username);
    if (values.password !== values.passwordConfirm) {
      setEror('Password not match')
    } else if (index!=-1) {
      setEror('Username is exist !')
    } else if (values.password.length < 8) {
      setEror('Username and password should be 8 characters !')
    } else if (values.username.length < 6) {
      setEror('Username should be 6 characters !')
    } else {
      setEror('')
      setHas(true)
    const db = firebase.firestore();
    db.collection('users').add({
      fullName: values.fullName,
      key: gID(),
      username:values.username,
      password:values.password,
    })
    }
   
  }
  const onchangePass = (values) => {
    //console.log(values)
    let index = dataUser.findIndex((item) => item.id === idOwner);
    if (values.oldpass !== dataUser[index].password) {
      setErrorPass('Old password not correct !')
      message.error('Old password not correct !',1)
    } else if (values.newpass !== values.newpassConfirm) {
      setErrorPass('Password not match')
      message.error('Password not match',1)
    } else if (values.newpass.length < 8) {
      setErrorPass('Password should be 8 characters !')
      message.error('Password should be 8 characters !',1)
    } else {
      setErrorPass('')
      const db = firebase.firestore();
      db.collection('users').doc(idOwner).set({
        fullName: dataUser[index].fullName,
        key: dataUser[index].key,
        username:dataUser[index].username,
        password:values.newpass
    }).then(()=> {
      
      message.success(
        'Change password success !', 2
      )
      setVisiblePass(false)
      }
      )
    }
  }
  const LoginForm = () => {
    return (
      <Form name="normal_login" className="login-form" onFinish={onLogin}>
         <Row style={{color:'red',marginBottom:20}}>{errorLogin}</Row>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Link to='' className="login-form-forgot">Forgot password</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: 10 }}
          >
            Log in
          </Button>
          Or <Link to='' onClick={register}>register now!</Link>
        </Form.Item>
      </Form>
    );
  };
  const RegisterForm = () => {
    return (
      <Form name="normal_login" className="login-form" onFinish={onRegister}>
        <Row style={{color:'red',marginBottom:20}}>{error}</Row>

        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your Fullname!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Fullname"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: "Please input your Password Confirm!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password Confirm"
          />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Link
          to=''
            className="login-form-forgot"
            onClick={() => {
              setHas(true);
            }}
          >
            Already have an account?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: 10 }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const ChangePassForm = () => {
    return (
    <Form name="normal_login" className="login-form" onFinish={onchangePass}>
        <Row style={{color:'red',marginBottom:20}}>{errorPass}</Row>
        <Form.Item
          name="oldpass"
          rules={[
            {
              required: true,
              message: "Please input new password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Old password"
          />
        </Form.Item>
        <Form.Item
          name="newpass"
          rules={[
            {
              required: true,
              message: "Please input new Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New password"
          />
        </Form.Item>
        <Form.Item
          name="newpassConfirm"
          rules={[
            {
              required: true,
              message: "Please input new Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: 10 }}
          >
            Save
          </Button>
          <Button
            style={{ marginRight: 10 }}
          >
          Cancel
          </Button>
        </Form.Item>
      </Form>)
  }
  const AboutForm = () => {
    return (
      <Row>
      <Col span={14}>
     <Descriptions column={1}>
       <Descriptions.Item label='Company name'>Nong Lam University</Descriptions.Item>
       <Descriptions.Item label='Developer'>Ha Ngoc Kien</Descriptions.Item>
       <Descriptions.Item label='Version'>st01-2020 YataomeApp</Descriptions.Item>
       <Descriptions.Item label='Contact me '>
         <a href="https://www.facebook.com/hakien1402/"><FacebookFilled />FB: HÀ KIÊN </a> <br/>
         Email : hangockien99@gmail.com
       </Descriptions.Item>
     </Descriptions>
     </Col>
     <Col span={6} className='info'>
     <Image
            width={220}
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/79451546_3058864351005230_4509966735998189568_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=O59O_uf-7V0AX_MG01r&_nc_ht=scontent.fvca1-1.fna&oh=b6d6d25efb2e3bf695154980216b05c1&oe=5FB78BBA"
          />
     </Col>
     </Row>
    )
  }
  return (
    <div>
      <Menu mode="horizontal" className="menu-app">
        <Menu.Item style={{ marginLeft: 40 }}>
         <Link to='/'> <strong>GROUP 12 ST-2020</strong></Link>
        </Menu.Item>
        {isLogin === true ? (
          <SubMenu
            icon={<UserOutlined />}
            title={"Welcome " + owner}
            style={{
              float: "right",
              marginRight: 50,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            <Menu.Item icon={<QuestionCircleOutlined />} onClick={()=> setVisibleAbout(true)}>About us</Menu.Item>
            <Menu.Item icon={<FormOutlined />} onClick={()=> setVisiblePass(true)} >Change password</Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
              Log Out
            </Menu.Item>
          </SubMenu>
        ) : (
          <Menu.Item
            icon={<UserOutlined />}
            style={{
              float: "right",
              marginRight: 50,
              fontSize: 16,
              fontWeight: 500,
            }}
            onClick={login}
          >
            Sign In
          </Menu.Item>
        )}
      </Menu>
      {/* Form */}
      <Modal
        title={isHas === true ? "Sign In" : "Sign Up"}
        visible={visible}
        width="400px"
        footer=""
        onCancel={handleCancel}
      >
        {isHas === true ? <LoginForm /> : <RegisterForm />}
      </Modal>
      <Modal
        title='About'
        visible={visibleAbout}
            footer=''
        width="700px"
        onOk={()=>setVisibleAbout(false)}
        onCancel={()=> setVisibleAbout(false)}
       
      >
        <AboutForm/>
      </Modal>
      <Modal
        title='Change pass'
        visible={visiblePass}
        footer=''
        width="400px"
        onCancel={()=> setVisiblePass(false)}
       
      >
       <ChangePassForm/>
      </Modal>
    </div>
  );
};

export default Header;
