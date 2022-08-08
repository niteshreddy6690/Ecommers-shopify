import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 20vh;
  width: 50%;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Status = styled.div`
  width: 25%;
  height: 25%;
  color: green;
`;

const Success = () => {
  return (
    <Wrapper>
      <Container>
        <Status>Your order is successful</Status>
      </Container>
    </Wrapper>
  );
};

export default Success;
