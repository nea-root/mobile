import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { AlertModal } from '@/Components/CommonModal/AlertModal'
import { RenderResult } from '@testing-library/react-native/build/render'
import { AlertModalData } from '@/Data/Models/Application/AlertModalData'
import { Provider } from 'react-redux'
import { store } from '@/Store'

const props: AlertModalData = {
  isShow: true,
  title: 'AlertModel Title',
  description: 'AlertModal description',
  actions: [
    {
      label: 'Ok',
      testID: 'ok',
      action: jest.fn(),
    },
  ],
}
let renderResult: RenderResult
beforeEach(() => {
  renderResult = render(
    <Provider store={store}>
      <AlertModal {...props} />
    </Provider>,
  )
})

it('should render AlertModel correctly', async () => {
  await waitFor(() => {
    expect(renderResult.toJSON()).toMatchSnapshot()
  })
})

it('should onAccept function called when button is pressed', async () => {
  fireEvent.press(renderResult.getByTestId('alert_action_button_ok-text'))

  await waitFor(() => {
    if (!props.actions) {
      expect(props.actions).not.toBeNull()
      return
    }
    expect(props.actions[0].action).toBeCalled()
  })
})
