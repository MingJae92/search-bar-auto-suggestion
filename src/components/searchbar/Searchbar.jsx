import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SearchBar = () => {
  // const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResults = await axios.get("https://fakestoreapi.com/products");
        const dataResults = fetchResults.data; // axios already parses JSON
        console.log(dataResults);
        setResults(dataResults);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h5>...loading</h5>;
  }

  if (error) {
    return <h5>Error: {error.message}</h5>;
  }

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <div style={{ width: "300px" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </Container>
  );
};

export default SearchBar;
