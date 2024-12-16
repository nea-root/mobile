export type AlertModalData = {
  isShow: boolean
  title?: string
  description?: string
  testID?: string
  actions?: AlertModalActionData[]
}

export type AlertModalActionData = {
  testID?: string
  label: string
  action: () => void
}
