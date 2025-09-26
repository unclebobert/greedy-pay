import { AddItemButton } from './add-item-btn';

import type { Group } from '@/db';
import { ItemsTable } from './items-table';

export function GroupItems({ group }: { group: Group }) {
  return (
    <>
      <div className='flex gap-2 items-end'>
        <h2 className='text-2xl font-semibold'>Items</h2>
        <AddItemButton group={group} className='size-6 ml-4' />
      </div>
      <div className='text-sm text-muted-foreground mb-2'>{group.items.length} items</div>
      <ItemsTable group={group} />
    </>
  )
}