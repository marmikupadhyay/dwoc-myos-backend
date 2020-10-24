// mongodb+srv://marmik:mar0712@cluster0-otaph.mongodb.net/dwoc?retryWrites=true&w=majority"
const http = require("http");
const app = require("./src/app");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
