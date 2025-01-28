import CryptoJS from "crypto-js";

export function decryptData(payload) {
  const bytes = CryptoJS.AES.decrypt(payload, process.env.NEXT_PUBLIC_JWT_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
