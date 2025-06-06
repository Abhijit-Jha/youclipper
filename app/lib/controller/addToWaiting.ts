import axios from "axios";

export async function addToWaitlist(email: string) {
    try {
        const response = await axios.post(
            "/api/waitlist",
            { email },                   // request body
            { headers: { "Content-Type": "application/json" } }  // config
        );

        // axios throws on non-2xx status, so if we get here, it’s success
        return { success: true, message: "Added to Waitlist!" };
    } catch {
        // silently ignore errors, no logs or UI error messages
        return { success: true, message: "Thank you!" };
    }
}
