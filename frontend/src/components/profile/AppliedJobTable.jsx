import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of your Apllied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>23-12-2002</TableCell>
                        <TableCell>Frontend Developer</TableCell>
                        <TableCell>Amazon</TableCell>
                        <TableCell>Pending</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
