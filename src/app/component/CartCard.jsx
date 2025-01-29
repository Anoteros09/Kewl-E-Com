import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function CartCard({ product }) {
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  console.log(product);
  return (
    <Card className="mb-4 shadow-lg rounded-lg p-4  flex flex-row items-start space-x-4">
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        className="w-56 h-56 object-cover rounded-lg"
      />
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <Typography variant="h5" className="font-bold mb-4">
            {product.title}
            <Divider />
          </Typography>

          <Typography variant="body" className="text-gray-300 mb-2">
            {product.description}
          </Typography>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body1" className="text-lg font-semibold">
              ${product.price}{" "}
              <span className="line-through text-gray-400">
                ${originalPrice}
              </span>
            </Typography>
            <Typography variant="body2" className="text-green-600">
              {product.discountPercentage}% OFF
            </Typography>
          </div>
          <Typography variant="body" className="text-gray-300 mt-4">
            Quantity: {product.quantity}
          </Typography>
        </div>
        <IconButton color="error" className="mt-4 self-start">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default CartCard;
