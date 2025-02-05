export const saveToLocalStorage = (user: PatientType) => {
  let users: object[] = [];

  try {
    const storedUsers = localStorage.getItem("users");
    users = storedUsers ? JSON.parse(storedUsers) : []; // Manejo seguro
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    users = []; // En caso de error, inicializa como array vacío
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};
