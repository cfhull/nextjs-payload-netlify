import { buildConfig } from "payload/config"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { slateEditor } from "@payloadcms/richtext-slate"
import path from "path"

export default buildConfig({
  admin: {
    user: "users",
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": path.resolve(__dirname),
        },
      },
    }),
  },
  editor: slateEditor({}),
  collections: [
    {
      slug: "users",
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    {
      slug: "pages",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "content",
          type: "richText",
        },
        {
          name: "publishedAt",
          type: "date",
          admin: {
            position: "sidebar",
          },
        },
      ],
    },
    {
      slug: "posts",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "excerpt",
          type: "textarea",
        },
        {
          name: "content",
          type: "richText",
        },
        {
          name: "publishedAt",
          type: "date",
          admin: {
            position: "sidebar",
          },
        },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.POSTGRES_URL,
    },
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
})
