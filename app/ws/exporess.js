const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server, path: "/ws" });

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Send a welcome message to the client
  ws.send(
    JSON.stringify({ type: "welcome", message: "Connected to WebSocket API!" })
  );

  // Handle messages from the client
  ws.on("message", (message) => {
    console.log("Received:", message);
    const j = JSON.parse(message)
    console.log(j)

    switch (j.type) {
      case "todos":
        getTodo(j.params).then((todos) => {
          ws.send(JSON.stringify({ type: "todos", todos }));
        });
        break;  
      case "add":
        addTodo(j.todo).then((todo) => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "added", todo }));
            }
          });
        });
        break;

      case "ping":
        ws.send(JSON.stringify({ type: "pong" }));
        break;
      default:
        ws.send(JSON.stringify({ type: "error", message: "Unknown command" }));
    }

    // Broadcast the message to all connected clients
    //wss.clients.forEach((client) => {
    //  if (client.readyState === WebSocket.OPEN) {
    //    client.send(JSON.stringify({ type: "broadcast", data: message }));
    //  }
    //});
  });

  // Handle disconnection
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Start the HTTP server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log(`WebSocket endpoint available at ws://localhost:${PORT}/ws`);
});

// TODO limit, offset に対応
async function getTodo( params ) {
  // await (new Promise((resolve) => setTimeout(resolve, 10000)))
  const query = {
    select: {
      id: true,
      user_id: true,
      content: true,
      status: true,
      due_date: true,
      created_at: true,
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    } 
  }
  const filter = ["status", "user_id"];
  filter.forEach((field) => {
    if (params[field]) {
      if (!query.where) query.where = {}  
      query.where[field] = params[field]
    }
  })
  const rows = await prisma.todos.findMany(query)
  const rslt = rows.map((row) => {
    row.name = row.user.name;
    delete row.user
    return row;
  })
  return rslt
}

async function addTodo( todo ) {
  const row = await prisma.todos.create({
    data: {
      content: todo.content,
      status: todo.status,
      due_date: todo.due_date,
      created_at: new Date(),
      user: {
        connect: { id: todo.user_id }
      }
    }
  });
  row.name = todo.name;
  console.log(row)
  return row
}

