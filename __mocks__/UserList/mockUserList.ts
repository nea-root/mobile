import { Role } from "@/Services/Authentication/AuthService"

export type UserList = {
    flowType: Role,
}

export const mockUserList: UserList[] = [
    {
        flowType: "victim",
    },
    {
        flowType: "volunteer",
    },
    {
        flowType: "lawyer",
    },
    {
        flowType: "therapist",
    }
]