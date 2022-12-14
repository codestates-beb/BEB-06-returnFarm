import {
  bag_list,
  land_list,
  land_update,
  bagObj_remove,
} from "../db_Process/game.db";

const getBag = async (req, res, next) => {
  const { address } = req.body;
  const dbResult = await bag_list(address);
  if (dbResult) {
    // console.log(dbResult, "๐ฅ");
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "๊ฐ๋ฐฉ ์ ๋ณด๋ฅผ ๋ถ๋ฌ์ค๋๋ฐ ์คํจํ์ด.." });
  }
};

const updateBag = async (req, res, next) => {
  const { address, itemName, count } = req.body;
  const dbResult = await bagObj_remove(address, itemName, count);
  console.log(dbResult);
  if (dbResult) {
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ massage: "๋ค์ ์๋ํด ์ฃผ์ธ์!" });
  }
};

const searchRand = async (req, res, next) => {
  const { address } = req.body;

  // address๊ฐ ์๋์ง ํ์ธ
  if (!address) {
    res.status(400).send({ message: "์ค๋ฅ๊ฐ ๋ฐ์ํ์ต๋๋ค!" });
  } else {
    // --> DB ํ๋ก์ธ์ค ํจ์ ์์ฑ
    const dbResult = await land_list(address);

    if (dbResult) {
      res.status(200).send(dbResult);
    } else {
      res.status(400).send({ message: "์ค๋ฅ๊ฐ ๋ฐ์ํ์ต๋๋ค!" });
    }
  }
};

const updateRand = async (req, res, next) => {
  const { rand } = req.body;
  // rand๋ ๋ฐฐ์ด๋ก ๋ค์ด์ด
  // rand๊ฐ ์๋ค๋ฉด
  if (!rand) {
    res.status(400).send({ message: "๋ค์ ์๋ํด ์ฃผ์ธ์!" });
  } else {
    const dbResult = await land_update(address, rand);

    if (dbResult) {
      // db ์์์ด ์ฑ๊ณต์ ์ด๋ผ๋ฉด
      res.status(200).send(dbResult);
    } else {
      res.status(400).send({ message: "๋ค์ ์๋ํด ์ฃผ์ธ์!" });
    }
  }
};

export { getBag, updateBag, searchRand, updateRand };
