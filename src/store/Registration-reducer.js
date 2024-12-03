const SET_LOGIN = "SET_LOGIN";
const CHANGE_TEXT = "CHANGE_TEXT";

let initial = {
  name: "",
  surname: "",
  short_name: "",
  email: "",
  gender: "",
  password: "",
};

const RegistrationReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        name: action.name,
        surname: action.surname,
        short_name: action.short_name,
        email: action.email,
        gender: action.gender,
        password: action.password,
      };
    }
    case CHANGE_TEXT: {
      return { ...state, name: action.name };
    }
    default:
      return state;
  }
};

export default RegistrationReducer;

export const setLogin = (
  name,
  surname,
  short_name,
  email,
  gender,
  password
) => ({ type: SET_LOGIN, name, surname, short_name, email, gender, password });

export const changeOnNameActionCreator = (name) => ({
  type: CHANGE_TEXT,
  name: name,
});