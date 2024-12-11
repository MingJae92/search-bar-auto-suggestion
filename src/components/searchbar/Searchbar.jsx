import React from 'react';
import { TextField, InputAdornment, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ width: '300px' }}>
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
        />
      </div>
    </Container>
  );
};

export default SearchBar;
