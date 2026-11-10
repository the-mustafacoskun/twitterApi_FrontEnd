import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api, { setAuth } from "../data/api";

function LogIn({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const submitFn = async (data) => {
    setServerError("");
    try {
      const response = await api.post("/auth/login", data);
      setAuth(data.username, data.password); // önce kimlik bilgisini tanıt
      onLogin(response.data);                // sonra kullanıcıyı App'e ilet
      navigate("/");                         // en son yönlendir
    } catch (err) {
      if (err.response) {
        setServerError(err.response.data?.message || "Giriş başarısız");
      } else {
        setServerError("Sunucuya ulaşılamıyor");
      }
    }
  };

  return (
    <form
      className="max-w-xl mx-auto flex flex-col gap-8"
      onSubmit={handleSubmit(submitFn)}
    >
      <h1 className="font-bold text-2xl">GİRİŞ YAP</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="userName1">Kullanıcı Adı</label>
        <input
          type="text"
          id="userName1"
          autoComplete="username"
          className="border border-gray-200 bg-blue-50 p-4 h-8 rounded-2xl"
          {...register("username", { required: "Kullanıcı adı zorunlu" })}
        />
        {errors.username && (
          <p className="text-red-600 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password1">Şifre</label>
        <input
          type="password"
          id="password1"
          autoComplete="current-password"
          className="border border-gray-200 bg-blue-50 p-4 h-8 rounded-2xl"
          {...register("password", { required: "Şifre zorunlu" })}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="border border-blue-400 py-3 px-6 rounded-2xl bg-blue-300 hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
        <Link to="/register" className="text-blue-600 hover:underline">
          Hesabın yok mu? Kayıt ol
        </Link>
      </div>
    </form>
  );
}

export default LogIn;