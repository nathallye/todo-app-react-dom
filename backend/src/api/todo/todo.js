const restful = require("node-restful");
const mongoose = restful.mongoose; // o node-restful cria como se fosse uma casca emcima do mongoose resutando em uma api rest quase pronta

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = restful.model("Todo", todoSchema);