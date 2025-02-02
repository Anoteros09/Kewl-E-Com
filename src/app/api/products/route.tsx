// import { NextRequest, NextResponse } from "next/server";
// import { neon } from "@neondatabase/serverless";
// import fs from "fs/promises";
// import path from "path";

// export async function POST(req: NextRequest) {
//   const filePath = path.join(
//     process.cwd(),
//     "src",
//     "app",
//     "data",
//     "products.json"
//   );
//   const data = await fs.readFile(filePath, "utf-8");
//   const { products } = JSON.parse(data);
//   const sql = neon(`${process.env.DATABASE_URL}`);
//   for (const product of products) {
//     await sql(
//       `INSERT INTO products
//       (title, description, category, price, discount_percentage, rating, stock, tags, brand, sku, weight, dimensions,
//        warranty_information, shipping_information, availability_status, reviews, return_policy, minimum_order_quantity,
//        meta, images, thumbnail)
//       VALUES
//       ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
//       [
//         product.title,
//         product.description,
//         product.category,
//         product.price,
//         product.discountPercentage,
//         product.rating,
//         product.stock,
//         product.tags,
//         product.brand,
//         product.sku,
//         product.weight,
//         JSON.stringify(product.dimensions),
//         product.warrantyInformation,
//         product.shippingInformation,
//         product.availabilityStatus,
//         JSON.stringify(product.reviews),
//         product.returnPolicy,
//         product.minimumOrderQuantity,
//         JSON.stringify(product.meta),
//         product.images,
//         product.thumbnail,
//       ]
//     );
//   }
//   return NextResponse.json(
//     { message: "Products inserted successfully" },
//     { status: 201 }
//   );
// }
