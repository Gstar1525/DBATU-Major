const loadingReducer = (_, action) => {
    if (action.type == "ISLOADING" && action.payload) {
        return action.payload;
    }
    return false;
}

export default loadingReducer;