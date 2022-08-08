import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  min-width: 100%;
  height: 500px;
  @media (min-width: 0px) {
    min-width: 444px;
  }
`;
const WrapperAvatar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  margin: 8px;
  background-color: #f50057;
`;
const SVG = styled.svg`
  fill: white;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const initialState = {
  firstName: "",
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        // localStorage.setItem("AccessToken", response.data.AccessToken);
        // localStorage.setItem("RefreshToken", response.data.RefreshToken);
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Wrapper>
        <WrapperAvatar>
          <Avatar>
            <SVG focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </SVG>
          </Avatar>
          <Title>Sign up</Title>
        </WrapperAvatar>
        <Form>
          <Input
            name="firstName"
            placeholder="Enter your Name"
            onChange={handelChange}
          />
          <Input placeholder="email" name="email" onChange={handelChange} />
          <Input
            placeholder="password"
            name="password"
            onChange={handelChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={register}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
