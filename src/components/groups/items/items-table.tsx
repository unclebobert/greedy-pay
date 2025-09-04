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
import { cn, formatCurrency } from '@/lib/utils'
import { EditItemButton } from './edit-item-btn'

export function ItemsTable({ group }: { group: Group }) {
  const columns: ColumnDef<Item>[] = [
    {
      id: 'actions',
      header: _ => <TableHead className='bg-accent/50' />,
      cell: ({ row, cell }) => <TableCell className='bg-accent/50 pl-4'>
        <EditItemButton group={group} item={row.original} className='size-5' />
      </TableCell>,
      footer: () => <TableCell className='bg-accent/50' />
    },
    {
      accessorKey: 'name',
      header: _ => <TableHead className='text-lg bg-accent/50'>
        Item
      </TableHead>,
      cell: ({ row, cell }) => <TableCell className='bg-accent/50'>
        {row.original.name}
      </TableCell>,
      footer: () => <TableCell className='bg-accent/50'>
        Total
      </TableCell>
    },
    ...group.members.map(member => ({
      id: member,
      header: _ => <TableHead className='text-lg border-l bg-accent/30'>
        {member}
      </TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell className='border-l p-0'>
            <MemberItemSummary
              isOwed={row.original.owees[member]}
              owes={group.paymentsRequired()[row.original.name][member]}
            />
          </TableCell>
        )
      },
      footer: _ => {
        const balance = group.balances()[member]
        const colour = balance === 0 ?
          'bg-accent/70' :
          balance > 0 ?
            'bg-green-300/30' :
            'bg-red-300/30'
        return (
          <TableCell className={cn(colour, 'border-l')}>
            {formatCurrency(balance)}
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
              {table.getFooterGroups().map(footerGroup => (
                <TableRow key={footerGroup.id}>
                  {
                    footerGroup.headers.map(header => flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    ))
                  }
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow key='noitems'>
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