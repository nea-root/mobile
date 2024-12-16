import { ReactNode, createContext, useCallback, useMemo, useRef } from 'react'
import { AlertModalContext } from '../Types/AlertModalContext'
import { AlertModal } from '@/Components/CommonModal/AlertModal'
import { useModal, useTheme } from '@/Hooks'
import { AlertModalActionData } from '@/Data/Models/Application/AlertModalData'

import { BlurView } from '@react-native-community/blur'
import createStyles from './Styles'

export const AlertModalProvider = createContext<AlertModalContext>({
  alertModalData: undefined,
  showAlert: undefined,
  hideModal: undefined,
})

type Props = {
  children: ReactNode
}

export const AlertModalProviderContext = ({ children }: Props) => {
  const { alertModalData, showAlert, hideModal } = useModal()
  const isReady = useRef<boolean>(true)

  const theme = useTheme()
  const styles = createStyles(theme)

  let tmpShowAlert = useCallback(
    (
      isShow: boolean,
      title: string,
      description: string,
      actions: AlertModalActionData[] = [
        {
          label: 'OK',
          action: () => {
            hideModal()
            isReady.current = true
          },
        },
      ],
      isHighPriority: boolean = false,
    ) => {
      if (isHighPriority || isReady.current) {
        isReady.current = false
        showAlert(isShow, title, description, actions)
        return true
      }
      return false
    },
    [hideModal, showAlert],
  )

  let tmpHideModal = useCallback(() => {
    isReady.current = true
    hideModal()
  }, [hideModal])

  const modalProvider = useMemo(() => {
    return {
      alertModalData,
      showAlert: tmpShowAlert,
      hideModal: tmpHideModal,
    }
  }, [alertModalData, tmpHideModal, tmpShowAlert])

  return (
    <AlertModalProvider.Provider value={modalProvider}>
      {children}
      {
        alertModalData.isShow ?
          <BlurView
            autoUpdate={false}
            blurAmount={theme.Dimens.controlBackgroundBlurAmount}
            blurRadius={theme.Dimens.controlBackgroundBlurRadius}
            style={{ position: 'absolute', height: '100%', width: '100%' }}
          >
            <AlertModal {...alertModalData} />
          </BlurView>
          : <></>
      }
    </AlertModalProvider.Provider>
  )
}
