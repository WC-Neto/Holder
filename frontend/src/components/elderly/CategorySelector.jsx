import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const categories = [
  'Compras',
  'Consertos',
  'Companhia',
  'Reparos',
  'Outros'
];

const CategorySelector = ({ value, onChange }) => {
  return (
    <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
        Qual o tipo de ajuda você precisa?
      </FormLabel>
      <RadioGroup
        aria-label="categoria"
        name="categoria"
        value={value}
        onChange={onChange}
        row
        sx={{ gap: 2 }}
      >
        {categories.map((cat) => (
          <FormControlLabel
            key={cat}
            value={cat}
            control={<Radio color="primary" />}
            label={cat}
            sx={{
              border: 1,
              borderColor: value === cat ? 'primary.main' : 'grey.300',
              borderRadius: 2,
              pr: 2,
              m: 0,
              bgcolor: value === cat ? 'primary.50' : 'transparent',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CategorySelector;
