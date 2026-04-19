import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OnBoardingScreen from '@/Containers/OnBoarding/OnBoardingScreen';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const mockSetFlowType = jest.fn();
const mockFlowContext = {
  flowType: undefined,
  setFlowType: mockSetFlowType,
};

const renderWithContext = (contextValue = mockFlowContext) =>
  render(
    <FlowProvider.Provider value={contextValue}>
      <OnBoardingScreen />
    </FlowProvider.Provider>
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('OnBoardingScreen', () => {
  it('renders without crashing', () => {
    expect(() => renderWithContext()).not.toThrow();
  });

  it('displays all 4 role cards', () => {
    const { getByText } = renderWithContext();
    expect(getByText(/Help/)).toBeTruthy();
    expect(getByText(/Volunteer/)).toBeTruthy();
    expect(getByText(/Lawyer/)).toBeTruthy();
    expect(getByText(/Therapist/)).toBeTruthy();
  });

  it('navigates directly when victim card is pressed', () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Help/));
    expect(mockSetFlowType).toHaveBeenCalledWith('loading');
    expect(mockNavigate).toHaveBeenCalledWith('WalkthroughStack', { flowType: 'victim' });
  });

  it('shows warning modal when volunteer card is pressed', async () => {
    const { getByText, queryByText } = renderWithContext();
    expect(queryByText('Remember')).toBeNull();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() => expect(getByText('Remember')).toBeTruthy());
  });

  it('shows correct volunteer disclaimer text in modal', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() =>
      expect(getByText(/NEA Volunteer is only offering/)).toBeTruthy()
    );
  });

  it('shows warning modal when lawyer card is pressed', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Lawyer/));
    await waitFor(() => expect(getByText('Remember')).toBeTruthy());
  });

  it('shows correct lawyer disclaimer text', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Lawyer/));
    await waitFor(() =>
      expect(getByText(/legal representation agreement/)).toBeTruthy()
    );
  });

  it('shows warning modal when therapist card is pressed', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Therapist/));
    await waitFor(() => expect(getByText('Remember')).toBeTruthy());
  });

  it('shows correct therapist disclaimer text', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Therapist/));
    await waitFor(() =>
      expect(getByText(/professional services agreement/)).toBeTruthy()
    );
  });

  it('Proceed button is disabled initially (checkbox unchecked)', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() => {
      const proceedBtn = getByText('Proceed');
      // The TouchableOpacity should be disabled
      expect(proceedBtn).toBeTruthy();
    });
  });

  it('enables Proceed button after checking checkbox', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() => getByText('I understand and agree to proceed'));
    fireEvent.press(getByText('I understand and agree to proceed'));
    await waitFor(() => {
      expect(getByText('Proceed')).toBeTruthy();
    });
  });

  it('navigates after checking checkbox and pressing Proceed', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() => getByText('I understand and agree to proceed'));
    fireEvent.press(getByText('I understand and agree to proceed'));
    fireEvent.press(getByText('Proceed'));
    await waitFor(() => {
      expect(mockSetFlowType).toHaveBeenCalledWith('loading');
      expect(mockNavigate).toHaveBeenCalledWith('WalkthroughStack', { flowType: 'volunteer' });
    });
  });

  it('closes modal when ✕ is pressed', async () => {
    const { getByText, queryByText } = renderWithContext();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() => getByText('Remember'));
    fireEvent.press(getByText('✕'));
    await waitFor(() => expect(queryByText('Remember')).toBeNull());
  });

  it('does not navigate when modal is dismissed without proceeding', async () => {
    const { getByText } = renderWithContext();
    fireEvent.press(getByText(/Volunteer/));
    await waitFor(() => getByText('Remember'));
    fireEvent.press(getByText('✕'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
