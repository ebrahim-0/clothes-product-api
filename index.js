const express = require("express");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/route");
const cors = require("cors");
const compression = require("compression");

const app = express();
const PORT = 5000 || process.env.PORT;
connectDB();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());

// Enable CORS for all routes
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use("/", authRoute); // Updated part

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(
    `Server is running on PORT ${PORT} go to http://localhost:${PORT} to see the server`
  );
});
