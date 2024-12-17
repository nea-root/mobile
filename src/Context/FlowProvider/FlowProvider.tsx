import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { FlowContext } from '../Types/FlowContext'
import { mockUserList } from '@/../__mocks__/UserList/mockUserList'
import { Role } from '@/Services/Authentication/AuthService';

export const FlowProvider = createContext<FlowContext>({
    flowType: undefined,
    setFlowType: () => {
        throw new Error("setFlowType is not implemented");
    },
});

type Props = {
    children: ReactNode;
};

export const FlowProviderContext = ({ children }: Props) => {
    const [flowType, setFlowType] = useState<Role | undefined>();

    const fetchDefaultVinId = () => {
        const firstUser = mockUserList[0];
        setFlowType(firstUser.flowType);
    };

    useEffect(() => {
        if (!flowType) {
            fetchDefaultVinId();
        }
    }, [flowType]);

    const flowProvider = useMemo(() => {
        return {
            flowType,
            setFlowType,
        };
    }, [flowType]);

    return (
        <FlowProvider.Provider value={flowProvider}>
            {children}
        </FlowProvider.Provider>
    );
};