# Real-Time Chat Application

A simple real-time chat application that allows users to send and receive messages instantly.

## Features
- Real-time messaging
- User-friendly interface
- Lightweight and easy to set up
- Message persistence with MongoDB

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- WebSockets: Socket.io
- DataBase:MongoDb

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install dependencies
```sh
npm install
```
###3. Set up MongoDB

Ensure you have MongoDB installed and running.

Create a .env file and add your MongoDB connection string:
```sh
MONGO_URI=mongodb://localhost:27017/chatdb
```

### 4. Run the server
```sh
node server.js
```

### 5. Open the application
Go to `http://localhost:3000` in your browser.


## Usage
- Open the chat app in multiple browser windows.
- Type a message and press enter to send.
- Messages appear instantly across all connected users.
- Messages are stored in MongoDB and persist after reload.



