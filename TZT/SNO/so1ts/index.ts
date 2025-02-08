// Main enry point
import { la1 } from "./src/ut1"
import {
  comSamb1,
  comSamb2writeToResults,
  comSamb2writeToResultsStreaming,
  comSamb3,
} from "./src/fu1"

async function main() {
  la1("Call API and write to file")
  await comSamb2writeToResultsStreaming()
}

// Execute Function
main()
