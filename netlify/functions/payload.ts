import type { Handler } from "@netlify/functions"
import { getPayloadClient } from "../../lib/payload-client"

let cachedPayload: any = null

const handler: Handler = async (event, context) => {
  // Initialize Payload if not already cached
  if (!cachedPayload) {
    try {
      cachedPayload = await getPayloadClient()
    } catch (error) {
      console.error("Failed to initialize Payload:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to initialize CMS" }),
      }
    }
  }

  const { path, httpMethod, headers, body, queryStringParameters } = event

  // Extract the API path from the Netlify function path
  const apiPath = path.replace("/.netlify/functions/payload", "") || "/"

  try {
    // Handle different HTTP methods
    const response = await cachedPayload.handler({
      method: httpMethod,
      url: apiPath,
      headers,
      body: body ? JSON.parse(body) : undefined,
      query: queryStringParameters || {},
    })

    return {
      statusCode: response.status || 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        ...response.headers,
      },
      body: JSON.stringify(response.data || response),
    }
  } catch (error) {
    console.error("Payload handler error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

export { handler }
