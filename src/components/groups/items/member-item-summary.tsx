import { cn } from '@/lib/utils'

export function MemberItemSummary({ isOwed, owes }: {
  isOwed?: number,
  owes?: number
}) {
  const owedColour = isOwed ? 'bg-green-300/30' : ''
  const owesColour = owes ? 'bg-red-300/30' : ''
  return (
    <div className='flex'>
      <div>
        <div className={cn(owedColour, 'pt-1 pb-0.5 pl-2')}>
          Is owed
        </div>
        <hr />
        <div className={cn(owesColour, 'pb-1 pt-0.5 pl-2')}>
          Owes
        </div>
      </div>
      <div className='grow'>
        <div className={cn(owedColour, 'pt-1 pb-0.5 px-2')}>
          ${isOwed ?? 0}
        </div>
        <hr />
        <div className={cn(owesColour, 'pb-1 pt-0.5 px-2')}>
          ${owes ?? 0}
        </div>
      </div>
    </div>
  )
}