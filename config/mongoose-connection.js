const mongoose = require('mongoose');
const config = require('config');
mongoose
.connect(`${config.get("MONGODB_URI")}/wedingram`)
.then(()=>{
    console.log("database connection established");
})
.catch(err => console.error(err));