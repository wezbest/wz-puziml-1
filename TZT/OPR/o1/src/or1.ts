// Based on fu1.ts
// OpenRouterPanty Work here is done
// DokLick - https://openrouter.ai/docs/quickstart

import axios from "axios"
import ora from "ora"
import * as dotenv from "dotenv"
import * as fs from "fs"
import * as path from "path"
import { la2 } from "./ut1"
import { getUserInput } from "./inp"

dotenv.config()

const apiKeyz = process.env.OPR1
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"

export async function fetchChatCompletion(model: string, query: string) {
  const apiKey = process.env.OPR1
  if (!apiKey) {
    throw new Error("OpenRouter API key not found in environment variables")
  }

  const spinner = ora("Fetching chat completion...").start()

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000", // Update this
        "X-Title": "My AI App", // Update this
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [{
          role: "user",
          content: query,
        }],
      }),
    })

    const responseText = await response.text()
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}\nResponse: ${responseText}`)
    }

    try {
      const data = JSON.parse(responseText)
      spinner.succeed("Chat completion fetched successfully!")
      return data
    } catch (parseError) {
      throw new Error(`JSON parse error: ${parseError}\nResponse: ${responseText}`)
    }
  } catch (error) {
    spinner.fail("Failed to fetch chat completion.")
    console.error("Error details:", error)
    throw error
  }
}
Key changes made:

export async function printOutput() {
  try {
    const resolvedUserInput = await getUserInput() // Wait for the Promise to resolve
    console.log(resolvedUserInput)

    // Call the fetchChatCompletion function
    const response = await fetchChatCompletion(
      resolvedUserInput.Model,
      resolvedUserInput.Query
    )
    console.log("Chat Completion Response:", response)
  } catch (error) {
    console.error("An error occurred:", error)
  }
}
