//포스트 목록 코드를 작성할 파일

const express = require("express");
const Posts = require("../schemas/defineData");
const cryptoJS = require("crypto-js");
const router = express.Router();

//포스트 작성 화면 이동
router.get("/write", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/writePost.html"));
});

//포스트 작성 데이터 DB 저장
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

  res.json({ msg: "저장되었습니다!" });
});

//포스트 목록 화면 이동
router.get("/", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/index.html"));
});

router.get("/main", async (req, res) => {
  const detailInfo = await Posts.find({});
  res.json(detailInfo);
});

//포스트 목록 화면에 포스트 데이터 내려주기
//요청 경로 앞에 '/'빠지면 라우터 경로를 찾아가지 못함...!
router.get("/detail", async (req, res) => {
  const PostId = req.query.postId;
  console.log(PostId);
  const detailInfo = await Posts.find({ postId: Number(PostId) });
  res.json(detailInfo);
});

//특정 게시물에 대한 데이터 삭제
router.delete("/detail", async (req, res) => {
  const PostId = req.query.postId;
  console.log(PostId);
  const { password } = req.body;

  const detailInfo = await Posts.deleteOne({ postId: Number(PostId) });
  res.json({ msg: "삭제되었습니다." });
});

//특정 게시물에 대한 데이터 수정
router.put("/detail", async (req, res) => {
  const { name, postId, content, title } = req.body;
  const post_list = await Posts.updateOne(
    { postId: Number(postId) },
    { $set: { name, content, title } }
  );

  res.json(post_list);
});

// //포스트 상세 화면에 필요한 데이터이동
// router.get("/detailPost", async (req, res) => {

//   const path = require("path");
//   res.json();
// });

//포스트 상세 화면 껍데기 내려주기
router.get("/detailPost/show", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/detailPost.html"));
});

module.exports = router;
