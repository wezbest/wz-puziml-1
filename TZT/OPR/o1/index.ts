// Main enry point

import { printBanner } from "./src/ban"
import { printOutput } from "./src/or1"
import { oprModelChat, oprModelQueryFile } from "./src/or2"

async function main() {
  console.clear()
  printBanner()
  oprModelQueryFile()
}

// Execute Function
main()
