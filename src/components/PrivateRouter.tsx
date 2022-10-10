import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../store"

const PrivateRouter = ( ) => {

  const { auth } = useAppSelector((state)=> state.auth)

  return auth?.ok ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  )
}
export default PrivateRouter