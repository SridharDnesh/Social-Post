const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    img: { data: Buffer, contentType: String },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", PostSchema);

module.exports = Image;
