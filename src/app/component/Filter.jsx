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
  Autocomplete,
  Chip,
} from "@mui/material";
import useProductStore from "../product/store";

function Filter() {
  const {
    priceRange,
    selPriceRange,
    setSelPriceRange,
    rating,
    setRating,
    brands,
    selBrands,
    setSelBrands,
    categories,
    selCategories,
    setSelCategories,
    discount,
    setDiscount,
    setFilter,
  } = useProductStore((state) => state);

  const brandOptions = brands.map((brand) => ({ label: brand }));
  const handleReset = () => {
    setSelPriceRange(priceRange);
    setRating(4.0);
    setSelBrands([]);
    setSelCategories([]);
    setDiscount([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={5} id="filter-form">
        <FormControl>
          <InputLabel>
            Price: ${selPriceRange[0]} - ${selPriceRange[1]}
          </InputLabel>
          <Slider
            value={selPriceRange}
            onChange={(e, newValue) => setSelPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={priceRange[0]}
            max={priceRange[1]}
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
            value={selBrands}
            // sx={{ height: "56px" }}
            onChange={(e) => setSelBrands(e.target.value)}
            // renderValue={(selected) => (
            //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            //     {selected.map((value) => (
            //       <Chip key={value} label={value} />
            //     ))}
            //   </Box>
            // )}
          >
            {brands.map((brand) => (
              <MenuItem value={brand} key={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="categories-select-label">Categories</InputLabel>
          <Select
            label="Categories"
            labelId="categories-select-label"
            multiple
            value={selCategories}
            onChange={(e) => setSelCategories(e.target.value)}
          >
            {categories.map((brand) => (
              <MenuItem value={brand} key={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <label>Discount:</label>
          <FormControlLabel
            control={
              <Checkbox
                checked={discount == 10}
                onChange={(e) => setDiscount(e.target.checked ? 10 : 0.0)}
                value={10}
              />
            }
            label="10% or more"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={discount == 20}
                onChange={(e) => setDiscount(e.target.checked ? 20 : 0.0)}
                value={20}
              />
            }
            label="20% or more"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={discount == 50}
                onChange={(e) => setDiscount(e.target.checked ? 50 : 0.0)}
                value={50}
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
