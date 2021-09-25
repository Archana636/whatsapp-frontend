import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined, MoreVert} from '@material-ui/icons';
import React, {useState} from 'react';
import './Chat.css';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';

function Chat({ messages }) {
    const [input, setInput] =  useState("");

    const sendMessage = async (e) => {
      e.preventDefault();

      await axios.post("/messages/new", {
          message: input,
          name: "WHATSUP",
          timestamp:"Just now!",
          received: false,
      });
      setInput('');
    };

    return (
        <div>
            <div className="chat__header">
              <Avatar/>
              <div className="chat__headerInfo">
                <h3>Archana</h3>
                <p>Last seen at 2</p>
              </div>
              <div className="chat__headerRight">
                 <IconButton>
                     <SearchOutlined/>
                 </IconButton>
                 <IconButton>
                     <AttachFile/>
                 </IconButton>
                 <IconButton>
                     <MoreVert/>
                 </IconButton>
              </div>
            </div>
            <div className="chat__body">
                {messages && messages.length &&
                
                ( <>
                  {messages?.map((message) => {
                  return(  <p className={`chat__message  ${message.received && "chat__reciever" }`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                 </p>
                  )
                 })}
                 </> ) 

                
                }
              
        </div>
                 <div className="chat__footer">
                <InsertEmotionIcon/>
                <form>
                    <input value={input}
                     onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
                 </div>
            </div>
    )
}

export default Chat;
