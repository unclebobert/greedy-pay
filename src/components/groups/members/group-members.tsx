import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { AddMemberButton } from './add-member-btn';
import { EditMemberButton } from './edit-member-btn';

import type { Group } from '@/db';
import { formatPayments } from '@/lib/utils';
import { DeleteMemberButton } from './delete-member-btn';

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
          {members.length > 0 ?
            members.map(member => (
              <TableRow key={member + group.id}>
                <TableCell className='bg-accent/50' colSpan={0}>
                  <div className='flex pl-2 gap-3 items-center'>
                    <EditMemberButton group={group} member={member} className='size-5' />
                    <DeleteMemberButton group={group} member={member} className='size-5' />
                    <span className='ml-auto'>
                      {member}
                    </span>
                  </div>
                </TableCell>
                <TableCell colSpan={1}>{formatPayments(transactions[member])}</TableCell>
              </TableRow>
            )) :
            <TableRow>
              <TableCell className="h-24 text-center">
                This group currently has no members.
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </>
  )
}