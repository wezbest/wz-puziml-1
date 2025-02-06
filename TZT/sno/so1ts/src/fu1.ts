// Function 1 testing

import axios from "axios";

require('dotenv').config();

const apiKey = process.env.SAMB1;
const apiUrl = 'https://api.sambanova.ai/v1/chat/completions';

export async function comSamb1() {
    try {
        const response = await axios.post(apiUrl, {
            model: 'DeepSeek-R1-Distill-Llama-70B',
            messages: [
                { role: 'system', content: 'You are a helpful assistant' },
                { role: 'user', content: 'Hello' }
            ],
            temperature: 0.1,
            top_p: 0.1
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error communicating with LLM API:', error);
    }
}
