import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const { Companies } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = Companies.find((company)=> company.name.toLowerCase() === value);
    setInput({...input,companyId: selectedCompany._id});
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate('/admin/jobs');
        }
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Job Title"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Job Description"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.Requirements}
                onChange={changeEventHandler}
                placeholder="Job requirements"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="LPA"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Job Location"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job-type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full/Part-Time"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="No. of Experience"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Positions"
                className="focus-visible:ring-offset-0 focus-visible-:ring-0 my-1"
              />
            </div>
            {
            Companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a Company'/>
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        <SelectGroup>
                            {
                                Companies.map((company) => {
                                    return (
                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                    )
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )
            }
          </div>
          {
            loading ? <Button className="w-full my-4 hover:bg-'black' bg-black text-white px-2 py-1 rounded-md mr-2"><Loader2 className="bg-black text-white px-2 py-1 rounded-md mr-2 hover:bg-'black' mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>
             : <Button type="submit" className="w-full my-4 bg-black text-white px-2 py-1 rounded-md mr-2 hover:bg-'black'">Post New Job</Button>
          }
          {
            Companies.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3">Please register a company first before posting the jobs</p>
          }
        </form>
      </div>
    </div>
  );
};

export default PostJob;
