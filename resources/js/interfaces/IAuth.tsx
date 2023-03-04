interface User {
    ID?: Number,
    token: String|boolean,
    firstName?: String,
    lastName?: String,
    email?: String,
    data?: object
}

interface AuthContextType {
    user: User;
    login: (user: LoginData, successResponse: Function, errorResponse?: Function) => void;
    logout: (callback: VoidFunction) => void;
}

type AuthChildren = { children:React.ReactNode }

type LoginData = {
    email: String | FormDataEntryValue | null,
    password: String | FormDataEntryValue | null,
    remember?: String | FormDataEntryValue | null
}

