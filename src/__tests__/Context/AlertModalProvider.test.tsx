import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import {
  AlertModalProvider,
  AlertModalProviderContext,
} from '@/Context/AlertModal/AlertModalProvider';

const mockShowAlert = jest.fn();
const mockHideModal = jest.fn();

jest.mock('@/Hooks', () => ({
  useModal: () => ({
    alertModalData: {isShow: false, title: '', description: '', actions: []},
    showAlert: mockShowAlert,
    hideModal: mockHideModal,
  }),
  useTheme: () => ({
    Colors: {
      Palette: {white: '#fff'},
      alertTextColor: '#000',
      alertShadowColor: 'rgba(0,0,0,0.3)',
      alertDividerColor: '#eee',
    },
    Layout: {
      fill: {flex: 1},
      center: {},
      alignSelfStretch: {},
      row: {},
      justifyContentSpaceEvenly: {},
    },
    Gutters: {largeHMargin: {}},
    Fonts: {textBoldRegular: {}, textSmallBold: {}, textRegular: {}},
    MetricsSizes: {large: 24},
    ViewSizes: {},
    Dimens: {
      modalBorderRaidus: 12,
      zero: 0,
      alertShadowOffsetHeight: 2,
      alertShadowOpacity: 0.25,
      alertShadowRadius: 4,
      alertShadowElevation: 5,
      alertMarginTop: 24,
      alertDescriptionMarginTop: 8,
      alertDividerMarginTop: 16,
      alertDividerHeight: 1,
      alertActionHeight: 48,
      alertActionTextPadding: 4,
      controlBackgroundBlurAmount: 2,
      controlBackgroundBlurRadius: 2,
    },
  }),
}));

jest.mock('@react-native-community/blur', () => ({
  BlurView: ({children}: any) => {
    const {View} = require('react-native');
    return <View testID="blur-view">{children}</View>;
  },
}));

jest.mock('@/Components/CommonModal/AlertModal', () => ({
  AlertModal: ({title}: any) => {
    const {Text: RNText} = require('react-native');
    return <RNText testID="alert-modal">{title}</RNText>;
  },
}));

const TestConsumer = () => {
  const ctx = useContext(AlertModalProvider);
  return (
    <>
      <TouchableOpacity
        testID="show-btn"
        onPress={() => ctx.showAlert?.(true, 'T', 'D', [])}>
        <Text>Show</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="hide-btn" onPress={() => ctx.hideModal?.()}>
        <Text>Hide</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="priority-btn"
        onPress={() => ctx.showAlert?.(true, 'T', 'D', [], true)}>
        <Text>Priority</Text>
      </TouchableOpacity>
    </>
  );
};

describe('AlertModalProviderContext', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders without crashing', () => {
    expect(() =>
      render(
        <AlertModalProviderContext>
          <Text>child</Text>
        </AlertModalProviderContext>,
      ),
    ).not.toThrow();
  });

  it('renders children', () => {
    const {getByText} = render(
      <AlertModalProviderContext>
        <Text>inner content</Text>
      </AlertModalProviderContext>,
    );
    expect(getByText('inner content')).toBeTruthy();
  });

  it('does not render BlurView when isShow is false', () => {
    const {queryByTestId} = render(
      <AlertModalProviderContext>
        <Text>child</Text>
      </AlertModalProviderContext>,
    );
    expect(queryByTestId('blur-view')).toBeNull();
  });

  it('provides showAlert via context and calls it', () => {
    const {getByTestId} = render(
      <AlertModalProviderContext>
        <TestConsumer />
      </AlertModalProviderContext>,
    );
    fireEvent.press(getByTestId('show-btn'));
    expect(mockShowAlert).toHaveBeenCalledWith(true, 'T', 'D', []);
  });

  it('provides hideModal via context and calls it', () => {
    const {getByTestId} = render(
      <AlertModalProviderContext>
        <TestConsumer />
      </AlertModalProviderContext>,
    );
    fireEvent.press(getByTestId('hide-btn'));
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('showAlert with high priority calls underlying showAlert', () => {
    const {getByTestId} = render(
      <AlertModalProviderContext>
        <TestConsumer />
      </AlertModalProviderContext>,
    );
    fireEvent.press(getByTestId('priority-btn'));
    expect(mockShowAlert).toHaveBeenCalledWith(true, 'T', 'D', []);
  });
});
