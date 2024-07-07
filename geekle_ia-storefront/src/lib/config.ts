import Medusa from "@medusajs/medusa-js"
import CustomClient from "./custom_client"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})


export const customClient = new CustomClient({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})
