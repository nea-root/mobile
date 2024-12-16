import { AlertModalData } from '@/Data/Models/Application/AlertModalData'
import { useTheme } from '@/Hooks'
import { Modal, Text, View, ViewStyle } from 'react-native'
import { Button, Divider } from 'react-native-paper'
import createStyles from './AlertModalStyle'

export const AlertModal = (props: AlertModalData) => {
  const { isShow, title, description, actions } = props
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Modal testID="alertModal" visible={isShow} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title && title.length > 0 && (
            <Text style={[styles.titleText]}>{title}</Text>
          )}
          <Text style={[styles.descriptionText]}>{description}</Text>
          {actions && (
            <>
              <Divider style={[styles.divider]} />
              <View style={styles.actionContainer}>
                {actions?.map((data, index) => {
                  return (
                    <Button
                      key={`${data.label}_${index}`}
                      style={styles.actionButton}
                      labelStyle={styles.textStyle}
                      removeClippedSubviews={false}
                      testID={
                        'alert_action_button_' +
                        (data.testID ? data.testID : data.label)
                      }
                      onPress={data.action}
                    >
                      {data.label}
                    </Button>
                  )
                })}
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

export const CONTAINER: ViewStyle = {}
