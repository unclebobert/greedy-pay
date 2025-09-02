import type { Group } from '@/db';
import { GroupOverview } from './overview/group-overview';
import { GroupMembers } from './members/group-members';

export function GroupView({ group }: { group: Group }) {
  return (
    <>
      <GroupOverview group={group} />
      <hr className='my-2' />
      <GroupMembers group={group} />
    </>
  )
}