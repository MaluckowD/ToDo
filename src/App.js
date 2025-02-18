import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import s from "./App.module.css";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Calendar from "./components/Content/Main/Calendar/Calendar";
import Profile from "./components/Content/Main/Profile/Profile";
import useStore from "./store/useToDoStore.js";
import { getDataApi, categoriesNobaseApi, updateTasksApi } from "./api/api.ts"
function App(props) {
  const categories = useStore((state) => state.categories);
  const tasks = useStore((state) => state.tasks);
  const userData = useStore((state) => state.userData);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const updateUserDataInApp = useStore((state) => state.updateUserDataInApp);
  const fetchCategories = useStore((state) => state.fetchCategories)
  const updateCategories = useStore((state) => state.updateCategories)
  const updateTasks = useStore((state) => state.updateTasks)
  const taskStatuses = useStore((state) => state.taskStatuses);
  const fetchUserData = useStore((state) => state.fetchUserData);
  //const [categories, setCategories] = useState(null);
  //const [tasks, setTasks] = useState(null);
  //const [userData, setUserData] = useState(null);
  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(null);
  //const [taskStatuses, setTaskStatuses] = useState({});
  const getToken = () => localStorage.getItem('access_token');
  const [token, setToken] = useState(() => getToken());
  
  useEffect(() => {
    document.title = "ToDo";
  }, []);

  //const updateUserDataInApp = (updatedUserData) => {
  //  setUserData(updatedUserData);
  //};
  updateUserDataInApp()

  const saveToken = (token) => {
    localStorage.setItem('access_token', token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem('access_token');
  }

  useEffect(() => {
    
    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    
    if (token) {
      fetchCategories();
    }
  }, [token]);

  updateCategories()

  //const updateCategories = async () => {
  //  try {
  //   const response = await categoriesNobaseApi()
  //    setCategories(response);
  //  } catch (error) {
  //    console.error("Ошибка при обновлении категорий:", error);
  //  }
  //};

  //const updateTasks = async () => {
  //  try {
  //    const response = await updateTasksApi()
  //    setTasks(response);
  //  } catch (error) {
  //    console.error("Ошибка при обновлении задач:", error);
  //  }
  //};
  updateTasks()

  const AuthRedirect = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const storedToken = getToken();
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false);
    }, [setToken])

    useEffect(() => {
      if (!loading) {
        if (token) {
          navigate("/content");
        } else {
          navigate("/login");
        }
      }
    }, [navigate, token, loading]);
    return null;
  };

  return (
    <div className={s.wrapper}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<Login saveToken={saveToken}/>} />
          <Route path="/registration" element={<Registration saveToken={saveToken} />}/>
          <Route path="/content" element={<Content token={token} removeToken={removeToken}
            updateCategories={updateCategories} categories={categories} userData={userData} getToken={getToken}
            isLoading={isLoading} error={error} updateUserDataInApp={updateUserDataInApp}/>}>
            <Route index element={<Calendar />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;