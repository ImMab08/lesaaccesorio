import api from "@/api/api";

export const crear = async (url, body) => {
  try {
    const response = await api.post(url, body);
    return response.data;
  } catch (error) {
    console.log("Error al crear", error);
  }
};