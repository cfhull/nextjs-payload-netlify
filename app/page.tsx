import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Next.js + PayloadCMS Boilerplate</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern static site with headless CMS capabilities, ready for Netlify deployment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Static Generation</CardTitle>
              <CardDescription>Pre-built pages for optimal performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Next.js static export generates all pages at build time for lightning-fast loading.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PayloadCMS</CardTitle>
              <CardDescription>Headless CMS for content management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Powerful admin interface with TypeScript support and flexible content modeling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Netlify Ready</CardTitle>
              <CardDescription>Serverless deployment configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimized for Netlify Functions with automatic deployments and edge distribution.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pages">
              <Button size="lg">View Pages</Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline">
                View Blog
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="secondary">
                Admin Panel
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">Explore the CMS-powered pages and admin interface</p>
        </div>
      </div>
    </main>
  )
}
