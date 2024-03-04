import React from 'react';
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import { useEffect } from "react";
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from "./firebase";
import firebase from 'firebase/compat/app';
import { useStateValue } from "./StateProvider";





function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
  
    


    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
              .doc(roomId)
              .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

              db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy("timestamp", "asc")
              .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
              );
        }
    }, [roomId]);
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
      }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

    setInput("");

    }
    
  return (
    <div className="chat">
    <div className="chat__header">
    <Avatar src={`https://api.multiavatar.com/${seed}.svg`}/>

  <div className='chat__headerInfo'>
    <h3>{roomName}</h3>
    <p>
      last seen{" "}
      {new Date(
        messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}
      
    </p>
  </div>
    
    <div className='chat__headerRight'>
      <IconButton>
      <SearchOutlined/>
      </IconButton>
      <IconButton>
        <AttachFileOutlinedIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </div>
  </div>
    

    <div className="chat__body">
    {messages.map(message => (
      <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
      <span className='chat__name'>{message.name}</span>
      {message.message}

      <span className="chat__timestamp">
        {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
      </span>
      </p> 
    ))}
    
    </div>
    
    <div className="chat__footer">
    <InsertEmoticonIcon />
    
    <form>
     <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
     <button onClick={sendMessage} type="submit">Send a message</button>
    </form>
    <MicIcon />
    </div>

</div>
  );
}

export default Chat



