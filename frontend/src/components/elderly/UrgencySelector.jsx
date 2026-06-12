import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const urgencies = [
  { value: "baixa", label: "Baixa (pode esperar alguns dias)" },
  { value: "media", label: "Média (preciso em breve)" },
  { value: "alta", label: "Alta (urgente, para hoje ou amanhã)" },
];

const UrgencySelector = ({ value, onChange }) => {
  return (
    <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
      <FormLabel
        component="legend"
        sx={{ mb: 1, fontWeight: "bold", color: "text.primary" }}
      >
        Qual a urgência?
      </FormLabel>
      <RadioGroup
        aria-label="prioridade"
        name="prioridade"
        value={value}
        onChange={onChange}
      >
        {urgencies.map((urg) => (
          <FormControlLabel
            key={urg.value}
            value={urg.value}
            control={<Radio color="primary" />}
            label={urg.label}
            sx={{
              border: 1,
              borderColor: value === urg.value ? "primary.main" : "grey.300",
              borderRadius: 2,
              p: 1,
              mb: 1,
              ml: 0,
              mr: 0,
              bgcolor: value === urg.value ? "primary.50" : "transparent",
              transition: "all 0.2s",
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default UrgencySelector;
