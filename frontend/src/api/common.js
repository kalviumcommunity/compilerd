import axios from "axios";

const Common = {
    execute: async (data) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}execute`, data
            );
            return response.data;
        } catch (error) {
            return error.response && error.response.data;
        }
    },
}

export default Common;
