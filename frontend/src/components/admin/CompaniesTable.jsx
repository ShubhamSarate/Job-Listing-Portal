import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableCell>
                <Avatar>
                    <AvatarImage src="https://imgs.search.brave.com/vzTwqIj9dMe2gwibFPpaTl8-npWMJcyvJkOsYmMNbPM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2VlMGNl/NTA4LTdmODgtNDYy/MS05ZWU0LWQzZTNi/MTA1YjQ1MC9CTVdM/T0dPc21hbGwucG5n" />
                </Avatar>
            </TableCell>
            <TableCell>
                Company Name
            </TableCell>
            <TableCell>
                23-12-2026
            </TableCell>
            <TableCell className='text-right'>
                <Popover>
                    <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                    <PopoverContent className='w-32'>
                        <div className='flex items-center gap-2 w-fit cursor-pointer'>
                            <Edit2/>
                            <span>Edit</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
