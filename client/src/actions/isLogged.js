export const isLogged = (user) => {
    return {
        type: "ISLOGGED",
        payload: user
    }
}