import {} from "express-async-errors";
import {
  generateAccessToken,
  generateRefreshToken,
  generaterenewAccessToken,
  generateRenewToken,
} from "../middleware/validation";
import { userRegister, userLogin } from "../db_Process/sign.db";
import Web3 from "web3";
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4%22"
  )
);

// ํ์๊ฐ์
const register = async (req, res, next) => {
  const { user_id, user_pwd, user_nick } = req.body;
  const { address, privateKey } = web3.eth.accounts.create();
  console.log(address);
  console.log(privateKey, "๐");
  const dbResult = await userRegister(
    user_id,
    user_pwd,
    user_nick,
    address,
    privateKey
  );
  const [bool, msg] = dbResult;

  if (!bool) {
    res.status(409).json({ massage: msg });
  } else {
    res.status(201).json({ message: "๐ SUCCESS!" });
  }
};

// ๋ก๊ทธ์ธ
const login = async (req, res, next) => {
  const { user_id, user_pwd } = req.body;
  const logined = await userLogin(user_id, user_pwd);
  if (!logined) {
    return res.status(401).json({ message: "ํ์๊ฐ์์๋จผ์ ํด์ฃผ์ธ์" });
  }
  const accessToken = generateAccessToken(
    logined.user_nick,
    logined.address,
    logined.ip_amount
  );
  const refreshToken = generateRefreshToken(logined.user_nick, logined.address);
  res.status(200).json({
    token: { accessToken: accessToken, refreshToken: refreshToken },
    logined,
  });
};

// ๋ก๊ทธ์ธ ์ฌ์ฐ์ฅ, body์ refresh token ๊ฒ์ฆ -> access token ๋ฐ๊ธ
const loginExtension = async (req, res, next) => {
  const { refreshToken } = req.body;
  const renewAccessToken = generateRenewToken(refreshToken); // ๊ฒ์ , ์์ฑ
  if (!renewAccessToken) {
    res.sendStatus(401);
  } else {
    res.status(200).json({
      message: "์ฌ์ฐ์ฅ ์ฑ๊ณต!",
      token: { accessToken: renewAccessToken, refreshToken: refreshToken },
    });
  }
};

// ๋ก๊ทธ์์
const logout = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(412).json({ message: "no Auth" }); // 412: ํด๋ผ์ด์ธํธ์ ํค๋์ ์๋ ์ ์ ์กฐ๊ฑด์ ์๋ฒ์ ์ ์ ์กฐ๊ฑด์ ์ ์ ํ์ง ์์ต๋๋ค.
  } else {
    let body = "bye ๐๐ป";
    res.removeHeader("Authorization");
    res.end(body);
  }
};

export { register, login, loginExtension, logout };
