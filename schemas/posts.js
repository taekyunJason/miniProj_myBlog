//DB와 연결된 mongoose에서 프로젝트에 필요한 데이터의 형태/규격 정의

const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Posts", postsSchema); //모델이름 : Posts, 스키마 : postsSchema
