
import s from "./App.module.css"
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className = {s.wrapper}>
      <Content/>
      <Login/>
      
    </div>
  );
}

export default App;
