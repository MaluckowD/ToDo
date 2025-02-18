import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import s from "./App.module.css";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Calendar from "./components/Content/Main/Calendar/Calendar";
import Profile from "./components/Content/Main/Profile/Profile";
import { getDataApi, categoriesNobaseApi, updateTasksApi } from "./api/api.ts"
import useStore from "./store/useToDoStore.js";
function App(props) {
  const [categories, setCategories] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskStatuses, setTaskStatuses] = useState({});
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  const removeToken = useStore((state) => state.removeToken);
  useEffect(() => {
    document.title = "ToDo";
  }, []);

  const saveToken = (token) => {
    localStorage.setItem('access_token', token);
    setToken(token);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await getDataApi()
        setUserData(response);
        setCategories(response.categories);
        setTasks(response.tasks);
        if (response.tasks) {
          const initialTaskStatuses = {};
          response.tasks.forEach(task => {
            initialTaskStatuses[task.id] = {
              completed: task.completed,
              statusId: task.id,
            };
          });
          setTaskStatuses(initialTaskStatuses)
        }
      } catch (error) {
        setError(error);
        removeToken()
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
        const response = await categoriesNobaseApi()
        setCategories(response)
      } catch (error) {
        setError(error);
        console.error("Ошибка при загрузке данных пользователя:", error); //////////
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
      const response = await categoriesNobaseApi()
      setCategories(response);
    } catch (error) {
      console.error("Ошибка при обновлении категорий:", error);
    }
  };

  const updateTasks = async () => {
    try {
      const response = await updateTasksApi()
      setTasks(response);
    } catch (error) {
      console.error("Ошибка при обновлении задач:", error);
    }
  };

  const AuthRedirect = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const storedToken = token;
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
          <Route path="/registration" element={<Registration saveToken={saveToken} />} />
          <Route path="/content" element={<Content setTaskStatuses={setTaskStatuses} taskStatuses={taskStatuses} removeToken={removeToken}
            updateTasks={updateTasks} tasks={tasks} updateCategories={updateCategories} categories={categories} userData={userData}
            isLoading={isLoading} error={error}  />}>
            <Route index element={<Calendar />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;