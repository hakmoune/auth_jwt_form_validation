import Register from './component/register/Register'
import Login from './component/login/login';
import Home from './component/home/Home';
import RequireAuth from './component/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Contact from './component/contact/Contact';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} /> {/** Index: defaul page or home page */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* This route with path='*' will render the RequireAuth component for any URL that hasn't been matched by previous routes. */}
        <Route path='*' element={<RequireAuth />}>
          {/** Routes that require authentication */}
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
