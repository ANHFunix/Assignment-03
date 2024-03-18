/* eslint-disable no-undef */
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const path = require("path");
const mwError = require("./middlewares/error");
const registerRoomHandlers = require("./handlers/room");

// routes
const routeUser = require("./routes/user");
const routeOrder = require("./routes/order");
const routeProduct = require("./routes/product");
const routeSession = require("./routes/session");
const routeRoom = require("./routes/room");
const routeMail = require("./routes/mail");

// Create server
const app = express();
const server = http.createServer(app);
// @ts-ignore
const io = socketIO(server, { cors: { origin: true } });
const port = 5000;
// IO listen to client connection
io.on("connection", (socket) => {
  registerRoomHandlers(io, socket);
});

// Setup body parser, cors, static folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "matitmui",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/users", routeUser);
app.use("/api/orders", routeOrder);
app.use("/api/products", routeProduct);
app.use("/api/sessions", routeSession);
app.use("/api/rooms", routeRoom);
app.use("/api/mails", routeMail);

// Handle get image
app.get("/uploads/:imgPath", (req, res) => {
  const imgPath = req.params.imgPath;
  const rootDir = path.resolve(process.cwd());
  res.sendFile(rootDir + "\\uploads\\" + imgPath);
});

app.use(mwError);

mongoose
  .connect(
    "mongodb+srv://accban123:accban123@finixcluster0.cxck4bg.mongodb.net/asm3"
  )
  .then(() => {
    server.listen(port);
    console.log("listening on port: http://localhost:" + port);
  })
  .catch((err) => console.log(err));
