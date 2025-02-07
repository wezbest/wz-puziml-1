// Based on fu1.ts
// OpenRouterPanty Work here is done
// DokLick - https://openrouter.ai/docs/quickstart

import axios from "axios"
import ora from "ora"
import * as dotenv from "dotenv"
import * as fs from "fs"
import * as path from "path"
import ProgressBar from "progress"
import inquirer from "inquirer"
import { la2 } from "./ut1"
import { getUserInput } from "./inp"

dotenv.config()

const apiKey = process.env.OPR1
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"

async function fetchChatCompletion(model: string, query: string) {
  const apiKey = "<OPENROUTER_API_KEY>" // Replace with your OpenRouter API key
  const siteUrl = "<YOUR_SITE_URL>" // Optional: Replace with your site URL
  const siteName = "<YOUR_SITE_NAME>" // Optional: Replace with your site name

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl, // Optional
          "X-Title": siteName, // Optional
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model, // Use the model parameter
          messages: [
            {
              role: "user",
              content: query, // Use the query parameter
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data // Return the response data
  } catch (error) {
    console.error("Error fetching chat completion:", error)
    throw error // Re-throw the error for handling elsewhere
  }
}
