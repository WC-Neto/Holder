import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
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

const CategorySelector = ({ onSelect, value }) => {
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {CATEGORIES.map((cat) => (
          <OrderCategoryCard
            key={cat.id}
            title={cat.title}
            icon={cat.icon}
            isSelected={selectedCategory === cat.id}
            onClick={() => handleCategoryClick(cat.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategorySelector;
