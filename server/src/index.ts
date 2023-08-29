import WebSocket from "ws"

// Create a new WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 }) // Use the desired port number

// Event listener for when a client connects
wss.on("connection", (ws) => {
  console.log("Client connected")

  // Event listener for messages from the client
  ws.on("message", (message) => {
    if (message.toString() === "ping") {
      ws.send("pong")
    }
    // Send a response back to the client
    if (message.toString() === "pong") {
      ws.send("ping")
    }
  })

  // Event listener for when the client disconnects
  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

console.log("WebSocket server is running on port 8080")
