import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import OrderCategoryCard from "./OrderCategoryCard";

const CATEGORIES = [
  {
    id: "Compras",
    title: "Compras",
    icon: <ShoppingCartOutlinedIcon fontSize="large" />,
  },
  {
    id: "Consertos",
    title: "Consertos",
    icon: <HomeRepairServiceOutlinedIcon fontSize="large" />,
  },
  {
    id: "Companhia",
    title: "Companhia",
    icon: <PeopleOutlinedIcon fontSize="large" />,
  },
  {
    id: "Reparos",
    title: "Reparos",
    icon: <BuildOutlinedIcon fontSize="large" />,
  },
  {
    id: "Outros",
    title: "Outros",
    icon: <MoreHorizOutlinedIcon fontSize="large" />,
  },
];

const CategorySelector = ({ onSelect, value, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(value || "");
  useEffect(() => {
    if (value !== undefined) {
      setSelectedCategory(value);
    }
  }, [value]);

  const handleCategoryClick = (categoryId) => {
    // toggle: limpar a seleção se clicar na categoria já selecionada
    const newCategory = selectedCategory === categoryId ? "" : categoryId;

    setSelectedCategory(newCategory);
    if (onSelect) {
      onSelect(newCategory);
    }
    if (onChange) {
      onChange({ target: { name: "categoria", value: newCategory } });
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#253044",
        }}
      >
        Qual o tipo de ajuda você precisa?
      </Typography>
      <Grid container spacing={2}>
        {CATEGORIES.map((cat) => (
          <Grid item xs={6} sm={4} md={2.4} key={cat.id}>
            <OrderCategoryCard
              title={cat.title}
              icon={cat.icon}
              isSelected={selectedCategory === cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySelector;
