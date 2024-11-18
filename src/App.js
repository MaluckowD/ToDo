
import s from "./App.module.css"
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
function App() {
  return (
    <div className = {s.wrapper}>
      <Content/>
      <Login/>
      <Registration/>
    </div>
  );
}

export default App;
