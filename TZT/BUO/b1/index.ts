// Follow tutoza

import { serve } from "bun"
import bun from "./bun.html"

serve({
  static: {
    "/bun": bun,
  },
  async fetch(reqest) {
    return new Response("Lick Pusy")
  },
})
