"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signIn, signUp } from "@/app/actions"
import { toast } from "sonner"

function AuthFormClient() {
  "use client"

  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result =
        mode === "signin"
          ? await signIn({ email, password })
          : await signUp({ email, password })

      if (result?.error) {
        toast.error(result.error)
      }
      // On success the server action may redirect.
    } catch (err) {
      console.error(err)
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>
          Use your email and password to {mode === "signin" ? "sign in" : "create an account"}.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            // placeholder="you@example.com"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Create account" : "Have an account?"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <small className="text-muted-foreground">No third-party logins configured.</small>
      </CardFooter>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <AuthFormClient />
    </main>
  )
}
