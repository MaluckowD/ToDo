import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import s from "./App.module.css";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Calendar from "./components/Content/Main/Calendar/Calendar";
import Settings from "./components/Content/Main/Settings/Settings";
function App(props) {
  const [userDatafromRegistration, setuserDatafromRegistration] = useState(null);
  const handleuserDatafromRegistration = (data) => {
    setuserDatafromRegistration(data);
    console.log(userDatafromRegistration)
  }

  const saveToken = (token) => {
    localStorage.setItem('access_token', token);
  };

  const getToken = () => {
    return localStorage.getItem('access_token');
  };

  const removeToken = () => {
    localStorage.removeItem('access_token');
  }

  useEffect(() => {
    console.log("Текущее состояние userDatafromRegistration:", userDatafromRegistration);
  }, [userDatafromRegistration]);
  return (
    <div className={s.wrapper}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login saveToken={saveToken}/>} />
          <Route path="/Registration" store={props.store} element={<Registration onDataUser={handleuserDatafromRegistration} saveToken={saveToken} />} />
          <Route path="/Content" element={<Content getToken={getToken}/>}>
            <Route index element={<Calendar />} />
            <Route path="Settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
