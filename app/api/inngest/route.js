import {serve} from "inngest/next"
import {createUserOrder, inngest, syncUserCreataion, syncUserDeletation, syncUserUpdation} from "@/config/inngest"

export const {GET, POST, PUT} =serve({
    client: inngest,
    functions:[
        syncUserCreataion,
        syncUserUpdation,
        syncUserDeletation,
        createUserOrder
    ],
})