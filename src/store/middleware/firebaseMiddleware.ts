import * as actions from "../actions/actions"

const firebaseUser = ({dispatch}: any) => (next: any) => async (action: any) => {
    if (action.type !== actions.insertUser.type) return next(action);

    if (action.type === actions.userLoadFailed.type) dispatch(actions.userLoadFailed.type);
    
    const { onSuccess, onError, onStart, data } = action.payload;

    if(onStart) dispatch({type: onStart})

    next(action);
    try {
        dispatch(actions.insertUser(data))
        if (onSuccess) await dispatch({type: onSuccess, payload: data})
    } catch (error) {
        dispatch(actions.userLoadFailed(error.message))

        if (onError) dispatch({type: onError, payload: error})
    }
}

export default firebaseUser