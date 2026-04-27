import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "gkhherkgherjg";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">3 days ago</p>
        <Button variant="outline" className="rounded-full border-gray-300" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 border-gray-300" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://imgs.search.brave.com/vzTwqIj9dMe2gwibFPpaTl8-npWMJcyvJkOsYmMNbPM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2VlMGNl/NTA4LTdmODgtNDYy/MS05ZWU0LWQzZTNi/MTA1YjQ1MC9CTVdM/T0dPc21hbGwucG5n" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In ipsum
          tempore voluptatum maior similique eaque earum!
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="outline">
          12 Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="outline">
          Part Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="outline">
          12 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${jobId}`)} variant='outline' className='border-gray-400'>Details</Button>
        <Button className='bg-[#7209b7] text-[white] hover:bg-[#5b30a6]'>Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
