import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Group } from '@/db'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupBalances(group: Group) {
  const balances: { [member: string]: number } = {}
  for (const member of group.members) {
    balances[member] = 0
  }
  for (const item of group.items) {
    for (const [owee, amount] of Object.entries(item.owees)) {
      balances[owee] += amount
    }
    for (const [ower, amount] of Object.entries(item.owers)) {
      balances[ower] -= amount
    }
  }
  return balances
}
