import axiosInstance from "./axiosConfig";

export const UserService = {
    getUserCurrent: async () => {
        const response = await axiosInstance.get(`/user/me`);
        console.log("My Profile Response:", response.data);
        return response.data;
    },

    
};