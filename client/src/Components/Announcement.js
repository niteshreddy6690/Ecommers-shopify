import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Announcement() {
  return <Container>Super Deal!</Container>;
}

export default Announcement;
