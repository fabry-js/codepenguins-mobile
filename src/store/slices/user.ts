import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: [{}],
    reducers: {
        setUser: (user, action: PayloadAction<any>) => {
            user.push({
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            })
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

// action creators

export const loadUser = () => (dispatch: any, getState: any) => {
    return dispatch(setUser.type)
}