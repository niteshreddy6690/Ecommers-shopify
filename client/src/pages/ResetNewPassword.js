import { useState } from "react";
import styled from "styled-components";

import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { request } from "../redux/apiCalls";

import { useForm } from "react-hook-form";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
  &:disabled {
    display: none;
  }
`;

const MessageContainer = styled.div`
  position: relative;
  width: 60%;
  margin: 5px;
  color: rgb(151, 6, 6);
  border-radius: 5px;
  border: 1px solid rgb(255, 234, 229);
  padding: 10px;
  display: flex;
  justify-content: space-around;
  background-color: rgb(255, 234, 229);
  transition: width 0.35s ease-in-out;
  &::before {
    content: "";
    position: absolute;
    width: 13px;
    top: -1px;
    bottom: -1px;
    left: 0px;
    border-radius: 5px 0px 0px 5px;
    background: linear-gradient(to left, transparent 6px, rgb(151, 6, 6) 6px);
  }
`;
const Span = styled.div``;

const Paragraph = styled.p`
  color: Red;
  margin-bottom: 2px;
  font-size: 0.9em;
`;

const ResetNewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [Password, setPassword] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log("Token : ", searchParams.get("token"));
  const Token = searchParams.get("token");

  //   setFormData(...formData,  token: Token );
  const handelChange = (e) => {
    setPassword(e.target.value);
  };
  console.log("Password: ", Password);

  const onSubmit = (data) => {
    // e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/new-password", {
        password: data.new_password,
        token: Token,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        setError(true);
        console.log("error", error);
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Create a New Password</Title>
        {!error ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* <Input
              name="password"
              type="password"
              placeholder="Enter your new password"
              onChange={handelChange}
            /> */}
            <Input
              {...register("new_password", {
                required: "Please Enter new password",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                  message: "Please enter valid new password",
                },
              })}
              placeholder="New Password"
            />
            <Paragraph>{errors.new_password?.message}</Paragraph>
            <Input
              {...register("confirm_password", {
                required: "Please Enter Confirm password",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                  message: "Please enter valid Confirm password",
                },
                validate: (val) => {
                  if (watch("new_password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              placeholder="Confirm Password"
            />
            <Paragraph>{errors.confirm_password?.message}</Paragraph>
            <Button type="submit">Save Password</Button>
          </Form>
        ) : (
          <MessageContainer>
            <svg
              className="leafygreen-ui-qdpwkv"
              height="16"
              width="16"
              role="img"
              aria-label="Warning Icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.8639 2.51357C8.49039 1.82881 7.50961 1.82881 7.1361 2.51357L1.12218 13.5388C0.763263 14.1968 1.23814 15 1.98608 15H14.0139C14.7619 15 15.2367 14.1968 14.8778 13.5388L8.8639 2.51357ZM7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V6ZM9 13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13Z"
                fill="currentColor"
              ></path>
            </svg>
            <Span>Password reset expired.</Span>
          </MessageContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default ResetNewPassword;
