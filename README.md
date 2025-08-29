# Rei JWT

Fastest access and refresh JWT

## Short description

This module provides simple API to fully manage access and refresh tokens in your application.

It is based on native `http` module, so it doesn't depend on `express`.

## Installation

`npm i rei-jwt`

## Example Usage with express & typescript

```typescript
import { ReiJwt, ReiJwtExtractor, ReiJwtSender } from "rei-jwt";
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
```

## Extractors

There are two built-in extractors:

- `ReiJwtExtractor.fromCookie`
- `ReiJwtExtractor.fromAuthHeaderAsBearerToken`

If you want to make your own, just implement `IReiJwtExtractor` interface

## Senders

There are two built-in senders:

- `ReiJwtExtractor.toBody(BodySenderOptions)`
- `ReiJwtExtractor.toCookie(CookieSenderOptions)`

They both can be configured.

### Body Sender

```typescript
interface BodySenderOptions {
  /**
   * Function for formatting token pair
   * as you want
   * @param {TokenPair} tokenPair
   * @returns {string}
   * @default (tokenPair) => JSON.stringify(tokenPair)
   */
  formatFunction?: (tokenPair: TokenPair) => string;

  /**
   * Content-Type header value
   * @default "application/json"
   */
  contentType?: string;
}
```

### Cookie sender

```typescript
interface CookieSenderOptions {
  /**
   * Max age for access token cookie
   * @default "10m"
   */
  accessTokenMaxAge?: ms.StringValue;

  /**
   * Max age for refresh token cookie
   * @default "24h"
   */
  refreshTokenMaxAge?: ms.StringValue;

  /**
   * Display debug messages?
   * @default false
   */
  debug?: boolean;

  /**
   * Allow only https cookies?
   * @default false
   */
  secure?: boolean;

  /**
   * If true, cookies cannot be accessed
   * from javascript on client side
   * @default true
   */
  httpOnly?: boolean;

  /**
   * Path for cookies
   * @default "/"
   */
  path?: string;

  /**
   * SameSite rule for cookies
   * @default "Strict"
   */
  sameSite?: "None" | "Strict" | "Lax";

  /**
   * Domain for cookies
   * @default undefined
   */
  domain?: string;
}
```

If you want to make your own token sender, just implement `IReiJwtSender` interface

## TODO

- improve debugging mode
- make a client version of this (for vue/react)

## Changelog

### v1.0.0 - v.1.0.2

- idk some patches

### MAJOR v1.0.3

- sending and extracting logic were divided, now you should manually provide "sender" and "extractor" in configuration
- more jsdocs added
