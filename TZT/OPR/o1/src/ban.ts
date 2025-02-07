// Printing Banner Function

import chalk from "chalk"

const ban1 = `
███████╗  █████╗  ██████╗  ████████╗
██╔════╝ ██╔══██╗ ██╔══██╗ ╚══██╔══╝
█████╗   ███████║ ██████╔╝    ██║   
██╔══╝   ██╔══██║ ██╔══██╗    ██║   
██║      ██║  ██║ ██║  ██║    ██║   
╚═╝      ╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝   
`

export function printBanner() {
  console.log(chalk.green(ban1))
}
