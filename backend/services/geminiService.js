console.log("geminiService loaded");
const axios = require("axios");

async function generateMessage(prompt) {

    const response = await axios({
        method: "post",
        url: "https://openrouter.ai/api/v1/chat/completions",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        data: {
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        }
    });

    return response.data.choices[0].message.content;
}

module.exports = {
    generateMessage
};