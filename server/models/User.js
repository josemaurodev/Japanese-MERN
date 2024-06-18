const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  currentStreakHiraga: { type: Number, default: 0 },
  maxStreakHiragana: { type: Number, default: 0 },
  countingTriesHiragana: { type: Number, default: 0 },
  countingCorrectsHiragana: { type: Number, default: 0 },
  
  currentStreakKatakana: { type: Number, default: 0 },
  maxStreakKatakana: { type: Number, default: 0 },
  countingTriesKatakana: { type: Number, default: 0 },
  countingCorrectsKatakana: { type: Number, default: 0 },

});

const toDoItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const UserNameSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  statistics: statisticsSchema,
  toDoList: { type: [toDoItemSchema], default: [] }, 
});

const UserModel = mongoose.model("User", UserNameSchema);
module.exports = UserModel;
