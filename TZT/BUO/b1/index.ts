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
      const posts = await postgres`select * from posts`
      return new Response(
        posts.map((post) => `<p>${post.title}</p>`).join(""),
        {
          headers: {
            "content-type": "text/html",
          },
        }
      )
    }
    return new Response("Lick Pusy")
  },
})
