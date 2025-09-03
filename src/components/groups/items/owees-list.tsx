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

  return (
    <Table>
      <TableBody>
        {
          Object.entries(owees).map(([name, amount]) => (
            <TableRow key={`owee_${name}`}>
              <TableCell>
                {name}
              </TableCell>
              <TableCell>
                <div className='flex gap-2 items-center'>
                  <span>is owed</span>
                  <Input type='number' min={0} step={0.01} value={amount / 100}
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
              <SelectTrigger className="w-[180px] cursor-pointer">
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