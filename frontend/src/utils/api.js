import axios from 'axios';

const API_URL = 'https://localhost:8000/api/';
const token = localStorage.getItem('token');

export const createExpense = async (expenseData) => {
  return axios.post(`${API_URL}expenses/`, expenseData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const handleSubmit = async () => {
    await createExpense({
        description: "Taco Bell",
        amount: 9.98,
        category: "FOOD",
        date: "2025-06-05",
    });
};

const login = async(username, password) => {
    const response = await axios.post(`${API_URL}users/login/`, {
        username,
        password,
    });
    localStorage.setItem('token',response.data.token);
}