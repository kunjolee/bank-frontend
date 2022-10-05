import { Navigate, Outlet } from "react-router-dom"

const auth = {
  ok: false,
}

interface Props {
  children: JSX.Element
}

const PrivateRouter = ({ children }: Props ) => {

  return auth ? (
    children
  ) : (
    <Navigate to='/login' />
  )
}
export default PrivateRouter