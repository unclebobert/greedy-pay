import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Group, Item } from '@/db'
import { MemberItemSummary } from './member-item-summary'
import { cn, formatCurrency, groupBalances } from '@/lib/utils'
import { EditItemButton } from './edit-item-btn'

export function ItemsTable({ group }: { group: Group }) {
  const columns: ColumnDef<Item>[] = [
    {
      id: 'actions',
      header: _ => <TableHead key='actions' className='bg-accent/50' />,
      cell: ({ row, cell }) => <TableCell key={cell.id} className='bg-accent/50 pl-4'>
        <EditItemButton group={group} item={row.original} className='size-5' />
      </TableCell>
    },
    {
      accessorKey: 'name',
      header: _ => <TableHead key='name' className='text-lg bg-accent/50'>
        Item
      </TableHead>,
      cell: ({ row, cell }) => <TableCell key={cell.id} className='bg-accent/50'>
        {row.original.name}
      </TableCell>
    },
    ...group.members.map(member => ({
      id: member,
      header: _ => <TableHead key={member} className='text-lg border-l bg-accent/30'>
        {member}
      </TableHead>,
      cell: ({ row, cell }) => {
        return (
          <TableCell key={cell.id} className='border-l p-0'>
            <MemberItemSummary
              isOwed={row.original.owees[member]}
              owes={row.original.owers[member]}
            />
          </TableCell>
        )
      }
    } as ColumnDef<Item>))
  ]
  const table = useReactTable({
    data: group.items,
    columns,
    getRowId: item => item.name,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='max-w-full'>
      <Table className='overflow-auto'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {
                headerGroup.headers.map(header => flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                ))
              }
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {
                    row.getVisibleCells().map(cell => flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    ))
                  }
                </TableRow>
              ))}
              <TableRow key='_total'>
                <TableCell key='_total_actions' className='bg-accent/50' />
                <TableCell key='_total_name' className='bg-accent/50'>
                  Total
                </TableCell>
                {
                  group.members.map(member => {
                    const balance = groupBalances(group)[member]
                    const colour = balance === 0 ?
                      'bg-accent/70' :
                      balance > 0 ?
                        'bg-green-300/30' :
                        'bg-red-300/30'
                    return (
                      <TableCell key={`_${member}_total`}
                        className={cn(colour, 'border-l')}
                      >
                        {formatCurrency(balance)}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No items.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}