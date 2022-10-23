import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../store"

const PrivateRouter = ( ) => {

  const { auth } = useAppSelector((state)=> state.auth);

  const localAuth = auth?.ok && localStorage.getItem('bootcam-token');

  return localAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  )
}

export default PrivateRouter;