import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './features/users/Signup';
import Login from './features/users/Login';
import Chat from './features/chat/Chat.tsx';

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    {!isAuthenticated ? (
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </>
    ) : (
      <>
        <Route path="/" element={<Chat />} />
      </>
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;