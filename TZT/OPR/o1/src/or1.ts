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

dotenv.config()

const apiKey = process.env.OPR1
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"

// Selecting the model here for the functions
const modelSelect = [
  "DeepSeek-R1-Distill-Llama-70B",
  "Meta-Llama-3.1-405B-Instruct",
  "Qwen2.5-72B-Instruct",
]
// Selecting the model here for all the functions
const selectedModel = modelSelect[2]

// Getting the user input

// Printing it out the top
export async function printInput() {
  const answers = await getUserInput()
  la2(`
answers.Query: ${answers.Query}
answers.Model: ${answers.Model}
    `)
}
