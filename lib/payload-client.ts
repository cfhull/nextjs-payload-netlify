import payload from "payload"
import type { Payload } from "payload"

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

interface Args {
  initOptions?: Parameters<typeof payload.init>[0]
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.DATABASE_URI) {
    throw new Error("DATABASE_URI environment variable is missing")
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET || "your-secret-here",
      local: true,
      ...(initOptions || {}),
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}
