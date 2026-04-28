import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const FilterCard = () => {

  const filterData = [
    {
      filterType: "Location",
      array: ["Mumbai","Pune","Hyderabad","Chennai","Delhi"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer","Backend Developer","FullStack Developer","Data Science"]
    },
    {
      filterType: "Salary",
      array: ["0 - 40k","41 - 1lakh","1lakh - 5lakhs"]
    }
  ]
  return (
    <div className='w-full bg-white p-3 rounded-mid'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div key={index} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item}/>
                        <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
