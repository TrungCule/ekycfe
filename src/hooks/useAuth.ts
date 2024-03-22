// useAuth.ts
import { useAppSelector } from '../store/hook';

const useAuth = () => {
  const userInfo = useAppSelector((state) => state.auth);
  return { userInfo };
};

export default useAuth;