import CryptoJS from "crypto-js";
import { SECRET } from "./constant";

const SECRET_KEY = SECRET;

export const generateToken = (payload: object) => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const encodedHeader = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
  const encodedPayload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)));

  const token = `${encodedHeader}.${encodedPayload}`;
  const signature = CryptoJS.HmacSHA256(token, SECRET_KEY).toString(CryptoJS.enc.Base64);

  return `${token}.${signature}`;
};

export const verifyToken = (token: string) => {
  try {
    const [header, payload, signature] = token.split(".");
    const data = `${header}.${payload}`;
    const expectedSignature = CryptoJS.HmacSHA256(data, SECRET_KEY).toString(CryptoJS.enc.Base64);

    if (signature === expectedSignature) {
      const decodedPayload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(payload)));
      return decodedPayload;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};