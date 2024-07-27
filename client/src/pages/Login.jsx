import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { loginPostRequest } from '../api/auth';
import { toast } from 'react-hot-toast';
import { useAuth } from "../contexts/AuthContext";

const validationSchema = yup.object({
  email: yup.string().required('* email is required').email('Invalid email format'),
  password: yup.string().required('*password is required'),
}).required();

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const navigate = useNavigate();
  const { setAuthInfo } = useAuth();

  const onSubmit = async (data) => {
    try {
      const result = await loginPostRequest(data);

      if (result.status === 200) {
        toast.success(`${result.data.message}`);
        setAuthInfo(result.data);

        if (result.data.user.role === 'user') {
          return navigate('/vehicles');

        } else if (result.data.user.role === 'admin') {
           navigate('/admin-panel/dashboard/dashboard');

        } else {
          console.log('error role');
        }

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
        <form className="col-sm-2" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.email && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.email.message}</span>}
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
            {errors.password && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.password.message}</span>}
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