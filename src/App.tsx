import { Home, Login, Page404 } from "./pages"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import { PrivateRouter } from "./components"
import CreateUser from "./pages/CreateUser"

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route element={ <PrivateRouter /> }>
            <Route path='/' element={ <Home />} />
          </Route>
          <Route path='/login' element={ <Login/> } />
          <Route path='/create-user' element={ <CreateUser/> } />
          <Route path='*' element={ <Page404 /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
