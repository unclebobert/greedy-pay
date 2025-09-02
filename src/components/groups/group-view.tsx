import type { Group } from '@/db';
import { GroupOverview } from './overview/group-overview';
import { GroupMembers } from './members/group-members';
import { GroupItems } from './items/group-items';

export function GroupView({ group }: { group: Group }) {
  return (
    <>
      <GroupOverview group={group} />
      <hr className='my-2' />
      <GroupMembers group={group} />
      <hr className='my-2' />
      <GroupItems group={group} />
    </>
  )
}