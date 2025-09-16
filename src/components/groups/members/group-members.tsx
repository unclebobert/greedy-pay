import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { AddMemberButton } from './add-member-btn';

import type { Group } from '@/db';
import { formatPayments } from '@/lib/utils';

export function GroupMembers({ group }: { group: Group }) {
  const members = group.members
  console.log(members)
  const transactions = group.minimisedTransactions()
  return (
    <>
      <div className='flex mb-2 gap-2 items-end'>
        <h2 className='text-2xl font-semibold'>Members</h2>
        <AddMemberButton group={group} className='size-6 ml-4' />
      </div>
      <Table>
        <TableBody className='b-0'>
          {members.map(member => (
            <TableRow key={member + group.id}>
              <TableCell className='bg-accent/50' >
              </TableCell>
              <TableCell className='bg-accent/50' >
              </TableCell>
              <TableCell className='bg-accent/50' >{member}</TableCell>
              <TableCell>{formatPayments(transactions[member])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}