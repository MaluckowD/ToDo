import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import s from "./App.module.css";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Calendar from "./components/Content/Main/Calendar/Calendar";
import Profile from "./components/Content/Main/Profile/Profile";
import useStore from "./store/useToDoStore.js";
function App() {

  const fetchUserData = useStore((state) => state.fetchUserData);
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  
  useEffect(() => {
    document.title = "ToDo";
  }, []);

  fetchUserData();
  
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
          <Route path="/" element={<AuthRedirect/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/content" element={<Content/>}>
            <Route index element={<Calendar />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;