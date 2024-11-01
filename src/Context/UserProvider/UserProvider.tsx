import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { UserContext } from '../Types/UserContext'
import { mockUserList } from '@/../__mocks__/UserList/mockUserList'
export const UserProvider = createContext<UserContext>({
    userType: undefined,
    setUserType: undefined,
})

type Props = {
    children: ReactNode
}

export const UserProviderContext = ({ children }: Props) => {
    const [userType, setUserType] = useState<string>()

    const fetchDefaultVinId = () => {
        // TODO: Fetch list vehicle on cloud -> Get the first vehicle item -> Update vinId
        const firstUser = mockUserList[0]
        setUserType(firstUser.userType)
    }

    useEffect(() => {
        if (!userType) {
            fetchDefaultVinId()
        }
    }, [userType])

    const userProvider = useMemo(() => {
        return {
            userType: userType,
            setUserType: setUserType,
        }
    }, [userType])

    return (
        <UserProvider.Provider value={userProvider}>
            {children}
        </UserProvider.Provider>
    )
}
