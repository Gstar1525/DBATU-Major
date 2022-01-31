import { getAuth } from "../api/auth";

const loggedInReducer = (state = null, action) => {
    switch (action.type) {
        case "ISLOGGED":
            if (action.payload) {
                return action.payload;
            }
            return null;
        default:
            return null;
    }
}

export default loggedInReducer;