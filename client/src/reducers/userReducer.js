const userReducer = (_, action) => {
    if (action.payload) {
        return action.payload;
    }
    return null;
}

export default userReducer;