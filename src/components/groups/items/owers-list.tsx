

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import type { Group } from '@/db';
import { useState } from 'react';

export function OwersList({ group, owers, setOwers, remainingToSplit }: {
  group: Group,
  owers: string[] | { [member: string]: number } | undefined,
  setOwers: (newOwers: string[] | { [member: string]: number } | undefined) => void,
  remainingToSplit: number
}) {
  const splitAllEqual = !owers
  const splitSomeEqual = owers instanceof Array
  const splitManual = !(splitAllEqual || splitSomeEqual)
  const [storedManualSplit, setStoredManualSplit] = useState(splitManual ? owers : {})
  return (
    <>
      <div className='flex items-center gap-3'>
        <Label>Split among <strong>all</strong> members equally</Label>
        <Checkbox checked={splitAllEqual}
          onClick={() => setOwers(splitAllEqual ? group.members : undefined)}
        />
      </div>
      {!splitAllEqual &&
        <div className='flex items-center gap-3'>
          <Label>Split among selected members <strong>equally</strong></Label>
          <Checkbox checked={splitSomeEqual}
            onClick={() => setOwers(splitSomeEqual ? storedManualSplit : group.members)}
          />
        </div>
      }
      {splitSomeEqual && group.members.map(member => (
        <div key={member} className='flex items-center gap-3 ml-4'>
          <Checkbox checked={owers.includes(member)}
            onClick={() => {
              if (owers.includes(member)) {
                setOwers(owers.filter(o => o !== member))
              } else {
                setOwers([...owers, member])
              }
            }}
          />
          <Label>{member}</Label>
        </div>
      ))}
      {splitManual &&
        <Table>
          <TableBody>
            {group.members.map(member => (
              <TableRow key={member}>
                <TableCell>{member}</TableCell>
                <TableCell>
                  <div className='flex gap-2 items-center'>
                    <span>owes</span>
                    <Input type='number' min={0} step={0.01}
                      value={member in owers ? owers[member] / 100 : 0}
                      onChange={e => {
                        // Multiple and round as amount needs to be stored in cents
                        const cents = Math.round(parseFloat(e.target.value) * 100)
                        let newOwers: { [member: string]: number }
                        if (!cents) {
                          newOwers = Object.fromEntries(
                            Object.entries(owers).filter(([m]) => m !== member)
                          )
                        } else {
                          newOwers = {
                            ...owers,
                            [member]: Math.round(parseFloat(e.target.value) * 100)
                          }
                        }
                        setOwers(newOwers)
                        setStoredManualSplit(newOwers)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Unassigned</TableCell>
              <TableCell>
                <div className='flex gap-2 items-center'>
                  <span>owes</span>
                  <Input disabled value={remainingToSplit / 100}
                    aria-invalid={remainingToSplit !== 0}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      }
    </>
  )
}