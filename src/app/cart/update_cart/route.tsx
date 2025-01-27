import { neon } from "@neondatabase/serverless";
import { type NextRequest } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
  try {
    const { payload } = await req.json();
    const bytes = CryptoJS.AES.decrypt(
      payload,
      process.env.NEXT_PUBLIC_JWT_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const { productId, userId, quantity, netPrice, unitPrice } = decryptedData;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const existingData = await sql(
      `SELECT * FROM user_cart WHERE user_id = '${userId}' AND product_id = ${productId}`
    );

    if (existingData.length == 1) {
      console.log("Updating existing product");
      const { quantity: existingQuantity } = existingData[0];
      const newQuantity = existingQuantity + quantity;
      const newNetPrice = newQuantity * unitPrice;
      const resp = await sql(
        `UPDATE user_cart SET quantity = ${newQuantity}, net_price = ${newNetPrice} WHERE cart_id = ${existingData[0].cart_id}`
      );
      return Response.json({
        message: `Product added to cart successfully`,
      });
    } else {
      console.log("Adding new product");
      const resp = await sql(
        `INSERT INTO user_cart (user_id, product_id, quantity, net_price, unit_price) VALUES ('${userId}', ${productId}, ${quantity}, ${netPrice}, ${unitPrice})`
      );
      return Response.json({
        message: `Product added to cart successfully`,
      });
    }
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
