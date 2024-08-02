import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../interfaces/User";
import { schemaLogin, schemaRegister } from "../../utils/authSchema";
import instance from "../../api";

type Props = {
  isRegister?: boolean;
};

const AuthForm = ({ isRegister }: Props) => {
  const nav = useNavigate();
  const { login: contextLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(isRegister ? schemaRegister : schemaLogin),
  });

  const onSubmit = async (user: User) => {
    try {
      if (isRegister) {
        const { data } = await instance.post("/auth/register", {
          email: user.email,
          password: user.password,
        });
        alert(`Register success with email: ${data.data.email}`);
        nav("/login");
      } else {
        const { data } = await instance.post("/auth/login", user);
        contextLogin(data.token, data.user);
        nav(data.user.role === "admin" ? "/admin" : "/");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold mb-4">
          {isRegister ? "Register" : "Login"}
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {isRegister && (
          <div className="mb-4">
            <label
              htmlFor="confirmPass"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              {...register("confirmPass")}
            />
            {errors.confirmPass && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPass.message}
              </p>
            )}
          </div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
