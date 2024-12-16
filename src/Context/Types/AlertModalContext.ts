import {
  AlertModalActionData,
  AlertModalData,
} from '@/Data/Models/Application/AlertModalData'

export type AlertModalContext = {
  alertModalData?: AlertModalData
  showAlert?: (
    isShow: boolean,
    title: string,
    description: string,
    actions?: AlertModalActionData[],
    isHighPriority?: boolean,
  ) => void
  hideModal?: () => void
}
