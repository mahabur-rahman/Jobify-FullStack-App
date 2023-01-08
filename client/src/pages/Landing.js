import React from "react";
import styled from "styled-components";
import mainImg from "../images/main.svg";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  height: 70vh;

  span.track {
    color: red;
  }
`;

const ImageSecond = styled.img`
  object-fit: cover;
  width: 300px;
  margin-right: 10%;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Paragraph = styled.p`
  color: #111;
  width: 50%;
`;

const Landing = () => {
  return (
    <>
      <div className="nav">
        {/* logo  */}
        <Logo />

        {/* info  */}
        <Nav className="pure">
          <div className="man_content">
            <Title>
              Job <span className="track">Tracking</span> App
            </Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
              exercitationem culpa facere modi amet incidunt sint, voluptate
              doloribus dolor, voluptatem nam at laborum. Hic, eveniet!
            </Paragraph>

            <Link to="/register" className="btn btn-hero">
              Login / Register
            </Link>
          </div>

          <ImageSecond src={mainImg} alt="" />
        </Nav>
      </div>
    </>
  );
};

export default Landing;
