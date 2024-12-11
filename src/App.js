import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import s from "./App.module.css";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Calendar from "./components/Content/Main/Calendar/Calendar";
import Settings from "./components/Content/Main/Settings/Settings";
import axios from "axios";
function App(props) {
  const [userDatafromRegistration, setuserDatafromRegistration] = useState(null);
  const [categories, setCategories] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const handleuserDatafromRegistration = (data) => {
    setuserDatafromRegistration(data);
    console.log(userDatafromRegistration)
  }
  
  const updateUserDataInApp = (updatedUserData) => {
    setUserData(updatedUserData);
  };
  
  const saveToken = (token) => {
    localStorage.setItem('access_token', token);
    setToken(token); 
  };

  const getToken = () => localStorage.getItem('access_token');
  const [token, setToken] = useState(getToken());
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://energy-cerber.ru/user/self", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setCategories(response.data.categories)
      } catch (error) {
        setError(error);
        console.error("Ошибка при загрузке данных пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const updateCategories = async () => {
    try {
      const response = await axios.get("https://energy-cerber.ru/categories/", { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка при обновлении категорий:", error);
    }
  };

  const removeToken = () => {
    localStorage.removeItem('access_token');
  }
  console.log(categories)
  useEffect(() => {
    console.log("Текущее состояние userDatafromRegistration:", userDatafromRegistration);
  }, [userDatafromRegistration]);
  return (
    <div className={s.wrapper}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login saveToken={saveToken} updateUserDataInApp={updateUserDataInApp}/>} />
          <Route path="/Registration" store={props.store} element={<Registration onDataUser={handleuserDatafromRegistration} saveToken={saveToken} />} />
          <Route path="/Content" element={<Content updateCategories={updateCategories} categories={categories} userData={userData} getToken={getToken} isLoading={isLoading} error={error} updateUserDataInApp={updateUserDataInApp}/>}>
            <Route index element={<Calendar />} />
            <Route path="Settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
