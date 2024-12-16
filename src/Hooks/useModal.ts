
import {
  AlertModalActionData,
  AlertModalData,
} from '@/Data/Models/Application/AlertModalData'
import { useCallback, useState } from 'react'

export default function () {
  const [alertModalData, setAlertModalData] = useState<AlertModalData>({
    isShow: false,
  })

  // Quick call the dismiss the dialog
  const hideModal = useCallback(() => {
    setAlertModalData({ isShow: false })
  }, [])

  // Build and show alert modal
  // Note: Action have a default button labeled `OK` to dismiss the dialog
  const showAlert = useCallback(
    (
      isShow: boolean,
      title: string,
      description: string,
      actions: AlertModalActionData[] = [
        {
          label: 'OK',
          action: () => {
            setAlertModalData({ isShow: false })
          },
        },
      ],
    ) => {
      setAlertModalData({
        isShow,
        title,
        description,
        actions,
      })
    },
    [],
  )

  return {
    alertModalData,
    hideModal,
    showAlert,
  }
}
