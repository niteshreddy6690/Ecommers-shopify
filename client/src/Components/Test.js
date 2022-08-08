import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const InputContainer = styled.div`
  position: relative;
`;
const Input = styled.input`
  height: 4rem;
  width: 25rem;
  border: 2px solid black;
  border-radius: 7px;
  padding: 0 0.5rem;
  &:focus {
    outline: none;
    border-color: blueviolet;
  }

  &:focus + .label .text,
  :not(input[value=""]) + .label .text {
    background-color: white;
    font-size: 1.1rem;
    color: blueviolet;
    transform: translate(0, -160%);
  }
`;
const Label = styled.label`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: rgba(0, 0, 0, 0.87);
  border: 3px solid transparent;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const TempDiv = styled.div`
  font-size: 1.2rem;
  padding: 0 0.5rem;
  background-color: transparent;
  transform: translate(0);
  color: black;
  transition: transform 0.15s ease-out, font-size 0.15s ease-out,
    background-color 0.2s ease-out, color 0.15s ease-out;
`;

const Test = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handelClick = () => {
    navigate(`/products/${search}`);
  };
  const handelChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  return (
    <InputContainer>
      {/* <Input type="email" name="email" />
      <Label for="email" className="label">
        <TempDiv className="text">Email Address*</TempDiv>
      </Label> */}
      <Input type="text" onChange={handelChange} />
      <button onClick={handelClick}>Click</button>
    </InputContainer>
  );
};

export default Test;
