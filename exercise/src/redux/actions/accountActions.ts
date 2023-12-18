import { Data } from "../../models/Data";

export type Account = Record<"image" | "firstName" | "lastName" | "dateOfBirth" | "nationality" | "city" | "phoneNumber" | "email" | "password" , string> &
  Record<"isLogged", boolean>;

export interface AccountProps {
  account: Account;
}

export interface AccountAction {
  type: ACCOUNT_ACTIONS;
  payload: Account;
}

export interface UpdateAccountAction {
  type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT;
  payload: Partial<Account>;
}

export const updateAccount = (account: Partial<Account>): UpdateAccountAction => {
  return {
    type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT,
    payload: account,
  };
};

export interface DeleteAccountAction {
  type: ACCOUNT_ACTIONS.DELETE_ACCOUNT;
}

export const deleteAccount = (): DeleteAccountAction => {
  return {
    type: ACCOUNT_ACTIONS.DELETE_ACCOUNT,
  };
};


export enum ACCOUNT_ACTIONS {
  ADD_ACCOUNT = "ADD_ACCOUNT",
  LOGIN_ACCOUNT = "LOGIN_ACCOUNT",
  LOGOUT_ACCOUNT = "LOGOUT_ACCOUNT",
  UPDATE_ACCOUNT= "UPDATE_ACCOUNT",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
}

export const signUp = (account: Account) => {
  return {
    type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
    payload: account,
  };
};

export const login = (account: Account) => {
  return {

    type: ACCOUNT_ACTIONS.LOGIN_ACCOUNT,
    payload: account,
  };
};

export const logout = () => {
  return {
    type: ACCOUNT_ACTIONS.LOGOUT_ACCOUNT,
  };
};
