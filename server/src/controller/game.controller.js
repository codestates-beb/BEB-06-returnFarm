import { tokenValidation } from "../middleware/validation";
import db from "../db_Process/game.db";

const getBag = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  // const dbResult = db.getGameBag(tokenData.address);
  const dbResult = await db.getGameBag(req.body.address);
  // 토큰에 데이터가 있고 DB에서 가방 조회가 성공적이라면
  if (dbResult) {
    //&& tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "가방 정보를 불러오는데 실패했어.." });
  }
};

const updateBag = async (req, res, next) => {
  // bag은 배열로 들어옴
  const { address, bag } = req.body;
  // bag이 없다면
  if (!bag) {
    res.status(400).send({ message: "다시 시도해 주세요!" });
  } else {
    // bag을 db로 넘겨줌
    // --> db 프로세스 코드 넣기
    const dbResult = await db.putGameBag(address, bag); //토큰에서 address+bag배열 2개를 받음
    if (dbResult) {
      // db 작업이 성공적이라면
      res.status(200).send({ message: dbResult });
    } else {
      res.status(400).send({ message: "다시 시도해 주세요!" });
    }
  }
};

const getRand = async (req, res, next) => {
  // const tokenData = tokenValidation(); //🟠db테스트중
  // --> db 프로세스 코드 넣기
  const { address } = req.body;
  const dbResult = await db.getGameRand(address);
  // 토큰에 데이터가 있고 DB에서 땅 조회가 성공적이라면
  console.log(dbResult);
  if (dbResult) {
    //&& tokenData //🟠db테스트중
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "땅을 불러오는데 실패했어.." });
  }
};

const createRand = async (req, res, next) => {
  const { address } = req.body;

  // address가 있는지 확인
  if (!address) {
    res.status(400).send({ message: "오류가 발생했습니다!" });
  } else {
    // --> DB 프로세스 함수 작성
    const dbResult = await db.randCreate(address);

    if (dbResult) {
      res.status(200).send(dbResult);
    } else {
      res.status(400).send({ message: "오류가 발생했습니다!" });
    }
  }
};

const updateRand = async (req, res, next) => {
  const { bag } = req.body;
  // bag은 배열로 들어옴
  // bag이 없다면
  if (!bag) {
    res.status(400).send({ message: "다시 시도해 주세요!" });
  } else {
    // bag을 db로 넘겨줌
    // --> db 프로세스 코드 넣기

    if ("db true?") {
      // db 작업이 성공적이라면
      res.status(200).send({ message: null });
    } else {
      res.status(400).send({ message: "다시 시도해 주세요!" });
    }
  }
};

export { getBag, updateBag, getRand, createRand, updateRand };
