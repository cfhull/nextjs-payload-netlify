import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPayloadClient } from "@/lib/payload-client"

export default async function PagesIndex() {
  let pages = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: "pages",
      limit: 10,
      sort: "-publishedAt",
    })
    pages = result.docs
  } catch (error) {
    console.log("CMS not available yet - showing placeholder content")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Pages</h1>
            <p className="text-muted-foreground">Content managed through PayloadCMS</p>
          </div>
          <Link href="/">
            <Button variant="outline">← Back Home</Button>
          </Link>
        </div>

        {pages.length > 0 ? (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {pages.map((page: any) => (
              <Card key={page.id}>
                <CardHeader>
                  <CardTitle>{page.title}</CardTitle>
                  <CardDescription>
                    {page.publishedAt && new Date(page.publishedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/pages/${page.slug}`}>
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
                <CardTitle>No Pages Yet</CardTitle>
                <CardDescription>Create your first page in the admin panel</CardDescription>
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
