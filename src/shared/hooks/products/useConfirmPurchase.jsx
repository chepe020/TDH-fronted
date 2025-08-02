import { confirmPurchase as confirmPurchaseRequest } from "../../../services";

export const useConfirmPurchase = () => {
    const confirmPurchase = async() => {
        const response = await confirmPurchaseRequest()

        if(response.error) {
            const errRes = response.error?.response;
            if (errRes?.data?.errors && Array.isArray(errRes.data.errors)) {
                console.log('error')
            } else {
                console.log('error')
            }
            return;
        }
    }

    return{ 
        confirmPurchase
    }
}
