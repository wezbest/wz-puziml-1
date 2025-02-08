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

export async function oprModelChat() {
  // --- SECTION 1: Validate API Key ---
  const apiKey = process.env.OPR1
  if (!apiKey) {
    throw new Error("OpenRouter API key not found in environment variables")
  }

  try {
    // --- SECTION 2: Get User Input ---
    const resolvedUserInput = await getUserInput()
    console.log(resolvedUserInput)

    // --- SECTION 3: Start Spinner for Loading Indicator ---
    const spinner = ora("Fetching chat completion...").start()

    // --- SECTION 4: Make API Request to OpenRouter ---
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

    // --- SECTION 5: Handle API Response ---
    const responseText = await response.text()

    // Check if the response is not OK (e.g., HTTP error)
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}\nResponse: ${responseText}`
      )
    }

    try {
      // --- SECTION 6: Parse JSON Response ---
      const data = JSON.parse(responseText)
      spinner.succeed("Chat completion fetched successfully!")

      // --- SECTION 7: Extract Generated Content ---
      const content = data.choices[0].message.content

      // --- SECTION 8: Create Results Directory ---
      const resultsDir = path.join(process.cwd(), "results")
      if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true })
      }

      // --- SECTION 9: Generate Filename with Timestamp ---
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const filename = `results_${timestamp}.txt`
      const filePath = path.join(resultsDir, filename)

      // --- SECTION 10: Save Content to File ---
      fs.writeFileSync(filePath, content)

      // --- SECTION 11: Print Raw Response and Generated Content ---
      console.log(chalk.yellow("Raw Response"))
      console.log(data)
      console.log(chalk.green("Generated Content:"))
      console.log(content)

      // --- SECTION 12: Print File Path ---
      console.log(`\nContent saved to: ${filePath}`)
    } catch (parseError) {
      // --- SECTION 13: Handle JSON Parsing Errors ---
      throw new Error(
        `JSON parse error: ${parseError}\nResponse: ${responseText}`
      )
    }
  } catch (error) {
    // --- SECTION 14: Handle General Errors ---
    console.error("An error occurred:", error)
  }
}

// --- Funtion will read the query from query.txt
export async function oprModelQueryFile() {
  // --- SECTION 1: Validate API Key ---
  const apiKey = process.env.OPR1
  if (!apiKey) {
    throw new Error("OpenRouter API key not found in environment variables")
  }

  try {
    // --- SECTION 2: Read Query from query.txt ---
    const queryFilePath = path.join(process.cwd(), "query.txt")
    if (!fs.existsSync(queryFilePath)) {
      throw new Error("query.txt file not found in the current directory.")
    }
    const query = fs.readFileSync(queryFilePath, "utf-8").trim()
    if (!query) {
      throw new Error("query.txt file is empty.")
    }

    // --- SECTION 3: Get Model from User Input ---
    const model = (await getUserInput()).Model
    console.log(chalk.blue(`Using model: ${model}`))

    // --- SECTION 4: Start Spinner for Loading Indicator ---
    const spinner = ora("Fetching chat completion...").start()

    // --- SECTION 5: Make API Request to OpenRouter ---
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

    // --- SECTION 6: Handle API Response ---
    const responseText = await response.text()

    // Check if the response is not OK (e.g., HTTP error)
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}\nResponse: ${responseText}`
      )
    }

    try {
      // --- SECTION 7: Parse JSON Response ---
      const data = JSON.parse(responseText)
      spinner.succeed("Chat completion fetched successfully!")

      // --- SECTION 8: Extract Generated Content ---
      const content = data.choices[0].message.content

      // --- SECTION 9: Create Results Directory ---
      const resultsDir = path.join(process.cwd(), "results")
      if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true })
      }

      // --- SECTION 10: Generate Filename with Timestamp ---
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const filename = `results_${timestamp}.txt`
      const filePath = path.join(resultsDir, filename)

      // --- SECTION 11: Save Content to File ---
      fs.writeFileSync(filePath, content)

      // --- SECTION 12: Print Raw Response and Generated Content ---
      console.log(chalk.yellow("Raw Response"))
      console.log(data)
      console.log(chalk.green("Generated Content:"))
      console.log(content)

      // --- SECTION 13: Print File Path ---
      console.log(`\nContent saved to: ${filePath}`)
    } catch (parseError) {
      // --- SECTION 14: Handle JSON Parsing Errors ---
      throw new Error(
        `JSON parse error: ${parseError}\nResponse: ${responseText}`
      )
    }
  } catch (error) {
    // --- SECTION 15: Handle General Errors ---
    console.error("An error occurred:", error)
  }
}
