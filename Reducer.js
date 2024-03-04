export const initialState = {
    user: null,//toggle on and off the login screen
};

//actions to push info into data layer
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                //keep the state of the data layer already everything inside
                ...state,
                //change the user whatever we dispatched
                user: action.user,
            };

            default:
                 return state;
    }
};

export default reducer;