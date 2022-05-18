import React, { useEffect } from "react";
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Components/SocialLogin";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";

const Register = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [
    createUserWithEmailAndPassword,
    emailUser,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(user || emailUser)

  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data, e) => {
    const name = data.name;
        const email = data.email;
        const password = data.password;

        await createUserWithEmailAndPassword(email,password);
        await updateProfile({ displayName: name });
        e.target.reset()
  };

  if(error){
    console.log(error);
  }

useEffect(()=>{
  if (token) {
    navigate(from,{ replace: true });
  }
},[token,from,navigate])

  return (
    <div className="min-h-screen grid items-center">
      <div className="max-w-md w-full mx-auto flex flex-col justify-center">
        <form
          className="flex flex-col justify-center items-center space-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              type="name"
              {...register("name")}
              placeholder="Enter Name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
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
              <button className="label-text font-medium text-accent">
                Forgot password?
              </button>
            </label>
          </div>
          <input
            type="submit"
            className="bg-primary w-full max-w-xs py-2 text-base-100 font-semibold rounded cursor-pointer"
            value="Register"
          />
          <p className="">
            <small>
              Already have an account?{" "}
              <Link className="text-accent" to="/login">
                Login
              </Link>
            </small>
          </p>
        </form>

        <div className="divider">OR</div>
        <div className="w-full flex flex-col justify-center items-center">
          
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
