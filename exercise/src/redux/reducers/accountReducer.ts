import {
  ACCOUNT_ACTIONS,
  Account,
  AccountAction,
  AccountProps,
} from "../actions/accountActions";

const initialState: AccountProps = {
  account: { 
    email: "", 
    password: "", 
    isLogged: false,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    city: "",
    phoneNumber: "",
    image: ""

  },
};


const accountReducer = (state = initialState, action: AccountAction) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.ADD_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case ACCOUNT_ACTIONS.LOGIN_ACCOUNT:
      if (
        state.account?.email === action.payload.email &&
        state.account?.password === action.payload.password
      )
        return {
          ...state,
          account: {
            ...state.account,
            isLogged: true,
          },
        };
    case ACCOUNT_ACTIONS.LOGOUT_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          isLogged: false,
        },
      };
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT:
  return {
    ...state,
    account: {
      ...state.account,
      isLogged: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      city: "",
      phoneNumber: "",
      image: "",
    },
  };
    default:
      return state;
  }
};


export default accountReducer;
