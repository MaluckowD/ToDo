
const SET_LOGIN = "SET_LOGIN"

let initial = {
  name: "",
  surname: "",
  short_name: "",
  email: "",
  gender: "",
  password: ""
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
        password: action.password
      }
    }
    default:
      return state
  }

}

export default RegistrationReducer

export const setLogin = (name, surname, short_name, email, gender, password) => ({ type: SET_LOGIN, name, surname, short_name, email, gender, password })