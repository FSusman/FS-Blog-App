const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

blogSchema.set("toJSON", {
  transform: (document, item) => {
    item.id = item._id.toString();
    delete item._id;
    delete item.__v;
    return item;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
