export interface UserData {
  fullName: string
  username: string
  initials: string
  avatarUrl?: string
}

export const currentUser: UserData = {
  fullName: 'Muhannad Al-Srahen',
  username: 'muhannad-dev',
  initials: 'MA',
  avatarUrl: '/placeholder.svg?height=40&width=40',
}
