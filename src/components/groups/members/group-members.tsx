import { AddMemberButton } from './add-member-btn';

import type { Group } from '@/db';
import { groupBalances } from '@/lib/utils';

export function GroupMembers({ group }: { group: Group }) {
  const balances = groupBalances(group)
  return (
    <>
      <div className='flex mb-2 gap-2 items-end'>
        <h2 className='text-2xl font-semibold'>Members</h2>
        <AddMemberButton group={group} className='size-6 ml-4' />
      </div>
      <ul>
        {Object.entries(balances).map(([member, balance]) => (
          <li key={member + group.id}>
            {member}: {balance}
          </li>
        ))}
      </ul>
    </>
  )
}