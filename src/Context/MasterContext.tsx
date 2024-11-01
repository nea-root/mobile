import { ReactNode } from 'react'
import { UserProviderContext } from './UserProvider/UserProvider'

type Props = {
    children: ReactNode
}

export const MasterContext = ({ children }: Props) => {
    return (
        <UserProviderContext>
            {children}
        </UserProviderContext>
    )
}
