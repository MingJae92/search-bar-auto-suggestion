import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";

const Searchbar = () => {
  
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;
        console.log(response);
        if (input.trim()) {
          const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(input.toLowerCase())
          );
          setSuggestions(filteredProducts);
        } else {
          setSuggestions([]);
        }
      
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchInput]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    setSelectedProduct(null);
  };
    

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setSearchInput("");
    setSuggestions([]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <>
        <List
          style={{ marginTop: "10px", maxHeight: "200px", overflowY: "auto" }}
        >
          {suggestions.map((suggestion) => (
            <ListItem
              key={suggestion.id}
              button
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <ListItemText primary={suggestion.title} />
            </ListItem>
          ))}
        </List>

        {selectedProduct && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">{selectedProduct.title}</Typography>
            <Typography variant="body1">
              {selectedProduct.description}
            </Typography>
          </div>
        )}
      </>
      
    </div>
  );
};

export default Searchbar;
