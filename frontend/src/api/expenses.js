const BASE_API = 'http://localhost:8000/api/expenses/';
const token = localStorage.getItem('token');

export async function createExpense(expense) {
    return axios.post(BASE_API, expense, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
}

export async function getExpenses() {
    return axios.get(BASE_API, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
}