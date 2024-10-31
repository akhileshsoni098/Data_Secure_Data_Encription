const { Error } = require("mongoose");
const userAuthModel = require("../../models/userDataModel");
const { encryptData, decryptData } = require("../../helperFunction/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = process.env.ENC_KEY;

const resolversUserAuth = {
  Query: {
    getProfile: async (parent, args, context) => {
      try {
        if (!context || !context.user) {
          throw new Error("UnAuthorized Access");
        }

        const profile = await userAuthModel.findById(context.user._id);

        if (!profile) {
          throw new Error("There is some issue occurs to fetch profile");
        }



return {
            id: profile._id,
            name: profile.name,
            email: profile.email,
            phone: decryptData(profile.phone,key),
            password: profile.password,
            age: profile.age,
            address: decryptData(profile.address,key),
            role: profile.role,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
}


      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    register: async (parent, args) => {
      try {
        let data = { ...args };
        if (!args) {
          throw new Error("All fields are required.");
        }
        data.phone = encryptData(data.phone, key);
        data.address = encryptData(data.address, key);

        // hash password
        data.password = data.password = await bcrypt.hash(data.password, 10);

        const registerUser = await userAuthModel.create(data);
        console.log(registerUser);
        const token = jwt.sign(
          { _id: registerUser._id },
          process.env.JWT_SECRET_KEY
        );

        return {
          token,
          user: {
            id: registerUser._id,
            name: registerUser.name,
            email: registerUser.email,
            phone: registerUser.phone,
            password: registerUser.password,
            age: registerUser.age,
            address: registerUser.address,
            role: registerUser.role,
            createdAt: registerUser.createdAt,
            updatedAt: registerUser.updatedAt,
          },
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    logIn: async (parent, args) => {
      try {
        let data = { ...args };
        if (!args) {
          throw new Error("All fields are required.");
        }

        const check = await userAuthModel.findOne({ email: data.email });
        if (!check) {
          throw new Error("user not found");
        }
        // hash password
        const isValidPass = await bcrypt.compare(data.password, check.password);
        if (!isValidPass) {
          throw new Error("user not found");
        }
        const token = jwt.sign({ _id: check._id }, process.env.JWT_SECRET_KEY);

        return {
          token,
          user: {
            id: check._id,
            name: check.name,
            email: check.email,
            phone: check.phone,
            password: check.password,
            age: check.age,
            address: check.address,
            role: check.role,
            createdAt: check.createdAt,
            updatedAt: check.updatedAt,
          },
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updateProfile: async (parent, args, context) => {
      try {
        if (!context || !context.user) {
          throw new Error("UnAuthorized Access");
        }

        let data = { ...args };

        data.phone = encryptData(data.phone, key);
        data.address = encryptData(data.address, key);

        const updateProfileData = await userAuthModel.findByIdAndUpdate(
          context.user._id,
          { ...data },
          { new: true }
        );

        if (!updateProfileData) {
          throw new Error("there is something worng in update Profile");
        }
        return {
          id: updateProfileData._id,
          name: updateProfileData.name,
          email: updateProfileData.email,
          phone: updateProfileData.phone,
          password: updateProfileData.password,
          age: updateProfileData.age,
          address: updateProfileData.address,
          role: updateProfileData.role,
          createdAt: updateProfileData.createdAt,
          updatedAt: updateProfileData.updatedAt,
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    deleteProfile: async (parent, args, context) => {
      try {
        if (!context || !context.user) {
          throw new Error("UnAuthorized Access");
        }

        const deleteProfileData = await userAuthModel.findByIdAndDelete(
          context.user._id
        );

        if (!deleteProfileData) {
          throw new Error("There is something wrong in delete Profile");
        }

        return "Profile Deleted Succesfully";
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolversUserAuth;
