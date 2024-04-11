import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { registerPostRequest } from "../api/auth";
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  fullname: yup.string().required('* fullname is required'),
  email: yup.string().required('* email is required').email('Invalid email format'),
  password: yup.string().required('*password is required'),
  confirmPassword: yup.string().required('* password do not match')
}).required()

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const result = await registerPostRequest(data);

      if (result.status === 201) {
        toast.success(`${result.data.message}`);
        navigate('/login');

      } else {
        toast.error(`${result.data.error}`)
      }

    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <h3>Sign Up</h3>
          <p>
            Already have an account?{" "}
            <Link className="text-black fw-bold text-decoration-none" to="/login">
              Login
            </Link>
          </p>
        </div>
        <form className="w-25" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">
              <b>Fullname</b>
            </label>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Fullname"
              autoComplete="off"
              {...register('fullname')}
            />
            {errors.fullname && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.fullname.message}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              placeholder="Email"
              autoComplete="off"
              {...register('email')}
            />
            {errors.email && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.email.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Password"
              autoComplete="off"
              {...register('password')}
            />
            {errors.password && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.password.message}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Confirm Password"
              autoComplete="off"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.confirmPassword.message}</span>}
          </div>

          <div className="d-grid gap-2 col-12 mx-auto">
            <Button title="Register" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
