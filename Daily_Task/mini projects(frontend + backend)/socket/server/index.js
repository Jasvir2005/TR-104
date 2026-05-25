const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


const app =  express();
app.use(cors());

const server  = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);


    socket.on("message",({message,recever})=>{
        console.log(message)
        socket.to(recever).emit("msg",message)
    })


    socket.on('disconnect', () => {
        console.log('A user disconnected: ' + socket.id);
    });
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});