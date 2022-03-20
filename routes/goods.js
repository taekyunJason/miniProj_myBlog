const express = require("express");
const router = express.Router(); //router라는 객체를 새롭게 만듦

router.get("/", (req, res) => {
  res.send("this is root page");
});

const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

router.get("/goods", (req, res) => {
  res.json({
    goods, //goods라는 키에 goods라는 배열값(8번줄)에 할당함, 그런데 JS에서 똑같은 key:value의 객체가 있다면 한번만 작성해서 객체 초기화를 할수 있게 해줌
  });
});

// :000 가 나오면 아무 값이나 입력받겠다는 의미
// /goods/:아무값(goodsId)
router.get("/goods/:goodsId", (req, res) => {
  const goodsId = req.params.goodsId; //goodsId에 접근하는 방법

  //detail 이라는 변수로 첫번째 아이템을 받아옴, 두번째 아이템 받아올 경우 -> detail2, ...
  //각각의 item의 goodsId가 req.params.goodsId와 같은 배열에서 첫번째 요소를 뽑아옴! = 배열의 비구조화 (destructuring)
  const [detail] = goods.filter((item) => item.goodsId === Number(goodsId));

  res.json({
    detail,
  });
});
module.exports = router; //router를 모듈로써 내보내겠다는 의미
