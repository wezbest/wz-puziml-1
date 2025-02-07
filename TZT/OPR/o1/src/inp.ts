// Complex function for accepting inputs

import inquirer from "inquirer"

export async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "Query",
      message: "Enter Your Query:",
    },
    {
      type: "input",
      name: "Model",
      message: "Which Model You want?",
    },
  ])

  return answers
}
