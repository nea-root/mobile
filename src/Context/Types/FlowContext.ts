import { Dispatch, SetStateAction } from 'react'

export interface FlowContext {
    flowType?: string; // flowType can be undefined or string
    setFlowType: (type: string) => void; // setFlowType must always be a function
}
