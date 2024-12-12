import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const SearchBar = () => {
  // const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestion([]);
    } else {
      fetchSuggestion(searchTerm);
    }
  }, [searchTerm]);

  const fetchSuggestion = async () => {
    try {
      const fetchResults = await axios.get(
        "https://fakestoreapi.com/products?query="
      );
      const dataResults = fetchResults.data;
      console.log(dataResults);
      setResultsSearch(dataResults);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (item) => {
    console.log("Item hovered:", item);
  };

  const handleOnSelect = (item) => {
    console.log("Item hovered:", item);
  };

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
        <ReactSearchAutocomplete
          items={resultsSearch}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          onHover={handleOnHover}
          placeholder="Type search"
        />
      </div>
    </Container>
  );
};

export default SearchBar;
