import { useSelector } from 'react-redux';

export function useSignedInCheck() {
  const isSignedIn = useSelector((state) => { return !!state.auth.accessToken; });

  return {
    isSignedIn,
  };
}
