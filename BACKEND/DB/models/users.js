const myValidator = require("validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // isAcitve: { type: Boolean, required: true },
  todos: [
    {
      _id: mongoose.Types.ObjectId,
      text: String,
      completed: Boolean,
      addedAt: Date,
      updatedAt: Date,
    },
  ],
  meta: {
    activation: {
      isActivated: Boolean,
      activationCode: String,
      expiryDate: Date,
    },
  },
});
//

UserSchema.methods.generateAuthToken = function () {
  const expireIn = 60 * 60 * 24;
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET, {
    expiresIn: expireIn,
  });
  
  return { token: token, expireIn: expireIn };
};

UserSchema.methods.addTodo = async function (text, addedAt) {
  if (!text || !addedAt) throw new Error("no text was provided");

  const newTodo = {
    _id: mongoose.Types.ObjectId(),
    text: text,
    completed: false,
    addedAt: new Date(addedAt),
    updatedAt: null,
  };

  this.todos.push(newTodo);

  await this.save();
  return newTodo;
  
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
