import axios from "axios";

export const login = async (email, password) => {
  try {

    const response = await axios.post('http://localhost:8081/v01/auth/login', {email, password});
    const { token } = response.data;
    console.log("Token extraido", token);
    document.cookie = `token=${token}; path=/; SameSite=Lax`;

    return true;  

  } catch {

    console.log("Error al iniciar sesión")
    return false;
    
  }
}