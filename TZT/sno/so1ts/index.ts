// Main enry point
import { labeller } from "./src/ut1"
import { comSamb1, comSamb2writeToResults } from "./src/fu1"

async function main() {
  labeller("CAll API and Write to Results.txt")
  comSamb2writeToResults()
}

// Execute Function
main()
