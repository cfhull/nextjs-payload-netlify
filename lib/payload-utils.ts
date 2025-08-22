import { getPayloadClient } from "./payload-client"

export async function getPages() {
  try {
    const payload = await getPayloadClient()
    const pages = await payload.find({
      collection: "pages",
      where: {
        publishedAt: {
          exists: true,
        },
      },
      sort: "-publishedAt",
    })
    return pages.docs
  } catch (error) {
    console.error("Error fetching pages:", error)
    return []
  }
}

export async function getPosts() {
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: "posts",
      where: {
        publishedAt: {
          exists: true,
        },
      },
      sort: "-publishedAt",
    })
    return posts.docs
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    const pages = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: slug,
        },
        publishedAt: {
          exists: true,
        },
      },
      limit: 1,
    })
    return pages.docs[0] || null
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
        publishedAt: {
          exists: true,
        },
      },
      limit: 1,
    })
    return posts.docs[0] || null
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}
