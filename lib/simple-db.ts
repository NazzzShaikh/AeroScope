import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'users.json')

interface User {
  id: number
  name: string
  email: string
  username: string
  password: string
  location: string
  latitude: number
  longitude: number
  created_at: string
}

function ensureDbExists() {
  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]))
  }
}

function getUsers(): User[] {
  ensureDbExists()
  const data = fs.readFileSync(dbPath, 'utf8')
  return JSON.parse(data)
}

function saveUsers(users: User[]) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2))
}

export const simpleDb = {
  createUser: (userData: Omit<User, 'id' | 'created_at'>) => {
    const users = getUsers()
    const newUser: User = {
      ...userData,
      id: users.length + 1,
      created_at: new Date().toISOString()
    }
    users.push(newUser)
    saveUsers(users)
    return newUser
  },

  getUserByUsername: (username: string) => {
    const users = getUsers()
    return users.find(user => user.username === username)
  },

  getUserByEmail: (email: string) => {
    const users = getUsers()
    return users.find(user => user.email === email)
  }
}