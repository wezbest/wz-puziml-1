// Complex function for accepting inputs

import inquirer from "inquirer"

interface UserInput {
  Query: string
  Model: number // Model is a number
}

// These models are from the OpenRouter API
const modelOptions = [
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "google/gemini-2.0-pro-exp-02-05:free",
  "deepseek/deepseek-r1-distill-llama-70b:free",
  "deepseek/deepseek-r1:free",
]

export async function getUserInput(): Promise<UserInput> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "Query",
      message: "Enter Your Query:",
      default: "Write Haiku about sweet odors of womans bodies",
    },
    {
      type: "list",
      name: "Model",
      message: "Which Model do you want?",
      choices: modelOptions,
      default: modelOptions[0],
    },
  ])

  return answers as UserInput // Cast the answers to the UserInput type
}

// Printing the user input
export async function examplePrintInput() {
  try {
    const resolvedUserInput = await getUserInput() // Wait for the Promise to resolve
    console.log(resolvedUserInput)
    console.log(`Selected Model is ${resolvedUserInput.Model}`)
  } catch (error) {
    console.error("An error occurred:", error)
  }
}
