import axios from "axios";

export const Register = async (nombre, apellido, celular, email, password) => {
  try {
    const response = await axios.post('http://localhost:8081/v01/auth/register', {
      nombre,
      apellido,
      celular,
      email,
      password
    });

    return true; // Registro exitoso
  } catch (error) {
    console.log("Error al registrar", error);
    return false; // Registro fallido
  }
};

