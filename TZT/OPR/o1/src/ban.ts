// Printing Banner Function

import chalk from "chalk"
import boxen from "boxen"

const combinedBanner = `
╔═╗ ╔═╗ ╔═╗ ╔╗╔    ╦═╗ ╔═╗ ╦ ╦ ╔╦╗ ╔═╗ ╦═╗
║ ║ ╠═╝ ║╣  ║║║ ── ╠╦╝ ║ ║ ║ ║  ║  ║╣  ╠╦╝
╚═╝ ╩   ╚═╝ ╝╚╝    ╩╚═ ╚═╝ ╚═╝  ╩  ╚═╝ ╩╚═
· · ────── ꒰ঌ·✦·໒꒱ ────── · ·· · ────── ꒰ঌ·✦·໒꒱ ────── · ·
Avaialble Models:
1 - "google/gemini-2.0-pro-exp-02-05:free" - Good For Coding
2 - "google/gemini-2.0-flash-lite-preview-02-05:free" - Good For Coding
3 - "google/gemini-2.0-flash-thinking-exp:free" - Good For Research
4 - "deepseek/deepseek-r1-distill-llama-70b:free" - Good for Coding . Research
5 - "deepseek/deepseek-r1:free" - Best Overall but slow,
6 - "sophosympatheia/rogue-rose-103b-v0.2:free" - Roleplay Stories,
7 - "mistralai/mistral-7b-instruct:free" - Mistral Small Model
`

const colorCombinedBanner = chalk.magentaBright(combinedBanner)

export function printBanner() {
  console.log(
    boxen(colorCombinedBanner, {
      padding: 0.5,
      borderColor: "green",
      borderStyle: "round",
      title: "ApiTesting",
      titleAlignment: "center",
    })
  )
}
