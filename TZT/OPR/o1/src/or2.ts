// This is version 2 of or1.ts , for testing other functions

import axios from "axios"
import ora from "ora"
import * as dotenv from "dotenv"
import * as fs from "fs"
import * as path from "path"
import { la2 } from "./ut1"
import { getUserInput } from "./inp"
import chalk from "chalk"

dotenv.config()

const apiKeyz = process.env.OPR1
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"

export async function fetchAndPrintChatCompletion() {
  const apiKey = process.env.OPR1
  if (!apiKey) {
    throw new Error("OpenRouter API key not found in environment variables")
  }

  try {
    const resolvedUserInput = await getUserInput()
    console.log(resolvedUserInput)

    const spinner = ora("Fetching chat completion...").start()

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
          model: resolvedUserInput.Model,
          messages: [
            {
              role: "user",
              content: resolvedUserInput.Query,
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

      // Extract the content
      const content = data.choices[0].message.content

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

      // Printing Response to console
      console.log(chalk.yellow("Raw Response"))
      console.log(data)
      console.log(chalk.green("Generated Content:"))
      console.log(content)

      // Printing the actual path of the file
      console.log(`\nContent saved to: ${filePath}`)
    } catch (parseError) {
      throw new Error(
        `JSON parse error: ${parseError}\nResponse: ${responseText}`
      )
    }
  } catch (error) {
    console.error("An error occurred:", error)
  }
}
