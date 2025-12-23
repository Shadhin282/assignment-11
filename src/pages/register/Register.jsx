import React from 'react';
import { Trophy, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from '../../authentication/context/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { imageUpload, saveOrUpdateUser } from '../../utils';



const Register = () => {

      const { registerUser, updateUserProfile, setUser,user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { email, name, password, photo: image } = data
    const imageFile = image[0]
    

    try {
     
      const imageURL = await imageUpload(imageFile)

      //1. User Registration
      const result = await registerUser(email, password).then(res => {
        setUser({...res.user, displayName: name,
          photoURL: imageURL})
      })

      await saveOrUpdateUser({ name, email, image: imageURL })

      // 2. Generate image url from selected file

      //3. Save username & profile photo
      await updateUserProfile(name, imageURL)

      navigate(from, { replace: true })
      toast.success('Signup Successful')

      console.log(result)
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }



  // const onSubmit = (data) => {
  //   // console.log(data.email,data.name,data.photo,data.role)
  //   const { email, name, password, role, photo } = data;
  //   const photoUpload = photo[0];

  //   registerUser(email, password).then((result) => {
  //     const userInfo = result.user;
  //     console.log(userInfo)
  //     const formData = new FormData();
  //     formData.append("image", photoUpload);

  //     const image_api_url = `https://api.imgbb.com/1/upload?key=${
  //       import.meta.env.VITE_image_host
  //     }`;

  //     axios.post(image_api_url, formData).then((res) => {
  //       console.log("After Image Upload: ", res.data);

  //       const userProfile = {
  //         displayName: name,
  //         photoURL: res.data.data.url,
  //       };
        
  //       updateUserProfile(userProfile)
  //         .then(() => {
  //           setUser({
  //             ...userInfo,
  //             displayName: name,
  //             photoURL: photo,
  //             role: role,
  //           });
  //           toast.success("successfully create account");
  //           navigate(`${location.state ? location.state : "/home"}`);
  //         })
  //         .catch((err) => {
  //           toast.error(err);
  //         });
  //     });
  //   });
  // };

  console.log(user)
    return <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-purple-500/10 blur-3xl rounded-full"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link
          to="/"
          className="flex justify-center items-center gap-2 mb-8 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            ContestHub
          </span>
        </Link>

        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900 py-8 px-4 shadow-2xl border border-slate-800 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 text-center">
            {error}
          </div>} */}

            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register("name", {
                required: "Name is required",
              })}
              error={errors.name?.message}
            />

            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password?.message}
            />

            {/* <Select
              label="I want to..."
              options={[
                {
                  value: "user",
                  label: "Participate in Contests",
                },
                {
                  value: "creator",
                  label: "Create & Manage Contests",
                },
                {
                  value: "admin",
                  label: "Manage User & Contest"
                }
              ]}
              {...register("role")}
            /> */}

            <Input
              label="Profile Photo "
              className="file:bg-black/10 file:text-gray-500"
              type="file"
              placeholder=""
              {...register("photo")}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
};

export default Register;