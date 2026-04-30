import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <Input className='w-fit' placeholder='Filter by name'/>
            <Button onClick={() => navigate("/admin/companies/create")} className="bg-black text-white px-2 py-1 rounded-md mr-2 hover:bg-'black'">New Comapany</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
