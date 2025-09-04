import { AddMemberButton } from './add-member-btn';

import type { Group } from '@/db';
import { formatPayments } from '@/lib/utils';

export function GroupMembers({ group }: { group: Group }) {
  const transactions = group.minimisedTransactions()
  return (
    <>
      <div className='flex mb-2 gap-2 items-end'>
        <h2 className='text-2xl font-semibold'>Members</h2>
        <AddMemberButton group={group} className='size-6 ml-4' />
      </div>
      <ul>
        {Object.entries(transactions).map(([member, payees]) => (
          <li key={member + group.id}>
            {member}: {formatPayments(payees)}
          </li>
        ))}
      </ul>
    </>
  )
}