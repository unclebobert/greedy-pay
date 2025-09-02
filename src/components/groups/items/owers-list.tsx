

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Group } from '@/db';
import { useEffect, useState } from 'react';

export function OwersList({ group, owees, owers, setOwers }: {
  group: Group,
  owees: Record<string, number>,
  owers: Record<string, number>,
  setOwers: (newOwers: Record<string, number>) => void,
}) {

  const [splitAll, setSplitAll] = useState(() => {
    const owersAmounts = Object.values(owers)
    // If nobody is splitting yet, assume user wants to split all evenly
    if (owersAmounts.length === 0) return true
    // If not all people are splitting, user does not want to split evenly
    if (owersAmounts.length !== group.members.length) return false
    const first = owersAmounts[0]
    for (const amount of owersAmounts) {
      // If any member owes more for this item than any other member,
      // user does not want to split evenly
      if (first !== amount) return false
    }
    return true
  })

  
  // Ensure that the ower splitting is kept up to date when things are changed
  useEffect(() => {
    const oweeAmounts = Object.values(owees)
    const total = oweeAmounts.length > 0 ?
      oweeAmounts.reduce((acc, curr) => acc + curr) :
      0
    if (splitAll) {
      const avg = total / group.members.length
      setOwers(Object.fromEntries(group.members.map(member => [member, avg])))
    }
    // Uneven splitting & leaving people out WIP
  }, [group, owees, setOwers, splitAll])

  return (
    <div className="flex items-center gap-3">
      <Label>Split among everyone equally</Label>
      <Checkbox checked={splitAll} onClick={() => setSplitAll(!splitAll)} />
    </div>
  )
}