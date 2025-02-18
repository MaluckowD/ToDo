import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from './store/useToDoStore'; // Убедись, что путь правильный

const AuthRedirect = () => {
  const token = useTaskStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Если нет токена, перенаправляем на страницу входа
      navigate('/login');
    } else {
      // Если есть токен, перенаправляем на страницу контента
      navigate('/content');
    }
  }, [token, navigate]);

  return null; // Этот компонент ничего не отображает
};

export default AuthRedirect;