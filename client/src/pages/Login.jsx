import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Link } from "react-router-dom";
import { Button } from "../components";

const validationSchema = yup.object({
  email : yup.string().required('* email is required').email('Invalid email format'),
  password : yup.string().required('*password is required'),
}).required();

const Login = () => {
  const { register, handleSubmit, formState : {errors} } = useForm({
    resolver : yupResolver(validationSchema),
    defaultValues : {
      email : '',
      password : ''
    }
  })

  const onSubmit = (data) => console.log(data)
   return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <h3>Login</h3>
          <p>
            Dont have an account?{" "}
            <Link
              to="/register"
              className="text-black fw-bold text-decoration-none"
            >
              Sign In
            </Link>
          </p>
        </div>
        <form className="w-25" onSubmit={ handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              placeholder="abc@gmail.com"
              autoComplete="off"
              {...register('email')}
            />
            { errors.email && <span className="text-danger" style={{ fontSize : '13px'}}>{errors.email.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              autoComplete="off"
              {...register('password')}
            />
            { errors.password && <span className="text-danger" style={{ fontSize : '13px'}}>{errors.password.message}</span>}
          </div>

          <div className="d-grid gap-2 col-12 mx-auto">
            <Button title="Login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
