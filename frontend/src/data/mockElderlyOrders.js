export const createOrderMock = (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // delay pra ver o loading, por padrao retorna success
      resolve({
        success: true,
        data: {
          id: Math.floor(Math.random() * 10000),
          ...payload,
          status: "aberto",
          createdAt: new Date().toISOString(),
        },
      });
      // erros: descomenta abaixo e comenta bloco do resolve:
      reject(new Error("Erro ao criar o pedido de ajuda. Tente novamente."));
    }, 1500); // 1.5s
  });
};
