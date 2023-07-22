import { User } from "@/types"

interface AuthState {
    user: User
    accessToken: string
    refreshToken: string
  }
  