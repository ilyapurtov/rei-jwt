import { ReiJwt } from "@/ReiJwt.js";
import express from "express";
import { ReiJwtExtractor } from "@/ReiJwtExtractor.js";

const reiJwt = new ReiJwt<{
  userId: number;
}>({
  secret: "secret",
  extractor: ReiJwtExtractor.fromCookie({
    accessTokenMaxAge: "5m",
    refreshTokenMaxAge: "12h",
  }),
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

app.get("/", reiJwt.middleware(), (req, res) => {
  console.log(reiJwt.getPayload(req));
  res.json("OK");
});

app.get("/sign", (req, res) => {
  reiJwt.signAndSend({ userId: 5 }, res);
});

app.get("/refresh", reiJwt.refresher());

app.listen(3000, () => {
  console.log("server is running...");
});
