//전체 서버 코드를 작성할 파일

const express = require("express");
const connect = require("./schemas"); //index라는 파일이름은 특별해서 호출할때 생략가능
const port = 3000;

const app = express(); //app 변수에 express 서버 객체를 할당
//mongoDB client mongoose와 localhost 연결
connect();

const postsRouter = require("./routes/postList");

//requestMiddleware라는 변수에  함수를 만들고 함수를 할당
//arrow func는 값으로, 함수는 1급 객체라서 값으로 다룰수 있음
//함수를 requestMiddleware라는 변수에 할당하고 해당 변수를 사용함
const requestMiddleware = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//app.use : 미들웨어를 붙일수 있는 코드,
app.use(express.json()); //json함수를 실행하면 body에 들어오는 json형태의 데이터를 코드에서 사용할 수 있게 파싱해주는 미들웨어
//-> 이것이 없으면 req.body에는 undefined가 들어옴
app.use(requestMiddleware);

//api 경로로 들어왔을때만 goodsRouter라는 미들웨어를 실행시키겠다는 코드
//app.use("/api", [goodsRouter, userRouter]); -> 두개의 라우터를 실행한다.
//express 에서는 routing을 미들웨어로 처리함 -> 이렇게 하기 위해 Router라는 객체를 사용함
app.use("/thinkTank", [postsRouter]);

//app.get으로 res를 실행할때 제대로 구현이 됨.
//routing은 클라이언트의 요청 조건(메서드, 주소 등)에 대응해서 응답하는 방식
app.get("/", (req, res) => {
  res.send("Please type '/thinkTank' behind your URL!");
});

//처음에 미들웨어를 구현해야
// app.use((req, res, next) => {

//   if (req.path === "/test") {
//     res.send("test주소 입니다");
//   } else {
//     next();
//   }
//   next();
// });
//코드 진행을 하다가 항상 미들웨어를 거치는데, 중간에 next()를 만나면 다음 미들웨어(router)로 넘어감
//next()코드를 만나야 다음 미들웨어로 넘어갈 수 있음
//서버에 요청이 들어오면 코드가 실행되다가, if next()가 없으면 함수에 끝이 없기때문에 브라우저에서 무한 로딩(서버에서 응답을 못받아옴)이 걸림
//next()는 다음 미들웨어로 넘어가게 도와주는 역할

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/templates/index.html");
// });

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요");
});
