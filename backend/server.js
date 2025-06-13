const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");
const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`server is litening on PORT ${PORT}`);
});
