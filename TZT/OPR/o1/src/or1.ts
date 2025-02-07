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
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000", // Update this
          "X-Title": "My AI App", // Update this
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: query,
            },
          ],
        }),
      }
    )

    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}\nResponse: ${responseText}`
      )
    }

    try {
      const data = JSON.parse(responseText)
      spinner.succeed("Chat completion fetched successfully!")
      return data
    } catch (parseError) {
      throw new Error(
        `JSON parse error: ${parseError}\nResponse: ${responseText}`
      )
    }
  } catch (error) {
    spinner.fail("Failed to fetch chat completion.")
    console.error("Error details:", error)
    throw error
  }
}

export async function printOutput() {
  try {
    const resolvedUserInput = await getUserInput()
    console.log(resolvedUserInput)

    const response = await fetchChatCompletion(
      resolvedUserInput.Model,
      resolvedUserInput.Query
    )

    // Extract the content
    const content = response.choices[0].message.content

    // Create results directory if it doesn't exist
    const resultsDir = path.join(process.cwd(), "results")
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true })
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `results_${timestamp}.txt`
    const filePath = path.join(resultsDir, filename)

    // Write to file and console
    fs.writeFileSync(filePath, content)
    console.log("\nGenerated Content:")
    console.log(content)
    console.log(`\nContent saved to: ${filePath}`)
  } catch (error) {
    console.error("An error occurred:", error)
  }
}
