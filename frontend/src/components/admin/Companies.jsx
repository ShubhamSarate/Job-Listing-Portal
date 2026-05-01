import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  },[input]);
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <Input onChange={(e)=>setInput(e.target.value)} className='w-fit' placeholder='Filter by name'/>
            <Button onClick={() => navigate("/admin/companies/create")} className="bg-black text-white px-2 py-1 rounded-md mr-2 hover:bg-'black'">New Comapany</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
