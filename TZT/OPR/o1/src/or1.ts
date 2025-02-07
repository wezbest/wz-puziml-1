// Based on fu1.ts
// OpenRouterPanty Work here is done
// DokLick - https://openrouter.ai/docs/quickstart

import axios from "axios"
import ora from "ora"
import * as dotenv from "dotenv"
import * as fs from "fs"
import * as path from "path"
import ProgressBar from "progress"
import psp from "prompt-sync-plus"
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
const askPrompt = psp({ sigint: true })
const name = prompt("Enter your name: ")
console.log(`Hello, ${name}!`)
