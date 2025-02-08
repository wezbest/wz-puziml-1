// Follow tutoza

import { serve, postgres, s3 } from "bun"
import bun from "./bun.html"
import upload from "./upload.html"

serve({
  static: {
    "/bun": bun,
    "/upload": upload,
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

    if (pathname === "/api/upload") {
      const formData = await request.formData()
      const image = formData.get("file") // Use 'file' to match the name attribute in the HTML form
      const title = formData.get("title")

      console.log("Form Data:", formData)
      console.log("Image:", image)
      console.log("Title:", title)

      if (image) {
        const file = s3.file(image.name)
        await file.write(image)

        const newImage =
          await postgres`insert into images (title, path) values (${title}, ${image.name}) returning *`
        return new Response(JSON.stringify(newImage))
      }

      return new Response("No image provided smelling panty")
    }

    return new Response("Lick Pusy")
  },
})
