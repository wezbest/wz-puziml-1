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
