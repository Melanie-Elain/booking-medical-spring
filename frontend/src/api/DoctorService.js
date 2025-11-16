import axiosInstance from './axiosConfig';


export const DoctorService = {
  
    
    getAllDoctorsList: async () => { 
       
        const response = await axiosInstance.get(`/doctors`);
        return response.data; 
    },
    
    

    getDoctorById: async (doctorId) => { 
        const response = await axiosInstance.get(`/doctors/${doctorId}`);
        console.log("Doctor By ID Response:", response.data);
        return response.data; 
    },
    
    

    getDoctorSchedules: async (doctorId) => { 
        const response = await axiosInstance.get(`/doctors/schedules/${doctorId}`);
        console.log("Lịch làm việc bác sĩ:", response.data);

        return response.data; 
    },

   
  
    
};