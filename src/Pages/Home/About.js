import React from "react";
import { Image, Divider, Row,Col } from "antd";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import styled from "styled-components";
const MyTitleMessage = styled.h1`
  width: 100%;
  text-align: center;
   strong {
    font-size: 1.25em;
  }
  div {
    color: ${props => props.theme.textColor};

    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    font-weight: 100;
    letter-spacing: 7px;

    .main {
      font-size: 50px;
      padding: 10px 0px;
    }

    .sub {
      font-size: 27px;
      letter-spacing: 2px;
      padding: 10px 0px;
    }
  }
`;

const TitleMessage = () => (
  <MyTitleMessage>
    <div className="titleMessage">
      <div className="heading">
        <div className="main text-center mb-3">
          Hi, I am
          <br />
          <span>
            <strong>Ha Ngoc Kien</strong>
          </span>
        </div>
        <div className="sub">
          <Typewriter
            options={{
              strings: ["Web Developer", "MERN Stack Developer","Tester"],
              autoStart: true,
              loop: true,
              delay: 100
            }}
          />
        </div>
        <strong style={{color:'red',marginBottom:0,marginTop:10 }}>Motel room management</strong>

        <p style={{color:'red',marginBottom:0,marginTop:10 }}>Sign In to use my app </p>
        <p style={{color:'red',marginBottom:0,marginTop:10 }}> Love you ! </p>
      </div>
    </div>
  </MyTitleMessage>
);
export const About = () => {
  return (
    <div className="container">
        <Row>
        <TitleMessage/>
        </Row>
      <Divider
        style={{
          
          fontSize: 22,
          fontWeight: "bold",
          padding: 20,
          background: "lightgray",
        }}
      >
        Group 12 - Noob Boy
      </Divider>
      <Row className='about'>
        <Col>
          <Image
            width={200}
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/79451546_3058864351005230_4509966735998189568_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=O59O_uf-7V0AX_MG01r&_nc_ht=scontent.fvca1-1.fna&oh=b6d6d25efb2e3bf695154980216b05c1&oe=5FB78BBA"
          />
          <br/>
          <strong><a href='https://www.facebook.com/hakien1402'>HÀ KIÊN</a></strong>
        </Col>
        <Col  className='info'>
          <Image
            width={200}
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/97993543_1175031346162040_4962050621298442240_o.jpg?_nc_cat=105&ccb=2&_nc_sid=8bfeb9&_nc_ohc=PnnxmhR6vkQAX-L6Lkk&_nc_ht=scontent.fvca1-1.fna&oh=a6180db9bcefb2867bcd4d403bdc54ee&oe=5FB99CD7"
          />
           <br/>
          <strong><a href='https://www.facebook.com/profile.php?id=100004886378381'>VĂN QUANG</a></strong>
        </Col>
        <Col  className='info'>
          <Image
            width={200}
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/40515567_2192832774325937_6613797440208240640_o.jpg?_nc_cat=105&ccb=2&_nc_sid=0debeb&_nc_ohc=o_RkCjIMMY4AX9NrsdI&_nc_ht=scontent.fvca1-1.fna&oh=c45e8e2f494bc95e915e685093fab031&oe=5FB802BB"
          />
           <br/>
          <strong><a href='https://www.facebook.com/profile.php?id=100008440710917'>QUYẾT THẮNG</a></strong>
        </Col>
        <Col  className='info'>
          <Image
            width={200}
            src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/43109625_464907613997803_2615802350765342720_o.jpg?_nc_cat=101&ccb=2&_nc_sid=174925&_nc_ohc=Ho3J08SHGnQAX8aArRe&_nc_ht=scontent.fvca1-2.fna&oh=79a624a368231db95201288503908a22&oe=5FB9526F"
          />
           <br/> 
          <strong><a href='https://www.facebook.com/ngmanhcuong17'>MẠNH CƯỜNG</a></strong>

        </Col>
      </Row>
    </div>
  );
};
