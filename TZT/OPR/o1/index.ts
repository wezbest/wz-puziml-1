// Main enry point
import { la1, la2 } from "./src/ut1"
import {
  comSamb1,
  comSamb2writeToResults,
  comSamb2writeToResultsStreaming,
  comSamb3,
} from "./src/fu1"
import { printBanner } from "./src/ban"
import { printInput } from "./src/inp"

async function main() {
  printBanner()
  await printInput()
}

// Execute Function
main()
