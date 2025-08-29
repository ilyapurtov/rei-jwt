import { ReiJwt } from "../ReiJwt.js";
import { ReiJwtExtractor } from "../extractors/ReiJwtExtractor.js";
import { ReiJwtSender } from "../senders/ReiJwtSender.js";
import express from "express";

// your payload type
interface UserPayload {
  id: number;
  name: string;
}

// configuration
const reiJwt = new ReiJwt<UserPayload>({
  secret: "YOUR_SECRET_KEY",
  extractor: ReiJwtExtractor.fromAuthHeaderAsBearerToken(),
  sender: ReiJwtSender.toBody(),
  accessTokenOptions: {
    signOptions: { algorithm: "HS256", expiresIn: "5m" },
    verifyOptions: { algorithms: ["HS256"] },
  },
  refreshTokenOptions: {
    signOptions: { algorithm: "HS256", expiresIn: "12h" },
    verifyOptions: { algorithms: ["HS256"] },
  },
});

const app = express();

app.use(express.json());

// test protected page
app.get("/", reiJwt.middleware(), (req, res) => {
  // getting payload
  const payload = reiJwt.getPayload(req);
  // or use a static method if you don't want to use the instance
  // const payload = ReiJwt.getPayload<UserPayload>(req);

  res.json(payload);
});

// test sign in page
app.get("/sign", (req, res) => {
  // user authorization logic...
  const user: UserPayload = {
    id: 999,
    name: "Jane",
  };

  reiJwt.signAndSend(user, res);
  // or you can send tokens yourself
  // const tokenPair = reiJwt.sign(user);
  // res.json(tokenPair)
});

// token refresh page
app.get("/refresh", reiJwt.refresher());

app.listen(3000, () => {
  console.log("server is running...");
});
