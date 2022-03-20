const mongoose = require("mongoose");

const goodsSchema = mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Goods", goodsSchema); //모델이름 : Goods, 스키마 : goodsSchema
