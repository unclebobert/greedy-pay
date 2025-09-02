import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Group } from '@/db'
import { toast } from 'sonner'

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

/**
 * @param group The group to calculate the "optimal" splitting for,
 * i.e. using the "least" number of transactions
 */
export function bobertsAmazingGreedyPayAlgorithm(group: Group) {
  const balances = groupBalances(group)
  const transactions: {
    [payer: string]: {
      [payee: string] : number
    }
  } = {}
  for (const member in balances) {
    transactions[member] = {}

    // Person is in credit, dont pay anyone
    if (balances[member] >= 0) continue

    // Person is in debt, pay people in credit until debt is gone
    while (balances[member] < 0) {
      const payee = Object.entries(balances)
        .find(([_member, balance]) => balance > 0)
      if (!payee) {
        toast.warning(`
          Could not find someone for ${member} to pay, even though
          ${member} is still owing ${-balances[member]}.
          This could be due to floating-point error.
        `)
        break
      }
      let amountPaid = 0
      const [payeeName, payeeCredit] = payee
      if (balances[member] + payeeCredit >= 0) {
        // If debtor can get even by paying to the payee, debtor wlll pay full
        // remaining debt to the payee, and payee will have the amount
        // taken from their credit
        amountPaid = -balances[member];
        // deduct credit from payee
        balances[payeeName] = payeeCredit - amountPaid;
        // payer is now even
        balances[member] = 0;
      } else {
        // If debtor's current balance cannot be paid in full, debtor will pay
        // only amount equal to payee's credit
        amountPaid = payeeCredit;
        // pay the payee
        balances[payeeName] = 0;
        // the payer pays
        balances[member] += amountPaid;
      }
      transactions[member][payeeName] = amountPaid;
    }
  }
  for (const [member, amount] of Object.entries(balances)) {
    if (amount !== 0) {
      toast.warning(`
        After calculating transactions, ${member} still has a balance of ${amount}.
        This could be due to floating-point error.
      `)
    }
  }
  return transactions
}

/**
 * Formats the transaction data of a single person into a readable string
 * for 'simpletons'
 * @param payments The payments of a **single** person
 */
export function formatPayments(payments: { [payee: string] : number }) {
  const paymentsList = Object.entries(payments)
  if (paymentsList.length === 0) return 'does not have to pay anyone.'
  return (
    'needs to pay ' +
    paymentsList
      .map(([payee, amount]) => `$${amount.toFixed(2)} to ${payee}`)
      .join(' and ') +
    '.'
  )
}
