import axios from "axios";

export async function getFreeTrialStatus() {
    try {
        const response = await axios.post("/api/getFlags");
        return response.data; // Expects { isFreeTrialUsed, isPremium, success }
    } catch (error: any) {
        console.error("Error fetching free trial status:", error?.response?.data || error.message);
        return {
            isFreeTrialUsed: true, // used to block access in case of errors
            isPremium: false,
            success: false,
            error: error?.response?.data || error.message,
        };
    }
}
