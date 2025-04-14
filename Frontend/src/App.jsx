import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Signup from './component/Signup';
import Body from './component/Body';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element = { <Body /> }/>
            <Route path="login" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
