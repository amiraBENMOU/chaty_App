import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';


 const socket =io.connect("http://localhost:3002");



function Discussion(){
  const [message, setMessage] = useState("");
  const [messageReceived,setMessageReceived] = useState("");
  const sendMessage =() =>{
     socket.emit("send_message",{message});
  };
  
    //responsible of reciving messages 
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }, [socket]);
  
  return (
   <div className="Discussion">
    
      
    <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
       <button onClick={sendMessage} variant="primary"> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}  
  export default Discussion;