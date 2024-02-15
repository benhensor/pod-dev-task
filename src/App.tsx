import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UserPage from './pages/UserPage'



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;