import { AddItemButton } from './add-item-btn';

import type { Group } from '@/db';
import { ItemsTable } from './items-table';

export function GroupItems({ group }: { group: Group }) {
  return (
    <>
      <div className='flex mb-2 gap-2 items-end'>
        <h2 className='text-2xl font-semibold'>Items</h2>
        <AddItemButton group={group} className='size-6 ml-4' />
      </div>
      <ItemsTable group={group} />
    </>
  )
}