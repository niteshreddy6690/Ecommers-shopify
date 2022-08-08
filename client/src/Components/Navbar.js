import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { request } from "../api/axios";
import { debounce, set } from "lodash";
import { useLocation, useSearchParams } from "react-router-dom";
import { textAlign } from "@mui/system";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightGray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  outline: none;
`;

const SearchButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  color: black;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Navbar() {
  let query = useQuery();
  // console.log("location ", query);

  const srcText = query.get("search");
  // console.log();
  // const location = useLocation();
  // console.log("Location", location.search);
  // const cat = location.pathname.split("/")[2];
  let [searchParams, setSearchParams] = useSearchParams();
  // setSearchParams("search");
  console.log("serchparms", searchParams.get("search"));
  const quantity = useSelector((store) => store.cart.quantity);
  const [SearchText, setSearchText] = useState("%20");
  console.log(`SearchText ${SearchText}`);

  // const handelSearch = (text) => {
  //   setSearchParams({ search: text });
  //   console.log("text", text);

  //   request
  //     .get(`/products/search/${text}`)
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    const searchKey = searchParams.get("search");
    if (searchKey) {
      handelSearch(searchKey);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   handelSearch();
  // }, [SearchText]);

  const handelSearch = () => {
    setSearchParams({ search: SearchText });
    request
      .get(`/products/search/${SearchText}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  // const deb = useCallback(
  //   debounce((text) => {
  //     setSearchText(text);
  //     handelSearch(text);
  //   }, 1000),
  //   []
  // );
  // const handelText = (text) => {
  //   deb(text);
  // };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <SearchButton onClick={handelSearch}>
              <SearchIcon style={{ color: "gray", fontSize: "16" }} />
            </SearchButton>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
            <Logo>Shopify</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <MenuItem>Logout</MenuItem>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
