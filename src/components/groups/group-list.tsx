import type { Group } from '@/db';
import { useNavigate } from '@tanstack/react-router';

export function GroupList({ groups }: { groups: Group[] }) {
  const nav = useNavigate()
  return (
    <ul>
      {
        groups.map((group, index) => (
          <li key={group.id}
            className={`
              p-2 cursor-pointer hover:bg-accent/20 active:bg-accent/40
              ${index > 0 ? 'border-t' : ''}
            `}
            onClick={_ => nav({ to: `/groups/${group.id}` })}
          >
            <h3 className='font-semibold text-lg'>{group.name}</h3>
            <div className='text-sm'>Created {group.created.toLocaleString()}</div>
          </li>
        ))
      }
    </ul>
  )
}