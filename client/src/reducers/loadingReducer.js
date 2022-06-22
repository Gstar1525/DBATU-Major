const loadingReducer = (state = false, action) => {
    if (action.type === "ISLOADING") {
        return action.payload
    }
    return state;
}

export default loadingReducer;