import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "../actions/actions"
const userSlice = createSlice({
    name: 'user',
    initialState: [{}],
    reducers: {
        setUser: (user, action: PayloadAction<any>) => {
            user.push({
                name: action.payload.name,
                email: action.payload.email
            })
        },
        setUserStarted: (user, action: PayloadAction<any>) => {
            
        },
        setUserFailed: (user, action: PayloadAction<any>) => {
            
        }
    }
})

const { setUser, setUserFailed, setUserStarted } = userSlice.actions

export default userSlice.reducer

// action creators

export const loadUser = (email: string) => (dispatch: any) => {
    
    const userData = {
        "email": email,
    }
    
    return dispatch(
        actions.insertUser({
            userData,
            onStart: setUserStarted.type,
            onSuccess: setUser.type,
            onError: setUserFailed.type,
        })
    )
}
export const loadUserFailed = () => (dispatch: any) => {
    
    return dispatch(
        actions.insertUser({
            onError: setUserFailed.type,
        })
    )
}