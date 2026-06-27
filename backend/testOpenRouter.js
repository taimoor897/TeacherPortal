require("dotenv").config();
const axios = require("axios");

async function test() {
    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: "Say hello"
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(response.data);

    } catch (error) {

        console.log("ERROR:");
        console.log(error.response?.data || error.message);
    }
}

test();