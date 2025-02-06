// Labeller commands
import chalk from "chalk"
import boxen from "boxen"
import { modelSelect } from "./fu1"

export function labeller(text: string) {
  console.clear()

  const boxText1 = chalk.blueBright(text)
  const boxText2 = chalk.blueBright(modelSelect)

  console.log(
    boxen(boxText1, {
      padding: 0.5,
      borderColor: "green",
      borderStyle: "round",
    })
  )
}
