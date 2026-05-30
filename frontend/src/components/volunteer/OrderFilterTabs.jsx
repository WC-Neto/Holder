import React from "react";
import { Box, Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { orderFilters } from "../../data/mockOrders";

const filterIcons = {
  all: TuneIcon,
  urgent: PriorityHighIcon,
  shopping: LocalGroceryStoreOutlinedIcon,
  repairs: HomeRepairServiceOutlinedIcon,
  company: PeopleAltOutlinedIcon,
};

function OrderFilterTabs({ activeFilter, onFilterChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mb: 3,
        overflowX: "auto",
        pb: 0.5,
      }}
    >
      {orderFilters.map((filter) => {
        const Icon = filterIcons[filter.id];
        const isActive = activeFilter === filter.id;

        return (
          <Button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange?.(filter.id)}
            startIcon={Icon ? <Icon sx={{ fontSize: 17 }} /> : null}
            sx={{
              minHeight: 42,
              px: 2,
              borderRadius: 999,
              whiteSpace: "nowrap",
              bgcolor: isActive ? "#253044" : "#f5f6f8",
              color: isActive ? "#fff" : "#3d4758",
              fontSize: 14,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: isActive ? "#253044" : "#eef0f4",
                boxShadow: "none",
              },
            }}
          >
            {filter.label}
          </Button>
        );
      })}
    </Box>
  );
}

export default OrderFilterTabs;
