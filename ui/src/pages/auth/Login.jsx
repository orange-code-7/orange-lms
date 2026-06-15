import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLoading, setUser, setError } from "@/app/store/slices/authSlice";

import AuthService from "@/services/modules/auth.service";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    try {
      const response = await AuthService.login(form);
      const token = response.data.access_token;

      localStorage.setItem("access_token", token);

      const user = await AuthService.me();
      AuthService.saveSession(token, user);

      dispatch(
        setUser({
          user,
          token,
        }),
      );

      navigate("/dashboard");
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-center">Orange LMS</h1>

      <p className="text-sm text-center text-[var(--color-text-muted)] mb-8">
        Login to continue
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm">Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded border border-[var(--color-border)] bg-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded border border-[var(--color-border)] bg-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-orange-500 text-white font-medium hover:bg-orange-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default Login;
