import { Home, Login, Page404 } from './pages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import { Movements, PrivateRouter } from './components'
import { CreateUser, History, Dashboard, Transfers } from './pages/'

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route element={ <PrivateRouter /> }>
            <Route path='/' element={ <Home />} />
            <Route path='/history' element={ <History />} />
            <Route path='/dashboard' element={ <Dashboard />} />
            <Route path='/movements' element={ <Movements />} />
            <Route path='/transfers' element={ <Transfers />} />
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
