import React, { useContext } from 'react';
import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { FlowProvider, FlowProviderContext } from '@/Context/FlowProvider/FlowProvider';

const TestConsumer = () => {
  const { flowType } = useContext(FlowProvider);
  return <Text testID="flow-type">{flowType ?? 'none'}</Text>;
};

describe('FlowProviderContext', () => {
  it('renders children without crashing', () => {
    expect(() =>
      render(
        <FlowProviderContext>
          <Text>Child</Text>
        </FlowProviderContext>
      )
    ).not.toThrow();
  });

  it('provides a flowType value to consumers', async () => {
    const { getByTestId } = render(
      <FlowProviderContext>
        <TestConsumer />
      </FlowProviderContext>
    );
    // FlowProviderContext initializes from mockUserList
    const el = getByTestId('flow-type');
    expect(el).toBeTruthy();
  });

  it('provides setFlowType function to context', () => {
    let contextSetFlowType: any;
    const CaptureSetter = () => {
      const ctx = useContext(FlowProvider);
      contextSetFlowType = ctx.setFlowType;
      return <Text>capture</Text>;
    };

    render(
      <FlowProviderContext>
        <CaptureSetter />
      </FlowProviderContext>
    );

    expect(typeof contextSetFlowType).toBe('function');
  });

  it('default context throws when setFlowType is called outside provider', () => {
    expect(() => FlowProvider._currentValue.setFlowType('victim' as any)).toThrow(
      'setFlowType is not implemented'
    );
  });

  it('default context flowType is undefined', () => {
    expect(FlowProvider._currentValue.flowType).toBeUndefined();
  });

  it('allows updating flowType via setFlowType', async () => {
    let setter: any;
    const Captor = () => {
      const ctx = useContext(FlowProvider);
      setter = ctx.setFlowType;
      return <Text testID="type">{ctx.flowType ?? 'none'}</Text>;
    };

    const { getByTestId } = render(
      <FlowProviderContext>
        <Captor />
      </FlowProviderContext>
    );

    await act(async () => {
      setter('volunteer');
    });

    expect(getByTestId('type').props.children).toBe('volunteer');
  });
});
