import Cookies from 'js-cookie';
import { useAppDispatch } from '../store/hooks';
import { setLogout } from '../store/slices/auth';
const Home = () => {

  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>You should join here</h1>
      <button onClick={() => {
        dispatch(setLogout({
          ok: false,
          token: '',
          msg: 'Logged out successfully'
        }));

        Cookies.remove('token');
      }}>Logout</button>
    </div>
  )
}
export default Home;