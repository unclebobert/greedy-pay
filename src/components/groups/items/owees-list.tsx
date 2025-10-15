import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import type { Group } from '@/db';
import { useState } from 'react';

export function OweesList({ group, owees, setOwees }: {
  group: Group,
  owees: Record<string, number>,
  setOwees: (newOwees: Record<string, number>) => void,
}) {
  const [newOwee, setNewOwee] = useState('')

  function addNewOwee(name: string) {
    setOwees({ ...owees, [name]: 0 })
    setNewOwee('')
  }

  function swapOwee(oldName: string, newName: string) {
    const { [oldName]: oldAmount, ...rest } = owees
    if (newName in owees) {
      // If swapping to an existing owee, swap the two amounts
      setOwees({ ...rest, [newName]: oldAmount, [oldName]: owees[newName] })
    } else {
      // Otherwise just rename the owee
      setOwees({ ...rest, [newName]: oldAmount })
    }
  }

  return (
    <Table>
      <TableBody>
        {
          Object.entries(owees).sort().map(([name, amount]) => (
            <TableRow key={`owee_${name}`}>
              <TableCell>
                <Select value={name}
                  onValueChange={newName => swapOwee(name, newName)}
                >
                  <SelectTrigger className="w-full max-w-32 cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {group.members
                      .map(member => (
                        <SelectItem key={`swap_${member}`} value={member}
                          className='cursor-pointer'
                        >
                          {member}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className='flex gap-2 items-center'>
                  <span>is owed</span>
                  <Input type='number' min={0} step={0.01} value={amount / 100}
                    className='min-w-20'
                    onChange={e => {
                      setOwees({
                        ...owees,
                        // Multiple and round as amount needs to be stored in cents
                        [name]: Math.round(parseFloat(e.target.value) * 100)
                      })
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        }
        <TableRow key='addowee'>
          <TableCell colSpan={2}>
            <Select value={newOwee}
              onValueChange={owee => addNewOwee(owee)}
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder='Add new creditor' />
              </SelectTrigger>
              <SelectContent>
                {group.members
                  .filter(member => !(member in owees))
                  .map(member => (
                    <SelectItem key={member} value={member} className='cursor-pointer'>
                      {member}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}