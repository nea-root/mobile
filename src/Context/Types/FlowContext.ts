import {Role} from '@/Services/Authentication/AuthService';

export interface FlowContext {
  flowType?: Role; // flowType can be undefined or string
  setFlowType: (type: Role) => void; // setFlowType must always be a function
}
