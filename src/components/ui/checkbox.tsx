import { CheckIcon } from 'lucide-react';

export function Checkbox({ onClick, selected }: {
  onClick: () => void,
  selected: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={`
        border-input size-5 rounded-sm border transition-colors cursor-pointer
        ${selected ?
          'bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:border-transparent' :
          'hover:bg-primary/5'
        }
      `}
    >
      {selected && <CheckIcon className="size-4.5 mt-[1px]" />}
    </div>
  )
}