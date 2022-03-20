const express = require("express");
const Goods = require("../schemas/goods");
const router = express.Router(); //router라는 객체를 새롭게 만듦

router.get("/", (req, res) => {
  res.send("this is root page");
});

router.get("/goods", async (req, res) => {
  const { category } = req.query;

  //함수가 비동기(async)로 바뀌어야 await를 사용할 수 있음
  const goods = await Goods.find({ category }); //Goods 모델에서 사용되는 기능들은 전부 promise 객체로 내보내짐 그래서 await를 사용해야 원하는 값을 얻어올 수 있음
  res.json({
    goods, //goods라는 키에 goods라는 배열값(8번줄)에 할당함, 그런데 JS에서 똑같은 key:value의 객체가 있다면 한번만 작성해서 객체 초기화를 할수 있게 해줌
  });
});

// :000 가 나오면 아무 값이나 입력받겠다는 의미
// /goods/:아무값(goodsId)
router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params; //goodsId에 접근하는 방법

  const [detail] = await Goods.find({ goodsId: Number(goodsId) });

  //detail 이라는 변수로 첫번째 아이템을 받아옴, 두번째 아이템 받아올 경우 -> detail2, ...
  //각각의 item의 goodsId가 req.params.goodsId와 같은 배열에서 첫번째 요소를 뽑아옴! = 배열의 비구조화 (destructuring)
  // const [detail] = goods.filter((item) => item.goodsId === Number(goodsId));
  res.json({
    detail,
  });
});

router.post("/goods", async (req, res) => {
  //post메서드로 '/goods'라는 주소로
  const { goodsId, name, thumbnailUrl, category, price } = req.body; //{}안의 항목들을 body로 요청 받았을때

  const goods = await Goods.find({ goodsId }); // find()는 promise를 반환함, db에서 동일한 goodsId가 있는지 찾아서 goods변수에 할당하고
  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 있는 데이터입니다.",
    });
  }

  const createdGoods = await Goods.create({
    //await 로 작성해야 해당 코드가 모두 수행된 뒤에 return이 실행됨
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods }); //res로 json형태로 보여줌
});

module.exports = router; //router를 모듈로써 내보내겠다는 의미
