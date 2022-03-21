//포스트 목록 코드를 작성할 파일

const express = require("express");
const Posts = require("../schemas/posts");
const cryptoJS = require("crypto-js");
const { schema } = require("../schemas/posts");
const router = express.Router();

//포스트 목록 화면 내려주기
router.get("/", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/writePost.html"));
});

//포스트 목록 화면 내려주기
router.get("/main", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/index.html"));
});

//포스트 상세 화면 데이터 내려주기
router.post("detail/detailData", async (req, res) => {
  const { num } = req.body;
  const detailInfo = await Posts.find({ num });
  res.json(detailInfo);
});

router.post("/detail", async (req, res) => {
  const today = new Date();
  const date = today.toLocaleString();
  const { title, name, password, content } = req.body;
  //   const postId = Post_ls[Post_ls.length - 1]["postId"];

  const getId = await Posts.find({});
  //   console.log(getId);

  var hash = cryptoJS.SHA256(date);
  const postId = hash["words"][0];

  //   const postId = getId[getId.length - 1]["postId"] + 1;
  //   console.log(postIdCnt);

  //   const postId = await Posts.find({ postId: postIdCnt });

  //   if (postId.length) {
  //     return res.status(400).json({
  //       success: false,
  //       errorMessage: "이미 저장된 데이터 입니다.",
  //     });
  //   } else {
  const Post_ls = await Posts.create({
    title,
    postId,
    name,
    password,
    content,
    date,
  });

  //   const createdPosts = await Posts.create({
  //     title,
  //     postId: postIdCnt,
  //     name,
  //     password,
  //     date,
  //     content,
  //   });

  res.json({ msg: "저장되었습니다!" });
});

module.exports = router;
