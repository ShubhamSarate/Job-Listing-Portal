import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const {loading} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);  
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false));  
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-1/2 border border-gay-200 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">Login</h1>
            <div className="my-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="********"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroup className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Input
                    type="radio"
                    name="role"
                    value="employee"
                    checked={input.role === "employee"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="option-one">Employee</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="option-two">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            {
              loading ? <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-[white]"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait</Button>
              : <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-[white]"> Login </Button>
            }
            <span className="text-sm">
              Don't have any account?{" "}
              <Link to="/Signup" className="text-blue-600">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
