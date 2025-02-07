// Printing Banner Function

import chalk from "chalk"
import boxen from "boxen"

const ban1 = `
╔═╗ ╔═╗ ╔═╗ ╔╗╔    ╦═╗ ╔═╗ ╦ ╦ ╔╦╗ ╔═╗ ╦═╗
║ ║ ╠═╝ ║╣  ║║║ ── ╠╦╝ ║ ║ ║ ║  ║  ║╣  ╠╦╝
╚═╝ ╩   ╚═╝ ╝╚╝    ╩╚═ ╚═╝ ╚═╝  ╩  ╚═╝ ╩╚═
`

export function printBanner() {
  console.log(
    boxen(ban1, {
      padding: 0.5,
      borderColor: "green",
      borderStyle: "round",
    })
  )
}
