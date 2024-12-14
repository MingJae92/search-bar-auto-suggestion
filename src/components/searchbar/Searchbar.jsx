import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const products = response.data;

      if (query.trim()) {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
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

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    setSelectedProduct(null);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchProducts(input);
    }, 300);
  };

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setSearchInput("");
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <ListItem>
        <ListItemText primary="Loading..." />
      </ListItem>
    );
  }

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
      <div ref={dropdownRef}>
        <List
          style={{
            marginTop: "10px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
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
      </div>

      {selectedProduct && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">{selectedProduct.title}</Typography>
          <Typography variant="body1">{selectedProduct.description}</Typography>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
