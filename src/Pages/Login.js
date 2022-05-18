import React, { useEffect } from "react";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Components/SocialLogin";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";

const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [
    signInWithEmailAndPassword,
    emailUser,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || emailUser)

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    signInWithEmailAndPassword(email,password)
  };

 useEffect(()=>{
  if (token) {
    navigate(from,{ replace: true });
  }
 },[token, from, navigate, user])

  return (
    <div className="min-h-[75vh] grid items-center">
      <div className="max-w-md w-full mx-auto flex flex-col justify-center">
      <form
        className="flex flex-col justify-center items-center space-y-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter Password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <label className="label">
            <button className="label-text font-medium text-accent">Forgot password?</button>
          </label>
        </div>
        <input type="submit" className="bg-primary w-full max-w-xs py-2 text-base-100 font-semibold rounded cursor-pointer" value='Login'/>
        <p className=""><small>Don't have an account? <Link className="text-accent" to='/register'>Create Account</Link></small></p>
      </form>

      <div className="divider">OR</div>
      <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
