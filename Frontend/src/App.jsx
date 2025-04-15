import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './component/Layout'
import Body from './component/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import './App.css';
import Shopping from './component/Shopping'
import ClothView from './component/ClothView'

function App() {
  return (
    <Provider store = { appStore }>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element = { <Body /> }/>
            <Route path='/shopping' element = { <Shopping /> }/>
            <Route path='/cloth/view/:_id' element = { <ClothView /> }/>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
