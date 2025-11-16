import axiosInstance from "./axiosConfig";

export const PaymentService = {
    createCheckoutUrl: async (paymentRequestDto) => {
        console.log("Requesting checkout URL with payload:", paymentRequestDto);
        
        const response = await axiosInstance.post(
            `/payment/create-checkout-url`, 
            paymentRequestDto
        );

        console.log("Check var Requesting checkout", response);
        
        return response.data;
    }
}