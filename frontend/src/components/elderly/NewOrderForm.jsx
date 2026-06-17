import { useState } from "react";
import { Box, TextField, Button, CircularProgress, Alert } from "@mui/material";
import CategorySelector from "./CategorySelector";
import UrgencySelector from "./UrgencySelector";
import InfoMessage from "./InfoMessage";
import { createOrder } from "../../services/elderlyOrders";

const NewOrderForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    prioridade: "media",
    localizacao: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const getMissingFields = () => {
    const missing = [];
    if (formData.titulo.trim() === "") missing.push("Título");
    if (formData.categoria === "") missing.push("Categoria");
    if (formData.descricao.trim() === "") missing.push("Descrição");
    if (formData.prioridade === "") missing.push("Urgência");
    return missing;
  };

  const isFormValid = () => {
    return getMissingFields().length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // lidar com esse idoso_id_manual
      const payload = {
        ...formData,
        idoso_id_manual: 1,
      };

      await createOrder(payload);

      setSuccess(true);
      setFormData({
        titulo: "",
        descricao: "",
        categoria: "",
        prioridade: "media",
        localizacao: "",
      });
    } catch (err) {
      setError(
        err.message || "Ocorreu um erro ao criar o pedido. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        Pedido publicado com sucesso! Os voluntários próximos já podem
        visualizá-lo.
        <Button
          color="inherit"
          size="small"
          onClick={() => setSuccess(false)}
          sx={{ ml: 2, textDecoration: "underline" }}
        >
          Criar outro pedido
        </Button>
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>

      <TextField
        fullWidth
        required
        label="Título do Pedido"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        placeholder="Ex: Preciso de ajuda com compras no mercado"
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <CategorySelector
        value={formData.categoria}
        onSelect={(valor) => setFormData((prev) => ({ ...prev, categoria: valor }))}
      />

      <TextField
        fullWidth
        required
        multiline
        rows={4}
        label="Descrição Detalhada"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        placeholder="Descreva com detalhes o que você precisa. Ex: Preciso que alguém vá ao supermercado X e compre..."
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <UrgencySelector
        value={formData.prioridade}
        onSelect={(valor) => setFormData((prev) => ({ ...prev, prioridade: valor }))}
      />

      <TextField
        fullWidth
        label="Localização (opcional)"
        name="localizacao"
        value={formData.localizacao}
        onChange={handleChange}
        placeholder="Ex: Rua, número, bairro ou uma referência"
        variant="outlined"
        sx={{ mb: 3 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        {getMissingFields().length > 0 ? (
          <InfoMessage 
            message={`Os seguintes campos obrigatórios ainda não foram preenchidos: ${getMissingFields().join(", ")}`} 
          />
        ) : (
          <InfoMessage 
            message="Ao publicar, voluntários próximos serão notificados e poderão se oferecer para ajudar." 
          />
        )}
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isFormValid() || loading}
        sx={{
          py: 1.5,
          fontSize: "1.1rem",
          fontWeight: "bold",
          borderRadius: 2,
          boxShadow: "none",
          ...(!isFormValid() || loading
            ? {}
            : {
              color: "#fff",
              bgcolor: "#e6a0a8",
              background: "linear-gradient(90deg, #df9aa4 0%, #f0b19b 100%)",
              "&:hover": {
                bgcolor: "#df9aa4",
                boxShadow: "none",
              },
            }),
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Publicar Pedido"
        )}
      </Button>
    </Box>
  );
};

export default NewOrderForm;
