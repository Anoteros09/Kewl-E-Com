"use client";
import React from "react";
import {
  Slider,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import useProductStore from "../product/store";

function Filter() {
  const {
    priceRange,
    setPriceRange,
    rating,
    setRating,
    brands,
    setBrands,
    categories,
    setCategories,
    discount,
    setDiscount,
  } = useProductStore((state) => state);

  const handleReset = () => {
    setPriceRange([1, 100]);
    setRating(4.0);
    setBrands([]);
    setCategories([]);
    setDiscount([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={5} id="filter-form">
        <FormControl>
          <InputLabel>
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
          </InputLabel>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </FormControl>
        <TextField
          label="Rating"
          type="number"
          inputProps={{ min: 0, max: 5, step: 0.1 }}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <FormControl>
          <InputLabel id="brand-select-label">Brands</InputLabel>
          <Select
            label="Brands"
            labelId="brand-select-label"
            multiple
            value={brands}
            onChange={(e) => setBrands(e.target.value)}
          >
            <MenuItem value="brand1">Brand 1</MenuItem>
            <MenuItem value="brand2">Brand 2</MenuItem>
            <MenuItem value="brand3">Brand 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="categories-select-label">Categories</InputLabel>
          <Select
            label="Categories"
            labelId="categories-select-label"
            multiple
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          >
            <MenuItem value="category1">Category 1</MenuItem>
            <MenuItem value="category2">Category 2</MenuItem>
            <MenuItem value="category3">Category 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <label>Discount:</label>
          <FormControlLabel
            control={
              <Checkbox
                checked={discount.includes("10")}
                onChange={(e) =>
                  setDiscount(
                    e.target.checked
                      ? [...discount, "10"]
                      : discount.filter((d) => d !== "10")
                  )
                }
                value="10"
              />
            }
            label="10% or more"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={discount.includes("20")}
                onChange={(e) =>
                  setDiscount(
                    e.target.checked
                      ? [...discount, "20"]
                      : discount.filter((d) => d !== "20")
                  )
                }
                value="20"
              />
            }
            label="20% or more"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={discount.includes("50")}
                onChange={(e) =>
                  setDiscount(
                    e.target.checked
                      ? [...discount, "50"]
                      : discount.filter((d) => d !== "50")
                  )
                }
                value="50"
              />
            }
            label="50% or more"
          />
        </FormControl>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Filter
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default Filter;
