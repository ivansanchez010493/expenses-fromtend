import axios from 'axios';
import { Purchase } from '../models/Purchase';

const API_URL = 'http://api:8080/purchase';

export const getPurchases = async (): Promise<Purchase[]> => {
    try {
        const response = await axios.get<Purchase[]>(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching purchases: ${error}`);
    }
};

export const postPurchase = async (purchase: Purchase): Promise<Purchase> => {
    try {
      const response = await axios.post<Purchase>(API_URL, purchase);
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data: ${error}`);
    }
};

export const deletePurchase = async(purchaseId: number): Promise<void> => {
    try{
        const response = await axios.delete<Purchase>(`${API_URL}/${purchaseId}`);
        console.log(`Purchase deleted: ${response}`)
    } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
      }
}
