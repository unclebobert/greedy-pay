

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Group } from '@/db';

export function OwersList({ group, owers, setOwers }: {
  group: Group,
  owers: string[] | undefined,
  setOwers: (newOwers: string[] | undefined) => void,
}) {
  return (
    <>
      <div className='flex items-center gap-3'>
        <Label>Split among everyone equally</Label>
        <Checkbox checked={!owers}
          onClick={() => setOwers(owers ? undefined : group.members)}
        />
      </div>
      {owers && (
        <>
          <Label>Choose who to split among:</Label>
            {group.members.map(m => (
              <div key={m + 'cb'} className='flex items-center gap-3 ml-4'>
                <Checkbox checked={owers.includes(m)}
                  onClick={() => {
                    if (owers.includes(m)) {
                      setOwers(owers.filter(o => o !== m))
                    } else {
                      setOwers([...owers, m])
                    }
                  }}
                />
                <Label>{m}</Label>
              </div>
            ))}
        </>
      )}
    </>
  )
}