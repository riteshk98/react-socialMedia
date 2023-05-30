import { Loader, Navbar } from './';
import { Home, Login, Register, Settings, UserProfile } from '../pages';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UseAuth } from '../hooks';

const PrivateRoute = ({ children }) => {
  const auth = UseAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = UseAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
