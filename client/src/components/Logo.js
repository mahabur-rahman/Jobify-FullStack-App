import styled from "styled-components";

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
`;

const Logo = () => {
  return (
    <>
      <Image
        src="https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        alt=""
        height="80"
        width="80"
        style={{ marginLeft: "2rem", marginTop: "1rem" }}
      />
    </>
  );
};

export default Logo;
