
const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');








require('dotenv').config();

module.exports.adminPageController = (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.send('this is a admin');
  } else {
    res.status(404).send('Not found');
  }
};


async function createAdminIfNotExists() {
  try {
    if(process.env.NODE_ENV === 'development'){
      const adminExists = await adminModel.findOne({role: 'admin'});
      if(!adminExists){
        await adminModel.create({
          email: process.env.ADMIN_EMAIL,
          password: await bcrypt.hash(process.env.ADMIN_PASSWORD,10),
          role: 'admin'
        })
        console.log('admin is created successfull')
      }else{
        console.log('admin is alredy created')
      }
    }
  } catch (error) {
   console.log(error.message); 
  }
}
createAdminIfNotExists();