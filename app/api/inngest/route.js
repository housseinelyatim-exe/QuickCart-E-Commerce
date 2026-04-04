import {serve} from "inngest/next"
import {inngest, syncUserCreataion, syncUserDeletation, syncUserUpdation} from "@/config/inngest"

export const {GET, POST, PUT} =serve({
    client: inngest,
    functions:[
        syncUserCreataion,
        syncUserUpdation,
        syncUserDeletation
    ],
})