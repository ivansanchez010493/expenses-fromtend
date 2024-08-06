import axios from 'axios';
import { Member } from '../models/Member';

const API_URL = 'http://api:8080/member';

export const getMembers = async (): Promise<Member[]> => {
    try {
        const response = await axios.get<Member[]>(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching members: ${error}`);
    }
};

export const postMember = async (member: Member): Promise<Member> => {
    try {
      const response = await axios.post<Member>(API_URL, member);
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data: ${error}`);
    }
};

export const deleteMember = async(memberId: number): Promise<void> => {
    try{
        const response = await axios.delete<Member>(`${API_URL}/${memberId}`);
        console.log(`Member deleted: ${response}`)
    } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
      }
}
