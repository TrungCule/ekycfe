// useAuth.ts
import { useAppSelector } from '../store/hook';

const useAuth = () => {
  const userInfo = useAppSelector((state) => state.auth);
  console.log(userInfo);
  return { userInfo };
};

export default useAuth;
