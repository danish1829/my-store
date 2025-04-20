import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './component/Layout'
import Body from './component/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import './App.css';
import Shopping from './component/Shopping'
import ClothView from './component/ClothView'
import WishList from './component/WishList'
import Profile from './component/Profile'

function App() {
  return (
    <Provider store = { appStore }>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element = { <Body /> }/>
            <Route path='/shopping' element = { <Shopping /> }/>
            <Route path='/cloth/view/:_id' element = { <ClothView /> }/>
            <Route path='/user/wishlist' element = { <WishList /> }/>
            <Route path='/user/profile' element = { <Profile /> }/>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
