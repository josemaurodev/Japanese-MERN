const mongoose = require("mongoose")

// Define the statistics schema
const statisticsSchema = new mongoose.Schema({
  maxStreakHiragana: { type: Number, default: 0 },
  countingTriesMaxStreakHiragana: { type: Number, default: 0 },
  countingCorrectsMaxStreakHiragana: { type: Number, default: 0 },
  maxStreakHiraganaVowels: { type: Number, default: 0 },
  maxStreakHiraganaHandakuten: { type: Number, default: 0 },
  maxStreakHiraganaDakuten: { type: Number, default: 0 },
  maxStreakKatakana: { type: Number, default: 0 },
  maxStreakKatakanaVowels: { type: Number, default: 0 },
  maxStreakKatakanaHandakuten: { type: Number, default: 0 },
  maxStreakKatakanaDakuten: { type: Number, default: 0 },
});

const toDoItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  isDone: { type: Boolean, default: false }
});

const UserNameSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  statistics: statisticsSchema,
  toDoList: [toDoItemSchema]
})






const UserModel = mongoose.model("usernames", UserNameSchema)
module.exports = UserModel