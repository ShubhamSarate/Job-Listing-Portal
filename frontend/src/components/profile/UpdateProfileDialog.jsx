import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null,
  });

  // sync redux → local state
  useEffect(() => {
    if (user) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
      });
    }
  }, [user]);

  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);

      //IMPORTANT: clean skills
      formData.append(
        "skills",
        input.skills.split(",").map((s) => s.trim()).join(",")
      );

      if (input.file) {
        formData.append("file", input.file);
      }

      console.log("SENDING REQUEST...");

      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true, // ONLY THIS IS NEEDED
        }
      );

      console.log("RESPONSE:", res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
    Update your personal details like name, bio, skills, and profile file.
  </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">

            <Input name="fullname" value={input.fullname} onChange={changeHandler} />
            <Input name="email" value={input.email} onChange={changeHandler} />
            <Input name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} />
            <Input name="bio" value={input.bio} onChange={changeHandler} placeholder="Bio" />
            <Label>(comma separated)</Label>
            <Input name="skills" value={input.skills} onChange={changeHandler} placeholder="Skills" />

            <Input type="file" accept="application/pdf" onChange={fileHandler} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white transition-colors">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;