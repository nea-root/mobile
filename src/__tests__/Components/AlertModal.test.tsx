import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AlertModal} from '@/Components/CommonModal/AlertModal';

jest.mock('@/Hooks', () => ({
  useTheme: () => ({
    Colors: {
      Palette: {white: '#fff'},
      alertTextColor: '#000',
      alertShadowColor: 'rgba(0,0,0,0.3)',
      alertDividerColor: '#eee',
    },
    Layout: {
      fill: {flex: 1},
      center: {justifyContent: 'center', alignItems: 'center'},
      alignSelfStretch: {alignSelf: 'stretch'},
      row: {flexDirection: 'row'},
      justifyContentSpaceEvenly: {justifyContent: 'space-evenly'},
    },
    Gutters: {
      largeHMargin: {marginHorizontal: 24},
    },
    Fonts: {
      textBoldRegular: {fontWeight: '700', fontSize: 16},
      textSmallBold: {fontWeight: '600', fontSize: 14},
      textRegular: {fontSize: 14},
    },
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

jest.mock('react-native-paper', () => ({
  Button: ({children, onPress, testID}: any) => {
    const {TouchableOpacity, Text} = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  },
  Divider: () => {
    const {View} = require('react-native');
    return <View testID="divider" />;
  },
}));

const baseProps = {
  isShow: true,
  title: 'Alert Title',
  description: 'Alert description text',
  actions: [],
};

describe('AlertModal', () => {
  it('renders without crashing when isShow is true', () => {
    expect(() => render(<AlertModal {...baseProps} />)).not.toThrow();
  });

  it('does not render when isShow is false', () => {
    const {queryByText} = render(<AlertModal {...baseProps} isShow={false} />);
    expect(queryByText('Alert description text')).toBeNull();
  });

  it('shows description text', () => {
    const {getByText} = render(<AlertModal {...baseProps} />);
    expect(getByText('Alert description text')).toBeTruthy();
  });

  it('shows title when provided', () => {
    const {getByText} = render(<AlertModal {...baseProps} />);
    expect(getByText('Alert Title')).toBeTruthy();
  });

  it('does not render title when title is empty', () => {
    const {queryByText} = render(<AlertModal {...baseProps} title="" />);
    expect(queryByText('Alert Title')).toBeNull();
  });

  it('renders action buttons', () => {
    const action1 = jest.fn();
    const action2 = jest.fn();
    const {getByText} = render(
      <AlertModal
        {...baseProps}
        actions={[
          {label: 'Cancel', action: action1},
          {label: 'Confirm', action: action2},
        ]}
      />,
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('calls action handler when button pressed', () => {
    const action = jest.fn();
    const {getByText} = render(
      <AlertModal {...baseProps} actions={[{label: 'OK', action}]} />,
    );
    fireEvent.press(getByText('OK'));
    expect(action).toHaveBeenCalled();
  });

  it('renders divider when actions are provided', () => {
    const {getByTestId} = render(
      <AlertModal
        {...baseProps}
        actions={[{label: 'OK', action: jest.fn()}]}
      />,
    );
    expect(getByTestId('divider')).toBeTruthy();
  });

  it('renders without actions prop set to undefined', () => {
    const {queryByTestId} = render(
      <AlertModal {...baseProps} actions={undefined} />,
    );
    expect(queryByTestId('divider')).toBeNull();
  });

  it('renders multiple actions', () => {
    const {getAllByText} = render(
      <AlertModal
        {...baseProps}
        actions={[
          {label: 'Option 1', action: jest.fn()},
          {label: 'Option 2', action: jest.fn()},
          {label: 'Option 3', action: jest.fn()},
        ]}
      />,
    );
    expect(getAllByText(/Option/).length).toBe(3);
  });

  it('uses testID from action when provided', () => {
    const {getByTestId} = render(
      <AlertModal
        {...baseProps}
        actions={[{label: 'OK', action: jest.fn(), testID: 'custom-ok-btn'}]}
      />,
    );
    expect(getByTestId('alert_action_button_custom-ok-btn')).toBeTruthy();
  });

  it('uses label as testID when no testID provided', () => {
    const {getByTestId} = render(
      <AlertModal
        {...baseProps}
        actions={[{label: 'Dismiss', action: jest.fn()}]}
      />,
    );
    expect(getByTestId('alert_action_button_Dismiss')).toBeTruthy();
  });
});
