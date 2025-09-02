export function MemberItemSummary({ isOwed, owes }: {
  isOwed?: number,
  owes?: number
}) {
  return (
    <div className='flex'>
      <div>
        <div className='pt-1 pb-0.5 pl-2 bg-green-300/30'>
          Is owed
        </div>
        <hr />
        <div className='pb-1 pt-0.5 pl-2 bg-red-300/30'>
          Owes
        </div>
      </div>
      <div className='grow'>
        <div className='pt-1 pb-0.5 px-2 bg-green-300/30'>
          ${isOwed ?? 0}
        </div>
        <hr />
        <div className='pb-1 pt-0.5 px-2 bg-red-300/30'>
          ${owes ?? 0}
        </div>
      </div>
    </div>
  )
}