// const userModels = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const  generateToken  = require("../utils/generateToken");


// module.exports.userCreateController = async (req, res) => {
//     try {
//         let { email, password, firstName } = req.body;
//         let user = await userModels.findOne({ email: email })

//         if (user) return res.status(401).send("you already have an account, please login.")

//         bcrypt.genSalt(10, function (err, salt) {
//             bcrypt.hash(password, salt, async function (err, hash) {
//                 if (err) return res.send(err.message);
//                 else {
//                     let user = await userModels.create({
//                         email,
//                         password: hash,
//                         firstName,
//                     });

//                     let token = generateToken(user)
//                     res.cookie("token", token)
//                     res.send(user)
//                     res.redirect("userProfile");

//                 }
//             });
//         });
//     } catch (err) {
//         res.send(err.message);
//     }
//   }



const userModels = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.userCreateController = async (req, res) => {
    try {
        let {
            firstName,
            lastName,
            gender,
            lookingFor,
            dob,
            category,
            education,
            country,
            state,
            city,
            phoneNumber,
            email,
            age,
            maritalStatus,
            district,
            block,
            panchayt,
            village,
            fathersName,
            mothersName,
            disability,
            hobbies,
            caste,
            diet,
            complexion,
            drink,
            smoke,
            height,
            password
        } = req.body;

        let user = await userModels.findOne({ email: email });

        if (user) return res.status(401).send("You already have an account, please login.");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let newUser = await userModels.create({
                        firstName,
                        lastName,
                        gender,
                        lookingFor,
                        dob,
                        category,
                        education,
                        country,
                        state,
                        city,
                        phoneNumber,
                        email,
                        age,
                        maritalStatus,
                        district,
                        block,
                        panchayt,
                        village,
                        fathersName,
                        mothersName,
                        disability,
                        hobbies,
                        caste,
                        diet,
                        complexion,
                        drink,
                        smoke,
                        height,
                        password: hash
                    });

                    let token = generateToken(newUser);
                    res.cookie("token", token);
                    res.send(newUser);
                    // res.redirect("userProfile");
                }
            });
        });
    } catch (err) {
        res.send(err.message);
    }
}
