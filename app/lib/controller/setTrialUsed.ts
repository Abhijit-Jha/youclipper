import axios from "axios";

export async function freeTrialUsed() {
    try {
        const response = await axios.post("/api/update/freeTrailUsed");
        console.log("Free trial update response:", response.data);

        if (response.data.success) {
            console.log("Free trial status successfully updated.");
        } else {
            console.warn("Free trial update returned success: false", response.data);
        }

        return response.data; // returns { message: "Free Trial Used", success: true }
    } catch (error: any) {
        console.error(
            "Error updating free trial status:",
            error?.response?.data || error.message
        );
        return {
            message: "Failed to update free trial status",
            success: false,
            error: error?.response?.data || error.message,
        };
    }
}
