require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const Message = require("./models/Message");
const User = require("./models/User");
const auth = require("./middleware/auth");
const uploadRoutes = require("./routes/upload");


const app = express();
app.use(cors());
app.use(express.json({
  limit:"50mb"
}));

app.use(express.urlencoded({
  limit:"50mb",
  extended:true
}));

mongoose.connect(process.env.MONGO_URL);

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/uploads", express.static("uploads"));
app.use("/upload", uploadRoutes);

let users = {};

// ✅ GET USERS
app.get("/users", auth, async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});

// ✅ UPDATE PROFILE
app.put("/update-profile/:id", async (req, res) => {

  try {

    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        {
          name: req.body.name,
          bio: req.body.bio,
          profilePic: req.body.profilePic
        },

        {
          returnDocument: 'after'  
        }

      );

    res.json(updatedUser);

  } catch(err){

    res.status(500).json({
      error: err.message
    });

  }

}); 


// ✅ GET MESSAGES
app.get("/messages/:sender/:receiver", async (req, res) => {

  const { sender, receiver } =
    req.params;

  try {

    const msgs = await Message.find({

      $or: [

        {
          sender,
          receiver
        },

        {
          sender: receiver,
          receiver: sender
        }

      ],

      // IMPORTANT
      deletedFor: {
        $ne: sender
      }

    }).sort({ createdAt: 1 });

    res.json(msgs);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// ✅ DELETE MESSAGE
app.delete("/message/:id", async (req, res) => {

  try {

    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ✅ EDIT MESSAGE
app.put("/message/:id", async (req, res) => {

  try {

    const updated = await Message.findByIdAndUpdate(

      req.params.id,

      {
        text: req.body.text
      },

      {
        returnDocument: 'after'  
      }

    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});
 
// ✅ GET UNREAD COUNTS
app.get("/unread/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      receiver: userId,
      seen: false,
    });

    const counts = {};

    messages.forEach((msg) => {
      const senderId = msg.sender.toString();
      counts[senderId] = (counts[senderId] || 0) + 1;
    });

    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE FULL CHAT
app.put(
  "/delete-chat",
  async (req, res) => {

    try {

      const {
        sender,
        receiver
      } = req.body;

      await Message.updateMany(

        {
          $or: [

            {
              sender,
              receiver
            },

            {
              sender: receiver,
              receiver: sender
            }

          ]
        },

        {
          $addToSet: {
            deletedFor: sender
          }
        }

      );

      res.json({
        success: true
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

// ==================== SOCKET.IO ====================
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // JOIN
  socket.on("join", (userId) => {
    users[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(users));
    console.log("User joined:", userId);
  });

  // SEND MESSAGE
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        sender: data.sender,
        receiver: data.receiver,
        text: data.text || "",
        image: data.image || "",
        audio: data.audio || "",
      });

      const receiverSocket = users[data.receiver];
      const senderSocket = users[data.sender];

      if (receiverSocket) {
        io.to(receiverSocket).emit(
          "receiveMessage",
          newMessage
        );
      }

      if (senderSocket) {
        io.to(senderSocket).emit(
          "messageSent",
          newMessage
        );
      }
    } catch (err) {
      console.log(err);
    }
  });

  // TYPING
  socket.on("typing", (data) => {
    if (!data) return;

    const {
      senderId,
      receiverId,
      isTyping
    } = data;

    const receiverSocket = users[receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit(
        "typing",
        {
          senderId,
          isTyping
        }
      );
    }
  });

  // SEEN
  socket.on("seen", async (data) => {
    if (!data) return;

    const {
      sender,
      receiver
    } = data;

    await Message.updateMany(
      {
        sender: receiver,
        receiver: sender,
        seen: false
      },
      {
        seen: true
      }
    );

    const senderSocket = users[receiver];

    if (senderSocket) {
      io.to(senderSocket).emit(
        "messagesSeen",
        {
          senderId: receiver,
          receiverId: sender
        }
      );
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    for (let id in users) {
      if (users[id] === socket.id) {
        delete users[id];
        break;
      }
    }

    io.emit(
      "onlineUsers",
      Object.keys(users)
    );
    console.log("Client disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));