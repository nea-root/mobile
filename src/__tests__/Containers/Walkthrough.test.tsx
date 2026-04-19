import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Walkthrough from '@/Containers/Walkthrough/Walkthrough';
import {FlowProvider} from '@/Context/FlowProvider/FlowProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockNavigate}),
}));

jest.mock('@/Components/Shared/LoadingSpinner', () => {
  const {Text} = require('react-native');
  return () => <Text>Loading...</Text>;
});

jest.mock('@/Components/WalkthroughCarousal/WalkthroughCarousal', () => {
  const {View} = require('react-native');
  return () => {
    // Simulate carousel with a stable index
    return <View testID="carousel" />;
  };
});

const renderWithFlow = (flowType: string | undefined) =>
  render(
    <FlowProvider.Provider
      value={{flowType: flowType as any, setFlowType: jest.fn()}}>
      <Walkthrough />
    </FlowProvider.Provider>,
  );

beforeEach(() => jest.clearAllMocks());

describe('Walkthrough', () => {
  it('shows loading spinner when flowType is undefined', () => {
    const {getByText} = renderWithFlow(undefined);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('shows loading spinner when flowType is "loading"', () => {
    const {getByText} = renderWithFlow('loading');
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders carousel when flowType is "victim"', () => {
    const {getByTestId} = renderWithFlow('victim');
    expect(getByTestId('carousel')).toBeTruthy();
  });

  it('renders Register button', () => {
    const {getByText} = renderWithFlow('victim');
    expect(getByText('Register')).toBeTruthy();
  });

  it('renders "Already registered?" text', () => {
    const {getByText} = renderWithFlow('victim');
    expect(getByText(/Already registered\?/)).toBeTruthy();
  });

  it('renders Login link', () => {
    const {getByText} = renderWithFlow('victim');
    expect(getByText('Login')).toBeTruthy();
  });

  it('navigates to AuthStack when Register is pressed', () => {
    const {getByText} = renderWithFlow('volunteer');
    fireEvent.press(getByText('Register'));
    expect(mockNavigate).toHaveBeenCalledWith('AuthStack');
  });

  it('navigates to Login when Login link is pressed', () => {
    const {getByText} = renderWithFlow('victim');
    fireEvent.press(getByText('Login'));
    expect(mockNavigate).toHaveBeenCalledWith('AuthStack', {screen: 'Login'});
  });

  it('renders heading from first slide for victim', () => {
    const {getByText} = renderWithFlow('victim');
    expect(getByText('Live Chat')).toBeTruthy();
  });

  it('renders subheading from first slide for victim', () => {
    const {getByText} = renderWithFlow('victim');
    expect(getByText(/Be Anonymous/)).toBeTruthy();
  });

  it('renders heading from first slide for volunteer', () => {
    const {getByText} = renderWithFlow('volunteer');
    expect(getByText('Start Volunteering')).toBeTruthy();
  });

  it('renders heading from first slide for lawyer', () => {
    const {getByText} = renderWithFlow('lawyer');
    expect(getByText('Offer Legal Aid')).toBeTruthy();
  });

  it('renders heading from first slide for therapist', () => {
    const {getByText} = renderWithFlow('therapist');
    expect(getByText('Offer Counseling')).toBeTruthy();
  });
});
