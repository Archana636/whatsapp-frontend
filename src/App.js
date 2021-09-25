import React, { useEffect, useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import axios from 'axios';

function App() {
const [messages, setMessages] = useState([]);

useEffect(() => {
   axios.get("http://localhost:9000/messages/sync").then((response) => {
     setMessages(response.data);
     console.log(response);
   });
}, []) ;

  useEffect(() => {
    const pusher = new Pusher('9aa3469af18c30b9f7c1', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
   
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };


  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      {
        messages && (
          <Chat messages={messages}/>
        )
      }
       
      </div>
      
  </div>
  );
}

export default App;
