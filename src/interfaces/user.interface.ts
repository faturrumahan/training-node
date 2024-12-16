export interface IUsers {
  id: string
  email: string
  name: string
  password: string
  role: "ADMIN" | "USER"
}
