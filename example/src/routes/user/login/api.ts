import { ContextType } from "diesel-core"

export const POST = async (ctx:ContextType) => {
    const { email, password } = await ctx.body

    if (!email || !password) {
        return ctx.json({
            error: "Email and password are required"
        }, 400)
    }

    if (email === "test@gmail.com" && password === "123") {
        // Mock JWT token
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

        return ctx.json({
            success: true,
            token: mockToken,
            user: {
                id: "123456",
                name: "John Doe",
                email: email
            }
        })
    }

    return ctx.json({
        error: "Invalid credentials"
    }, 401)
}