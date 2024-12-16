import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
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
    setActiveSuggestionIndex(-1);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchProducts(input);
    }, 300);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    }
  };

  const handleMouseEnter = (index) => {
    setActiveSuggestionIndex(index);
  };

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setSearchInput("");
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
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

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        padding: { xs: "10px", sm: "20px" },
        width: "90%",
        maxWidth: "600px",
        textAlign: "center",
        backgroundColor: "background.paper", // Optional: Set background color to match the site theme
        "@media (max-width: 600px)": {
          padding: "10px",
        },
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Search for an item
      </Typography>
      <TextField
        id="product-search"
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-expanded={suggestions.length > 0}
        aria-activedescendant={
          activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : ""
        }
      />
      <Box ref={dropdownRef} sx={{ marginTop: "10px", width: "100%" }}>
        <List
          id="suggestions-list"
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "background.paper",
            position: "absolute", // Positioned absolutely within the search bar container
            top: "100%", // Position the dropdown below the input field
            width: "100%", // Ensure it spans the full width of the search bar
            zIndex: 10, // Ensure dropdown is above other elements
            "@media (max-width: 600px)": {
              maxHeight: "150px",
            },
          }}
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={suggestion.id}
              button
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => handleMouseEnter(index)}
              sx={{
                backgroundColor:
                  index === activeSuggestionIndex ? "#f0f0f0" : "inherit",
              }}
              role="option"
              id={`suggestion-${index}`}
              aria-selected={index === activeSuggestionIndex}
            >
              <ListItemText primary={suggestion.title} />
            </ListItem>
          ))}
        </List>
      </Box>

      {selectedProduct && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              "@media (max-width: 600px)": {
                fontSize: "1rem",
              },
            }}
          >
            {selectedProduct.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              "@media (max-width: 600px)": {
                fontSize: "0.875rem",
              },
            }}
          >
            {selectedProduct.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
