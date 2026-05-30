import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({
  value,
  onSearch,
  placeholder = "Buscar pedidos perto de você...",
}) {
  const handleChange = (event) => {
    onSearch?.(event.target.value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#a0a9b8", fontSize: 22 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: 56,
            bgcolor: "#f5f6f8",
            borderRadius: 4,
            color: "#253044",
            fontSize: 15,
            "& fieldset": { border: "none" },
            "&:hover fieldset": { border: "none" },
            "&.Mui-focused": {
              bgcolor: "#fff",
              boxShadow: "0 0 0 2px rgba(150, 192, 190, 0.32)",
            },
            "&.Mui-focused fieldset": { border: "none" },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#98a1b0",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}

export default SearchInput;
