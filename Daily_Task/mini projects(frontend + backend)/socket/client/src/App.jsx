import React from 'react'
import { useEffect } from 'react';
import { use } from 'react';

import io from 'socket.io-client';


const App = () => {

  const[message, setMessage] = React.useState('');
  const [socket, setSocket] = React.useState(null);
  const [recever, setRecever] = React.useState('');

  const[messages, setMessages] = React.useState([])

  useEffect(()=>{
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      setSocket(socket);
      console.log('Connected to server');
    });

    return () => {
      socket.disconnect();
    };

  },[])

  useEffect(()=>{
    if(socket){
      socket.on("msg",(message)=>{
        setMessages(current => [...current,message])
        console.log("message got -" + message)
      })
    }
  },[socket])

  function sendMessage(){
    if(socket){
      socket.emit("message",{message,recever})
      setMessages(current => [...current,message])
    }
  }

  return (
    <div>
      <h1>Socket.io client</h1>
      {socket && <h3>{socket.id}</h3>}
      {
        messages.map((msg,index)=>{
          return <p key={index}>{msg}</p>
        })
      }
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <input type="text" placeholder='receverId' value={recever} onChange={(e) => setRecever(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
