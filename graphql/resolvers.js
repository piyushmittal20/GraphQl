const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  getUsers: async function() {
    const users = await User.find({})

    return {
      ...users._doc
    }
  },
  getUser: async function({userInfo}) {
    const user = await User.findOne({email: userInfo.email})

    console.log(user)

    return {
      ...user._doc
    }
  },
  createUser: async function({userInput}, req) {
    // const email = args.userInput.email
    const exists = await User.findOne({email: userInput.email})
    if(exists) {
      const error = new Error("user exists already!")
      throw error
    }
    const hashPass = await bcrypt.hash(userInput.password, 12);

    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashPass
    })

    const savedUser = await user.save()

    return {
      ...savedUser._doc, _id: savedUser._id.toString()
    }
  }
};
