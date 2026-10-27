import * as z from 'zod'

// LOGIN
export const LoginSchema = z.object({
    userName: z.string().min(1, "Enter your username or email"),
    password: z.string().min(6, "The password must be at least 6 characters long.")
})

export type LoginForm = z.infer<typeof LoginSchema>


// REGISTER
export const RegisterSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "The password must be at least 6 characters long."),
})

export type RegisterForm = z.infer<typeof RegisterSchema>