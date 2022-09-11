import { ClassSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comment from "./Comment";
import { comment } from "../redux/videoSlice";


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Desc = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([])
  const { currentUser } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState([])
  const [tags, setTags] = useState([])
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value}
    })
  }

const navigation = useNavigate()
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${videoId}`)
      setComments(res.data)
    }
    fetchComments()
  }, [videoId])

  const handleUpload = async (e) => {
    e.preventDefault();
   
    const res = await  axios.post("/comments", {...inputs,videoId })
   
    res.status== 200 && navigation(`/video/${res.data._id}`)
    dispatch(comment())
  }
  
  console.log(currentUser)
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Desc placeholder="Add a comment..."  onChange={handleChange} name="desc"/>
        <Button onClick={handleUpload}>Upload</Button>
      </NewComment>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment}/>
      ))}
    
    </Container>
  );
};

export default Comments;
