import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import s from "./App.module.css";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Calendar from "./components/Content/Main/Calendar/Calendar";
import Profile from "./components/Content/Main/Profile/Profile";
import axios from "axios";
function App(props) {
  const [userDatafromRegistration, setuserDatafromRegistration] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tasks, setTasks] = useState(null);
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
        const response = await axios.get("https://api.energy-cerber.ru/user/self", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setCategories(response.data.categories)
        setTasks(response.data.tasks)
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.energy-cerber.ru/categories/no_base", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setCategories(response.data)
      } catch (error) {
        setError(error);
        console.error("Ошибка при загрузке данных пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);

  const updateCategories = async () => {
    try {
      const response = await axios.get("https://api.energy-cerber.ru/categories/no_base", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка при обновлении категорий:", error);
    }
  };

  const updateTasks = async () => {
    try {
      const response = await axios.get("https://api.energy-cerber.ru/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при обновлении задач:", error);
    }
  };
  const AuthRedirect = () => {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
      if (token) {
        navigate("/content");
      } else {
        navigate("/login");
      }
    }, [navigate, token]);

    return null;
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
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<Login saveToken={saveToken} updateUserDataInApp={updateUserDataInApp} />} />
          <Route
            path="/registration"
            store={props.store}
            element={<Registration onDataUser={handleuserDatafromRegistration} saveToken={saveToken} />}
          />
          <Route path="/content" element={<Content removeToken={removeToken}
            updateTasks={updateTasks} tasks={tasks} updateCategories={updateCategories} categories={categories}
            userData={userData} getToken={getToken}
            isLoading={isLoading} error={error}
            updateUserDataInApp={updateUserDataInApp}
          />}>
            <Route index element={<Calendar />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
