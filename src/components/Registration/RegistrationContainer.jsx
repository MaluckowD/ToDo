
import { addPostActionCreator, changeOnTitleActionCreator, changeOnTextActionCreator } from "../../../../redux/profile-reducer";
import { connect } from "react-redux";
import Registration from "./Registration";

const mapStateToProps = (state) => {
  return {
    postName: state.registration.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addpost: () => {
      dispatch(addPostActionCreator())
    },
    changeOnName: (newTitle) => {
      dispatch(changeOnTitleActionCreator(newTitle))
    },
    changeOnText: (newText) => {
      dispatch(changeOnTextActionCreator(newText))
    }
  }
}

const LinkPostContainer = connect(mapStateToProps, mapDispatchToProps)(Registration)
export default LinkPostContainer