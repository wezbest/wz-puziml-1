// Labeller commands
import chalk from "chalk"
import boxen from "boxen"

export function la1(text: string) {
  console.clear()

  const boxText1 = chalk.blueBright(text)

  console.log(
    boxen(boxText1, {
      padding: 0.5,
      borderColor: "green",
      borderStyle: "round",
    })
  )
}

export function la2(text: string) {
  // console.clear()

  const boxText1 = chalk.magentaBright(text)

  console.log(
    boxen(boxText1, {
      padding: 0.5,
      borderColor: "green",
      borderStyle: "arrow",
    })
  )
}
