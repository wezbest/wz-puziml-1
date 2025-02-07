// Main enry point
import { la1 } from "./src/ut1"
import {
  comSamb1,
  comSamb2writeToResults,
  comSamb2writeToResultsStreaming,
  comSamb3,
} from "./src/fu1"
import { geInput } from "./src/or1"

async function main() {
  gettingInput()
}

function gettingInput() {
  la1("Get input from user")
  geInput()
}

// Execute Function
main()
