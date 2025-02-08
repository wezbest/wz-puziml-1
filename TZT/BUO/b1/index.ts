// Follow tutoza

import { serve, postgres } from "bun"
import bun from "./bun.html"

serve({
  static: {
    "/bun": bun,
  },
  async fetch(request) {
    const { url } = request
    const { pathname } = new URL(url)

    if (pathname === "/api/posts") {
      const posts = postgres`select * from posts`
      return new Response(JSON.stringify(posts), {
        headers: {
          "content-type": "application/json",
        },
      })
    }
    return new Response("Lick Pusy")
  },
})
