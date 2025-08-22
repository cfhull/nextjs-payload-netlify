import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CMSContentProps {
  title: string
  content?: any
  publishedAt?: string
  backLink?: string
  backText?: string
}

export function CMSContent({ title, content, publishedAt, backLink = "/", backText = "← Back" }: CMSContentProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">{title}</h1>
              {publishedAt && (
                <p className="text-muted-foreground">Published on {new Date(publishedAt).toLocaleDateString()}</p>
              )}
            </div>
            <Link href={backLink}>
              <Button variant="outline">{backText}</Button>
            </Link>
          </div>

          <Card>
            <CardContent className="pt-6">
              {content ? (
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {/* Rich text content would be rendered here */}
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Content will appear here once the CMS is connected.</p>
                  <Link href="/admin" className="inline-block mt-4">
                    <Button>Go to Admin Panel</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
