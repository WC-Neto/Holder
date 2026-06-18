import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useThemeMode } from "../../contexts/ThemeContext";

function SearchInput({
  value,
  onSearch,
  placeholder = "Buscar pedidos perto de você...",
}) {
  const { isDarkMode } = useThemeMode();

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
            bgcolor: isDarkMode ? "#1e293b" : "#f5f6f8",
            borderRadius: 4,
            color: isDarkMode ? "#f8fafc" : "#253044",
            fontSize: 15,
            "& fieldset": { border: isDarkMode ? "1px solid #253044" : "none" },
            "&:hover fieldset": { border: isDarkMode ? "1px solid #334155" : "none" },
            "&.Mui-focused": {
              bgcolor: isDarkMode ? "#253044" : "#fff",
              boxShadow: "0 0 0 2px rgba(150, 192, 190, 0.32)",
            },
            "&.Mui-focused fieldset": { border: "none" },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: isDarkMode ? "#64748b" : "#98a1b0",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}

export default SearchInput;
