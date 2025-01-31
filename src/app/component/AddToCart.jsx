import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuantityInput from "./NumberInput";
import useGlobalStore from "../store/global";
import { useUser } from "@clerk/nextjs";

function AddToCart({ modalProduct, open, setOpen, handleAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const { setIsLoading } = useGlobalStore((state) => state);
  const { isSignedIn } = useUser();
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setQuantity(1);
  }, [open]);
  return (
    <Dialog
      id="add-to-cart"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="text-white">
        {" "}
        Add {modalProduct.title} to cart ?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ textAlign: "center" }} className="text-3xl">
          Quantity:
        </Typography>
        <QuantityInput
          max={modalProduct.stock}
          value={quantity}
          setValue={setQuantity}
        />
        <DialogContentText id="alert-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            if (!isSignedIn) {
              alert("Cannot add to cart, please sign in before proceeding.");
              setOpen(false);
              return;
            } else {
              handleAddToCart(modalProduct, quantity);
              setOpen(false);
              setIsLoading(true);
            }
          }}
          autoFocus
        >
          Add to cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddToCart;
