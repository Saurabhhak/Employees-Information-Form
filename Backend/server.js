const express = require("express");//express => Server banana
const cors = require("cors");//frontend ko backend gatekeeper
const empRoutes = require("./routes/empRoutes");
const app = express(); 
// app means poora backend server
// app.get()
// app.post()
// app.use()
// app.listen()
// [app.use Middleware lagana]
app.use(express.json());//Body read karna! 
app.use(cors());
app.get("/", (req, res) => { // GET API, GET request ka route banata hai
  res.send("Backend server is running "); //server test karne ke liye
});

app.use("/api", empRoutes);//empRoutes ke andar Ab actual URL banega
app.listen(5000, () => { // Server start on Port no. 5000
  console.log(`Server running on http://localhost:${5000}`);
});


//*-------signup--
// const express = require("express");
// const cors = require("cors");
// const authroutes = require("./routes/userRoutes");
// const app = express();
// app.use(cors());
// app.use(express.json());
// ----- HOME ROUTE (IMPORTANT)
// app.get("/", (req, res) => {
//   res.send("Backend server is running ");
// });
// app.use("/api", authroutes);
// app.listen(5000, () => {
//   console.log("server started on port 5000");
// });

// step by step one line explain why used to create server debugging the code explaination in henglish
// ---------------------------------------------------------------------
// Express framework import
// CORS import (frontend se request allow karne ke liye)
// Employee routes import
// Express app create cors
// Middleware: frontend se request allow
// Middleware: JSON body read karne ke liye
// Employee APIs ka base path
// Iska matlab: empRoutes ke saare routes ke aage /api/emps lagega
// Server start



//----------basic server create
// const express = require("express");
// const app = express();
// app.use(express.json());
// app.use("/api/auth", require('./routes/userRoutes'));
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
//-----------packages install
// npm install express pg cors bcryptjs
// express → server
// pg → PostgreSQL connection
// cors → frontend connect
// bcryptjs → password hash
