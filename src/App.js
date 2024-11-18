import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import s from "./App.module.css"
function App() {
  return (
    <div className = {s.wrapper}>
      <Header />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
