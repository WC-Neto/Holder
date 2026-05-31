import React, { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export const availableOrderFilters = [
  { id: "all", label: "Filtros" },
  { id: "urgent", label: "Urgentes" },
  { id: "shopping", label: "Compras" },
  { id: "repairs", label: "Reparos" },
  { id: "company", label: "Companhia" },
];

const filterIcons = {
  all: TuneIcon,
  urgent: PriorityHighIcon,
  shopping: LocalGroceryStoreOutlinedIcon,
  repairs: HomeRepairServiceOutlinedIcon,
  company: PeopleAltOutlinedIcon,
};

const filterPillIn = {
  "@keyframes filterPillIn": {
    "0%": {
      opacity: 0,
      transform: "translateX(-8px) scale(0.96)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0) scale(1)",
    },
  },
};

function VolunteerOrderFilters({ activeFilter = "all", onFilterChange }) {
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);
  const mainFilter = availableOrderFilters[0];
  const categoryFilters = availableOrderFilters.slice(1);
  const visibleCategoryFilters = useMemo(() => {
    if (showCategoryFilters || activeFilter !== "all") {
      return categoryFilters;
    }

    return [];
  }, [activeFilter, showCategoryFilters]);

  const handleMainFilterClick = () => {
    setShowCategoryFilters((current) => !current);

    if (activeFilter !== "all") {
      onFilterChange?.("all");
    }
  };

  const renderFilterButton = (filter) => {
    const Icon = filterIcons[filter.id];
    const isActive = activeFilter === filter.id;

    return (
      <Button
        key={filter.id}
        type="button"
        aria-pressed={isActive}
        onClick={
          filter.id === "all"
            ? handleMainFilterClick
            : () => onFilterChange?.(filter.id)
        }
        startIcon={Icon ? <Icon sx={{ fontSize: 17 }} /> : null}
        sx={{
          minHeight: 42,
          px: 2,
          borderRadius: 999,
          whiteSpace: "nowrap",
          bgcolor: isActive ? "#253044" : "#f5f6f8",
          color: isActive ? "#fff" : "#3d4758",
          fontSize: 14,
          fontWeight: isActive ? 800 : 600,
          textTransform: "none",
          boxShadow: isActive ? "0 8px 18px rgba(37, 48, 68, 0.14)" : "none",
          "&:hover": {
            bgcolor: isActive ? "#253044" : "#eef0f4",
            boxShadow: isActive
              ? "0 8px 18px rgba(37, 48, 68, 0.14)"
              : "none",
          },
        }}
      >
        {filter.label}
      </Button>
    );
  };

  return (
    <Box
      aria-label="Filtros de pedidos disponíveis"
      sx={{
        display: "flex",
        gap: 1,
        mb: 3,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        pb: 0.5,
        maxWidth: "100%",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {renderFilterButton(mainFilter)}
      {visibleCategoryFilters.map((filter, index) => (
        <Box
          key={filter.id}
          sx={{
            ...filterPillIn,
            animation: "filterPillIn 180ms ease-out both",
            animationDelay: `${index * 45}ms`,
          }}
        >
          {renderFilterButton(filter)}
        </Box>
      ))}
    </Box>
  );
}

export default VolunteerOrderFilters;
