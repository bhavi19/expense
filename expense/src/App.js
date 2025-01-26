
import ErrorBoundary from './ErrorBoundary';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout';
import { Routes, BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            {/* <Route path="shop" element={<Shop />}></Route>
            <Route path="contact" element={<Contact />}></Route> */}
            {/* <Route path="*" element={<Contact />}></Route> */}
          </Routes>
        </BrowserRouter>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
