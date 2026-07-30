import api from "./api";

export const askAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data.response;
};