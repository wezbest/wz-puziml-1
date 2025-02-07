// Complex function for accepting inputs

import inquirer from "inquirer"

interface UserInput {
  Query: string
  Model: number // Model is a number
}

const modelOptions = [
  "DeepSeek-R1-Distill-Llama-70B",
  "Meta-Llama-3.1-405B-Instruct",
  "Qwen2.5-72B-Instruct",
]

export async function getUserInput(): Promise<UserInput> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "Query",
      message: "Enter Your Query:",
    },
    {
      type: "list",
      name: "Model",
      message: "Which Model do you want?",
      choices: modelOptions,
    },
  ])

  return answers as UserInput // Cast the answers to the UserInput type
}

// Printing the user input
export function printInput() {
  const resolvedUserInput = getUserInput()
  console.log(resolvedUserInput)
}
