import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VideoCallOutlined } from "@mui/icons-material";
import Upload from "./Upload"
import { loginStart, loginSuccess, loginFailure, logout } from "../redux/userSlice"

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text}
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.text}

`;
const Avatar = styled.img`
width : 20px;
height: 20px;
border-radius: 50%;
background-color: #999;
`;
// const doUserLogOut = async function () {
//   try {
//     await Parse.User.logOut();
//     // To verify that current user is now empty, currentAsync can be used
//     const currentUser = await Parse.User.current();
//     if (currentUser === null) {
//       alert('Success! No user is logged in anymore!');
//     }
//     // Update state variable holding current user
//     getCurrentUser();
//     return true;
//   } catch (error) {
//     alert(`Error! ${error.message}`);
//     return false;
//   }
// };
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    try {

      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  return (<>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search"
            onChange={(e) => setQ(e.target.value)} />
          <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlined onClick={() => setOpen(true)} />
            <Avatar src={currentUser.img} />
            {currentUser.name}
            <Button onClick={handleLogout}> LOG OUT</Button>
          </User>

        ) : (
          <Link to="login" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>)}
      </Wrapper>
    </Container>

    {open && <Upload setOpen={setOpen} />}
  </>
  );
};

export default Navbar;
