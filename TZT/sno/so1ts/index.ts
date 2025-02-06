// Main enry point
import { la1 } from "./src/ut1"
import { comSamb1, comSamb2writeToResults, comSamb3 } from "./src/fu1"

async function main() {
  la1("Call API and write to file")
  await comSamb2writeToResults()
}

// Execute Function
main()
