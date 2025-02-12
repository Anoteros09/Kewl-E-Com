"use server";
import CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_JWT_KEY; // Use a secure key stored in your environment

export async function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}
