require('dotenv').config({ path: "./config.env" });
const express = require('express');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const { protect } = require('./middleware/auth.js');

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();

app.use(express.json());
app.get("/", ()=>{
  console.log("server running on port 5000");
});
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/private", require("./routes/private.js"));
app.use(errorHandler);

// Export the server variable
module.exports = server;

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  // Use the exported server variable to close the server
  server.close(() => process.exit(1));
});
