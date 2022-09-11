
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Container = styled.div`
z-index: 100;
width:100%;
height:100%;
position : absolute;
top: 0;
left: 0;
background-color: #000000ad;
display: flex;
align-items : center;
justify-content : center;`;

const Wrapper = styled.div`
width: 600px;
height: 600px;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;`;

const Close = styled.div`
position: absolute;
top:10px;
right: 10px;
cursor: pointer;`
const Title = styled.h1`
text-align: center;`

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 2px;
padding: 10px;
background-color: transparent; 
`
const Desc = styled.textarea`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 2px;
padding: 10px;
background-color: transparent; 
`
const Button = styled.button`
border-radius: 2px;
border: none;
padding: 10px 20px;
font-weight: bold;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};`;

const Label = styled.label`
 font-size: 14px;`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [imgPerc, setImgPerc] = useState(0) //
  const [videoPerc, setVideoPerc] = useState(0)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState([])

const navigation = useNavigate()

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => { }, () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs(prev => {
            return { ...prev, [urlType]: downloadURL }
          })
        });
      })

  };

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleTags = (e) => {
    setTags(e.target.value.split(","))
  }

  useEffect(() => {
   video && uploadFile(video, "documentUrl")
  }, [video])


  useEffect(() => {
   img && uploadFile(img, "imgUrl")
  }, [img])

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await  axios.post("/videos", {...inputs, tags })
    setOpen(false);
    res.status== 200 && navigation(`/video/${res.data._id}`)
  }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>
          Upload a new document
        </Title>
        <Label>Document</Label>
        {videoPerc>0 ? ("Uploading" + videoPerc + "%") :
        (
          <Input type="file" accept="/*" onChange={e => setVideo(e.target.files[0])} />
        )}
        <Input type="text" placeholder="Title" onChange={handleChange} name="title" />
        <Desc placeholder="Description" rows={10} onChange={handleChange} name="desc" />
        <Input placeholder="Separate the tags with commas." type="text" onChange={handleTags} />
        <Label>Image</Label>
        {imgPerc>0 ? ("Uploading" + imgPerc + "%") :
        (
        <Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Upload;