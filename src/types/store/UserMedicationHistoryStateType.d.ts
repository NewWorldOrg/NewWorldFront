export interface UserMedicationHistoryStateType {
  current_page: number
  data: {
    user: {
      name: string
    }
    medication_history: {
      id: number
      drugName: string
      amount: number
      createdAt: string
    }[]
  }
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: ?string
    label: string
    active: boolean
  }[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: ?string
  to: number
  total: number
}
