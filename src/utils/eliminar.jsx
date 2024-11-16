import api from "@/api/api";

export const eliminar = async (url) => {
  try {
  const response = await api.delete(url);
  return response.data
  } catch(error) {
    console.log("Error al eliminar", error)
  }
}