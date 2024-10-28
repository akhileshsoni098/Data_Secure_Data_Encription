const { encryptData, decryptData } = require("../helperFunction/helper");
const userData = require("../models/userDataModel");

const encryptKey = process.env.ENC_KEY
console.log(encryptKey)


// create 
exports.createUser = async (req, res) => {
  try {
    let data = req.body;

    let { name, email, phone, age, address } = data;

    let validFilds = ["name", "email", "phone", "age", "address"];
    for (const name in validFilds) {
      if (!data.hasOwnProperty(validFilds[name])) {
        return res
          .status(400)
          .json({ message: `Missing ${validFilds[name]} field` });
      }
    }
    data.phone = encryptData(phone, encryptKey);

    data.address= encryptData(address, encryptKey);
console.log(data);
    const saveUserData = await userData.create(data);

    res
      .status(201)
      .json({ message: "User created successfully", data: saveUserData });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

//update
exports.updateUserData = async (req, res) => {
  try {

    const userId = req.params.userId;
    let data = req.body;

    if (data.phone) {
      data.phone = encryptData(data.phone, encryptKey);
    }

    if (data.address) {
      data.address = encryptData(data.address, encryptKey);
    }

    const updateUserData = await userData.findByIdAndUpdate(userId, {...data},{new:true});

    res
      .status(201)
      .json({ message: "User created successfully", data: updateUserData });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
 
// get 
exports.getUserData = async (req, res)=>{
    try{
        const userId = req.params.userId;

        const user = await userData.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        user.phone = decryptData(user.phone, encryptKey);
        console.log(user.phone);
        
        user.address = decryptData(user.address, encryptKey);

        res.status(200).json({ message: "User data", data: user });
    }catch(err){
        res.status(500).json({ status: false, message: err.message });
    }
}