import axios from "axios"
import ora from "ora"
import * as dotenv from "dotenv"
import * as fs from "fs"
import * as path from "path"
import ProgressBar from "progress"

dotenv.config()

const apiKey = process.env.SAMB1
const apiUrl = "https://api.sambanova.ai/v1/chat/completions"

// Selecting the model here for the functions
export const modelSelect = [
  "DeepSeek-R1-Distill-Llama-70B",
  "Meta-Llama-3.1-405B-Instruct",
  "Meta-Llama-3.1-405B-Instruct",
]

interface Message {
  role: "system" | "user"
  content: string
}

interface ApiResponse {
  choices: { message: Message }[]
}

//********************************
// Function 1 -  Normal , fetch data and show in cli
// ***************************** */

export async function comSamb1(): Promise<void> {
  // Message that will be sent to the API
  const query1 = "Explain Nucler Fusion in rhyming slang"

  const spinner = ora("Communicating with LLM API").start()

  try {
    const response = await axios.post<ApiResponse>(
      apiUrl,
      {
        model: modelSelect[1],
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

//********************************
// Function 2 -  Fetch Api and write to file
// ***************************** */

export async function comSamb2writeToResults(): Promise<void> {
  const query1 = "Explain Nuclear Fusion in rhyming slang"
  const spinner = ora("Communicating with LLM API").start()

  try {
    const response = await axios.post<ApiResponse>(
      apiUrl,
      {
        model: modelSelect[1],
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
    const resultContent = response.data.choices[0].message.content
    console.log(resultContent)

    // Write to file
    const resultsDir = path.join(__dirname, "results")
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir)
    }

    const dateTime = new Date().toISOString().replace(/[:.]/g, "-")
    const fileName = `result_${dateTime}.txt`
    const filePath = path.join(resultsDir, fileName)

    fs.writeFileSync(filePath, resultContent)
    console.log(`Response written to ${filePath}`)
  } catch (error) {
    spinner.fail("API call failed")
    console.error("Error communicating with LLM API:", error)
  }
}

//********************************
// Function 3 -  Show progress bar and elapsed time // This is not good
// ***************************** */

export async function comSamb3(): Promise<void> {
  const query1 = "Explain Nuclear Fusion in rhyming slang"
  const spinner = ora("Communicating with LLM API").start()

  // Start time
  const startTime = Date.now()

  // Create a progress bar
  const progressBar = new ProgressBar(
    "Waiting for response [:bar] :percent :elapsed s",
    {
      total: 100,
      width: 40,
    }
  )

  try {
    const response = await axios.post<ApiResponse>(
      apiUrl,
      {
        model: modelSelect[1],
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

    // Simulate progress (since we don't have actual progress data from the API)
    const interval = setInterval(() => {
      progressBar.tick(10)
      if (progressBar.complete) {
        clearInterval(interval)
      }
    }, 100)

    spinner.succeed("API call succeeded")
    const resultContent = response.data.choices[0].message.content
    console.log(resultContent)

    // Calculate elapsed time
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`Time elapsed: ${elapsedTime} seconds`)

    // Write to file
    const resultsDir = path.join(__dirname, "results")
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir)
    }

    const dateTime = new Date().toISOString().replace(/[:.]/g, "-")
    const fileName = `result_${dateTime}.txt`
    const filePath = path.join(resultsDir, fileName)

    fs.writeFileSync(filePath, resultContent)
    console.log(`Response written to ${filePath}`)
  } catch (error) {
    spinner.fail("API call failed")
    console.error("Error communicating with LLM API:", error)
  }
}
