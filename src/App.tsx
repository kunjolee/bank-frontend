import { Login, Page404 } from "./pages"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import { PrivateRouter } from "./components"

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path='/' element={
              <PrivateRouter>
                <Page404 />
              </PrivateRouter>              
            } 
          />
          <Route path='login' element={ <Login/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
