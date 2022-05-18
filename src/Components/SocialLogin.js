import React, { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';

const SocialLogin = () => {
    const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
    
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [token] = useToken(gUser)

  useEffect(()=>{
    if (token) {
      navigate(from,{ replace: true });
    }
   },[token, from, navigate])

    return (
        <><p className="mb-4 text-center text-sm">Continue With</p>
        <button className="bg-primary w-full max-w-xs mx-auto py-2 text-base-100 font-semibold rounded" onClick={() => signInWithGoogle()}>Google</button></>
    );
};

export default SocialLogin;