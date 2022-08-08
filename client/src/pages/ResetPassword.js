import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { request } from "../api/axios";
import { useForm } from "react-hook-form";

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
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: green;
`;
const Note = styled.div`
  width: 70%;
  margin: 5px;
`;
const MessageContainer = styled.div`
  position: relative;
  width: 70%;
  color: rgb(0, 104, 74);
  border-radius: 5px;
  border: 1px solid rgb(227, 252, 247);
  padding: 10px;
  display: flex;
  justify-content: space-around;
  background-color: rgb(227, 252, 247);
  transition: width 0.35s ease-in-out;
  &::before {
    content: "";
    position: absolute;
    width: 15px;
    top: -1px;
    bottom: -1px;
    left: 0px;
    border-radius: 5px 0px 0px 5px;
    background: linear-gradient(to left, transparent 6px, rgb(0, 104, 74) 6px);
  }
`;
const Span = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  max-width: 444px;
  padding: 25px;
  height: 1.1876em;
  margin: 10px 0;
  border: 1px solid lightgrey;
  border-radius: 5px;
  &:focus {
    border: 1px solid blue;
    border-radius: 5px;
  }
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 30%;
  height: 40px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;
const Paragraph = styled.p`
  color: Red;
  margin-bottom: 2px;
  font-size: 1em;
`;
const Label = styled.label`
  color: black;
  font-size: 1.2em;
  font-weight: bold;
  margin: 2px 0;
`;

const initialState = {
  email: "",
};
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = (data) => {
    // e.preventDefault();
    request
      .post("/auth/reset-password", data)
      .then((response) => {
        // localStorage.setItem("AccessToken", response.data.AccessToken);
        // localStorage.setItem("RefreshToken", response.data.RefreshToken);
        console.log("response", response?.status);
        setUser(true);
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Reset your password</Title>
        <Note>
          To reset your password, enter your email below and submit. An email
          will be sent to you with instructions about how to complete the
          process.
        </Note>
        {!user ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email">Email Address</Label>
            <Input
              {...register("email", {
                required: "Please enter email id",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter valid email id",
                },
              })}
              placeholder="Email Address*"
            />
            <Paragraph>{errors.email?.message}</Paragraph>
            <br />
            <Button type="submit">Reset Password</Button>
          </Form>
        ) : (
          <MessageContainer>
            <svg
              className="leafygreen-ui-1c144bt"
              height="16"
              width="16"
              role="img"
              aria-label="Checkmark With Circle Icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM10.4485 4.89583C10.8275 4.45816 11.4983 4.43411 11.9077 4.84352C12.2777 5.21345 12.2989 5.80633 11.9564 6.2018L7.38365 11.4818C7.31367 11.5739 7.22644 11.6552 7.12309 11.7208C6.65669 12.0166 6.03882 11.8783 5.74302 11.4119L3.9245 8.54448C3.6287 8.07809 3.767 7.46021 4.2334 7.16442C4.69979 6.86863 5.31767 7.00693 5.61346 7.47332L6.71374 9.20819L10.4485 4.89583Z"
                fill="currentColor"
              ></path>
            </svg>
            <Span>
              Please check your email inbox for a link to complete the reset.
            </Span>
          </MessageContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
