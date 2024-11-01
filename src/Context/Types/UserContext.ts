import { Dispatch, SetStateAction } from 'react'

export type UserContext = {
    userType?: string
    setUserType?: Dispatch<SetStateAction<string | undefined>>
}
