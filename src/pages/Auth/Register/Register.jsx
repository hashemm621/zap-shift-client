import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const handleRegister = data => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {

        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the url
        const imgApiURL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(imgApiURL, formData).then(res => {
          const photoURL = res.data.data.url

          // create user in database 
          const userInfo = {
            email: data.email,
            displayName:data.name,
            photoURL:photoURL
          }
          axiosSecure.post('/users', userInfo).then(res=>{
            if(res.data.insertedId){
              console.log('user Created in dataBase');
            }
          })
          // 3. update the profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location?.state || '/')
            })
            .catch(err => console.log(err));
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
      <p className="text-center">Please Register</p>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="card-body">
        <fieldset className="fieldset">
          {/* name field*/}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Enter your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* photo field*/}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Image"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          {/* email field*/}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* password field*/}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password is must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character.
            </p>
          )}

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
          state={location.state}
            className="text-blue-400 underline"
            to="/login">
            Login
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
