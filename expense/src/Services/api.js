import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/';

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
});

export const fetchAllExpenses = async (id) => {
    try {
        const response = await instance.get(`expenses/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
    }
};

export const addNewExpense = async (payload) => {
    try {
        const response = await instance.post('expenses/new', payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
    }
};

export const removeExpense = async (id) => {
    try {
        const response = await instance.delete(`expenses/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
    }
};

export const registerUser = async (payload) => {
    try {
        const response = await instance.post('/expense/register', payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

export const signinUser = async (payload) => {
    try {
        const response = await instance.post('/expense/signin', payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}