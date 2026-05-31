import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Configurado para usar Axios conforme decisões do projeto
import { clearSensitiveAuthData } from "../../services/authSession";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUserId = localStorage.getItem("idoso_id_manual"); // temporario
      const savedToken = localStorage.getItem("token"); // mas da pra receber o jwt quando eles consertarem

      if (savedUserId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/idosos/${savedUserId}`,
          );
          setUser({ ...response.data, role: "idoso" });
        } catch (error) {
          console.error("Erro ao validar sessão anterior:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loginMock = async (idManual, tipoUsuario) => {
    setLoading(true);
    try {
      // direto pelo id
      const endpoint =
        tipoUsuario === "idoso"
          ? `/idosos/${idManual}`
          : `/voluntarios/${idManual}`;
      const response = await axios.get(`http://localhost:8000${endpoint}`);

      localStorage.setItem("idoso_id_manual", idManual);
      setUser({ ...response.data, role: tipoUsuario });
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: "Usuário não encontrado" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSensitiveAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
