export const MOCK_ELDERLY_HISTORY = [
  {
    id: 1,
    title: "Compras de supermercado",
    date: "Há 2h",
    description:
      "Preciso de ajuda para comprar os itens da semana no supermercado central. A lista já está pronta na portaria.Preciso de ajuda para comprar os itens da semana no supermercado central. A lista já está pronta na portaria.Preciso de ajuda para comprar os itens da semana no supermercado central. A lista já está pronta na portaria.Preciso de ajuda para comprar os itens da semana no supermercado central. A lista já está pronta na portaria.",
    status: "in_progress",
    statusLabel: "Em Progresso",
    volunteerName: "Ana Santos",
    category: "shopping",
  },
  {
    id: 2,
    title: "Consertar torneira",
    date: "Há 1 dia",
    description:
      "A torneira da cozinha está pingando muito. Preciso de alguém com ferramentas básicas para trocar a borrachinha.",
    status: "open",
    statusLabel: "Aberto",
    volunteerName: null,
    category: "repairs",
  },
  {
    id: 3,
    title: "Acompanhamento médico",
    date: "12/06/2026",
    description:
      "Preciso de companhia para ir a uma consulta de rotina na clínica da praça.",
    status: "completed",
    statusLabel: "Concluído",
    volunteerName: "Maria Oliveira",
    category: "company",
  },
  {
    id: 4,
    title: "Leitura de livro",
    date: "10/06/2026",
    description:
      "Gostaria de alguém para ler os capítulos finais do livro que comecei na semana passada.",
    status: "completed",
    statusLabel: "Concluído",
    volunteerName: "João Silva",
    category: "other",
  },
];

export const getElderlyHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_ELDERLY_HISTORY]);
    }, 800);
  });
};

export const filterElderlyHistory = (items, activeFilter) => {
  if (activeFilter === "all") {
    return items;
  }
  return items.filter((item) => item.status === activeFilter);
};
