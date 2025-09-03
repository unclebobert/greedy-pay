

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Group, Item } from '@/db';
import { useEffect, useState } from 'react';

function getAllRemainders(group: Group, item: Item) {
  const remainders = Object.fromEntries(group.members.map(m => [m, 0]))
  for (const [_, itemRemainders] of Object.entries(group.remainders)
    .filter(([itemName]) => itemName !== item.name) // only count other items
  ) {
    console.log(`adding remainders from item ${_}: ${itemRemainders}`)
    for (const m in itemRemainders) {
      console.log(`${m} was up ${remainders[m]}, adding additonal ${itemRemainders[m]}`)
      remainders[m] += itemRemainders[m]
    }
  }
  const min = Math.min(...Object.values(remainders))
  for (const member in remainders) {
    remainders[member] -= min
  }
  return remainders
}

/**
 * Splits an expense amongst all members given
 * @param amount the amount (in cents) to split
 * @param remainders how many cents each person
 * is currently up from ALL other splits being uneven
 */
function split(amount: number, remainders: { [member: string]: number }) {
  const members = Object.keys(remainders)
  const base = Math.floor(amount / members.length)
  console.log(`splitting ${amount} among ${members.length} people; each person pays base of ${base}`)
  const amounts = Object.fromEntries(members.map(member => [member, base]))
  // The minimum amount that cannot be split evenly among all members
  let totalRemainder = amount - (members.length * base)
  // Sorted so that people who are up money from previous splits are first
  // and should be required to pay the remainder first
  const payers = Object.entries(remainders)
    .sort(([_a, a], [_b, b]) => a - b)
  // The remainders for each person for this single split
  const currRemainders: { [member: string]: number } = {}
  for (const [payer, payerAmountUp] of payers) {
    console.log(`${payer} is ${payerAmountUp} from other uneven divisions. There is ${totalRemainder} left to pay`)
    if (totalRemainder > payerAmountUp) {
      // Payer will only be able to pay part of the total remainder amount
      const toPay = Math.max(1, payerAmountUp)
      console.log(`${payer} will pay ${toPay} of the remainder amount ${totalRemainder}`)
      amounts[payer] += toPay
      currRemainders[payer] = toPay
      totalRemainder -= toPay
    } else if (totalRemainder) {
      // Payer will pay full total remainder amount
      console.log(`${payer} will pay all of the remainder amount ${totalRemainder}`)
      amounts[payer] += totalRemainder
      currRemainders[payer] = totalRemainder
      totalRemainder = 0
    }
  }
  console.log(JSON.stringify(currRemainders, null, 2))
  console.log(JSON.stringify(amounts, null, 2))
  return [amounts, currRemainders]
}

export function OwersList({ group, item, owees, owers, setOwers, setRemainders }: {
  group: Group,
  item: Item,
  owees: Record<string, number>,
  owers: Record<string, number>,
  setOwers: (newOwers: Record<string, number>) => void,
  setRemainders: (itemRemainders: { [member: string]: number }) => void,
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
      const [splits, remainders] = split(total, getAllRemainders(group, item))
      setOwers(Object.fromEntries(group.members.map(m => [m, splits[m]])))
      setRemainders(remainders)
    }
    // Uneven splitting & leaving people out WIP
  }, [group, item, owees, setOwers, splitAll])

  return (
    <div className="flex items-center gap-3">
      <Label>Split among everyone equally</Label>
      <Checkbox checked={splitAll} onClick={() => setSplitAll(!splitAll)} />
    </div>
  )
}