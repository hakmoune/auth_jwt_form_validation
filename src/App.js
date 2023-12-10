import Register from './component/register/Register'
import Login from './component/login/login';
import Home from './component/home/Home';
import RequireAuth from './component/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Contact from './component/contact/Contact';
import NotFound from './component/404/NotFound';
import Unauthorized from './component/Unauthorized/Unauthorized';
import Users from './component/users/Users';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} /> {/** Index: defaul page or home page */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='users' element={<Users />} />
        </Route>

        <Route element={<RequireAuth />}>
          {/** Routes that require authentication */}
          <Route path='contact' element={<Contact />} />
        </Route>

        {/* This route with path='*' will render the NotFound component for any URL that hasn't been matched by previous routes. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
