import axios from "axios";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  const submitFn=(data)=>{
    axios.post("http://localhost:9000/twitter/auth/register", data) 
      .then((response) => {
        console.log("Kayıt başarılı:", response.data);
      })
      .catch((error) => {
        console.error("Kayıt sırasında hata oluştu:", error);
      });
  }
  return (
    <form className="max-w-xl mx-auto flex flex-col gap-8" onSubmit={handleSubmit((data)=>submitFn(data))}>
      <h1 className="font-bold text-2xl">SIGN UP</h1>
      <div className="flex flex-col gap-2  ">
        <label htmlFor="firstName">First Name </label>
        <input
          type="text"
          id="firstName"
          className="border p-4 bg-blue-50 border-gray-200 h-8 rounded-2xl "
          {...register("firstName")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName">Last Name </label>
        <input
          type="text"
          id="lastName"
          className="border p-4 bg-blue-50 border-gray-200 h-8 rounded-2xl "
          {...register("lastName")}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="userName">User Name </label>
        <input
          type="text"
          id="userName"
          className="border p-4 bg-blue-50 border-gray-200 h-8 rounded-2xl "
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="border p-4 bg-blue-50 border-gray-200 h-8 rounded-2xl "
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border p-4 bg-blue-50 border-gray-200 h-8 rounded-2xl "
          {...register("password")}
        />
      </div>
      <div>
        <button className="border border-blue-400 text-m py-3 px-6 rounded-2xl bg-blue-300 hover:bg-blue-600">
          Sign Up
        </button>
      </div>
    </form>
  );
}
