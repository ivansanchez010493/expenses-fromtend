import axios from 'axios';
import { Card } from '../models/Card';

const API_URL = 'http://localhost:8080/card';

export const getCards = async (): Promise<Card[]> => {
    try {
        const response = await axios.get<Card[]>(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error}`);
    }
};

export const postCard = async (card: Card): Promise<Card> => {
    try {
      const response = await axios.post<Card>(API_URL, card);
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data: ${error}`);
    }
};

export const deleteCard = async(cardId: number): Promise<void> => {
    try{
        const response = await axios.delete<Card>(`${API_URL}/${cardId}`);
        console.log(`Card deleted: ${response}`)
    } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
      }
}
