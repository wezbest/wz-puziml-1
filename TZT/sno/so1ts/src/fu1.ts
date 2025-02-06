import axios from "axios"
import ora from "ora"
import * as dotenv from "dotenv"

dotenv.config()

const apiKey = process.env.SAMB1
const apiUrl = "https://api.sambanova.ai/v1/chat/completions"

interface Message {
  role: "system" | "user"
  content: string
}

interface ApiResponse {
  choices: { message: Message }[]
}

export async function comSamb1(): Promise<void> {
  // Message that will be sent to the API
  const query1 = "Explain Nucler Fusion in rhyming slang"

  const spinner = ora("Communicating with LLM API").start()

  try {
    const response = await axios.post<ApiResponse>(
      apiUrl,
      {
        model: "DeepSeek-R1-Distill-Llama-70B",
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          { role: "user", content: query1 },
        ],
        temperature: 0.1,
        top_p: 0.1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    )

    spinner.succeed("API call succeeded")
    console.log(response.data.choices[0].message.content)
  } catch (error) {
    spinner.fail("API call failed")
    console.error("Error communicating with LLM API:", error)
  }
}
