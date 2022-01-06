import { Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello world!</h1>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
}
