// Printing Banner Function

import chalk from "chalk"
import boxen from "boxen"

const ban1 = `
╔═╗ ╔═╗ ╔═╗ ╔╗╔    ╦═╗ ╔═╗ ╦ ╦ ╔╦╗ ╔═╗ ╦═╗
║ ║ ╠═╝ ║╣  ║║║ ── ╠╦╝ ║ ║ ║ ║  ║  ║╣  ╠╦╝
╚═╝ ╩   ╚═╝ ╝╚╝    ╩╚═ ╚═╝ ╚═╝  ╩  ╚═╝ ╩╚═
`
const colorBan1 = chalk.magentaBright(ban1)

export function printBanner() {
  console.log(
    boxen(colorBan1, {
      padding: 0.5,
      borderColor: "green",
      borderStyle: "round",
      title: "ApiTesting",
      titleAlignment: "center",
    })
  )
}
