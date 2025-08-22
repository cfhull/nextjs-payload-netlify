import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPayloadClient } from "@/lib/payload-client"

export default async function BlogIndex() {
  let posts = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: "posts",
      limit: 10,
      sort: "-publishedAt",
    })
    posts = result.docs
  } catch (error) {
    console.log("CMS not available yet - showing placeholder content")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Blog</h1>
            <p className="text-muted-foreground">Latest posts from PayloadCMS</p>
          </div>
          <Link href="/">
            <Button variant="outline">← Back Home</Button>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {posts.map((post: any) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {post.excerpt && <p className="text-muted-foreground mb-4">{post.excerpt}</p>}
                  <Link href={`/blog/${post.slug}`}>
                    <Button>Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>No Posts Yet</CardTitle>
                <CardDescription>Create your first blog post in the admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin">
                  <Button>Go to Admin</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
