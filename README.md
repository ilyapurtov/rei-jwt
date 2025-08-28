# Rei JWT

Fastest access and refresh JWT

## Short description

This module provides simple API to fully manage access and refresh tokens in your application.

It is based on native `http` module, so it doesn't depend on `express`.

## Example Usage with express & typescript

```typescript
import express from "express";

// initialization
const reiJwt = new ReiJwt<{ userId: number }>({
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

// test protected page
app.get("/", reiJwt.middleware(), (req, res) => {
  console.log(reiJwt.getPayload(req));
  res.json("OK");
});

// test sign in page
app.get("/sign", (req, res) => {
  // validate user data...

  reiJwt.signAndSend({ userId: 5 }, res);
});

// test refresher page
app.get("/refresh", reiJwt.refresher());

app.listen(3000, () => {
  console.log("server is running...");
});
```

## Extractors

There are two built-in extractors:

`ReiJwtExtractor.fromCookie`
`ReiJwtExtractor.fromAuthHeaderAsBearerToken`

If you want to make your own, just implement `IReiJwtExtractor` interface
