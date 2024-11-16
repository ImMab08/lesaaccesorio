import api from "@/api/api";

export const editar = async (url, body) => {
  try {
    const response = await api.put(url, body);
    return response.data;
  } catch(error) {
    console.log("Error al editar", error);
  };
}