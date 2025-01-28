
import ErrorBoundary from './ErrorBoundary';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import LoginPage from './Pages/Signin/Signin';
import RegisterPage from './Pages/Register/Register';

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
