import axiosInstance from "./axiosConfig";

export const SearchService = {
   
    searchAllEntities: (params) => {
        return axiosInstance.get('/search/entities', {
            params: params,
        });
    },

   
};