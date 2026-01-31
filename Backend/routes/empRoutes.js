// Connect route to server
const express = require("express");
const router = express.Router();
const { empPost , empGet , empUpdate , empDel } = require('../controllers/empController');
router.post("/empform", empPost);   // POST
router.get("/empform", empGet);     // Get 
router.put("/empform/:mobile", empUpdate);  // Update
router.delete("/empform/:mobile", empDel);  // Delete 
module.exports = router;