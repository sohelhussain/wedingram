const multer = require("multer");

// Configure in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
