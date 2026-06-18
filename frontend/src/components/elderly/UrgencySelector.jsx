import React from "react";
import { Typography, Box, Card, CardActionArea, Radio, FormControl, FormLabel, RadioGroup } from "@mui/material";

const urgencies = [
  {
    value: "baixa",
    label: "Baixa (pode esperar alguns dias)",
    colors: { bg: "#dcfbef", main: "#00a76f" },
  },
  {
    value: "media",
    label: "Média (preciso em breve)",
    colors: { bg: "#fff4de", main: "#c98218" },
  },
  {
    value: "alta",
    label: "Alta (urgente, para hoje ou amanhã)",
    colors: { bg: "#fde4e6", main: "#ef3f4d" },
  },
];

const UrgencyOption = ({ label, value, selected, onClick, colors }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 3,
        borderColor: selected ? colors.main : "#e7e7ea",
        bgcolor: selected ? colors.bg : "transparent",
        transition: "all 0.2s ease-in-out",
        boxShadow: "none",
        "&:hover": {
          borderColor: selected ? colors.main : "#9ba3b3",
        },
      }}
    >
      <CardActionArea
        onClick={() => onClick(value)}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Radio
          checked={selected}
          onChange={() => onClick(value)}
          value={value}
          name="urgency-radio"
          slotProps={{ input: { 'aria-label': label } }}
          sx={{
            p: 0,
            mr: 2,
            color: selected ? colors.main : "#9ba3b3",
            "&.Mui-checked": {
              color: colors.main,
            },
          }}
        />
        <Typography
          variant="body1"
          fontWeight={selected ? 600 : 500}
          sx={{ color: selected ? "#253044" : "text.secondary" }}
        >
          {label}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

const UrgencySelector = ({ value, onSelect }) => {
  return (
    <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
      <FormLabel 
        component="legend" 
        sx={{ mb: 2, fontWeight: "bold", color: "#253044" }}
      >
        Qual a urgência?
      </FormLabel>
      <RadioGroup
        name="urgencia"
        value={value}
        onChange={(e) => onSelect && onSelect(e.target.value)}
      >
        {urgencies.map((urg) => (
          <UrgencyOption
            key={urg.value}
            value={urg.value}
            label={urg.label}
            selected={value === urg.value}
            onClick={(val) => onSelect && onSelect(val)}
            colors={urg.colors}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default UrgencySelector;
