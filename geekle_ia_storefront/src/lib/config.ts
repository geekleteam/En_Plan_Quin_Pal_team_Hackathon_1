import Medusa from "@medusajs/medusa-js"
import CustomClient from "./custom_client"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (typeof window !== 'undefined') {
  if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
    MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

    console.log('Setting MEDUSA_BACKEND_URL to', MEDUSA_BACKEND_URL, 'using process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL')
  }
} else if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
  console.log('Setting MEDUSA_BACKEND_URL to', MEDUSA_BACKEND_URL, 'using process.env.MEDUSA_BACKEND_URL')
}


export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})


export const customClient = new CustomClient({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})
