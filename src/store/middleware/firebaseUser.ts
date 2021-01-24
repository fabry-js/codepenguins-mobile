import * as actions from "../actions/actions"

const firebaseUser = ({dispatch}: any) => (next: any) => async (action: any) => {
    if (action.type !== actions.insertUser.type) return next(action);

    next(action);
    try {
        await dispatch(actions.userTriedToLoad.type)
    } catch (error) {
        dispatch(actions.userLoadFailed.type)
    }
}