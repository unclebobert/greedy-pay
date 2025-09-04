import Dexie, { type EntityTable } from 'dexie'

interface _Group {
  id: number
  name: string
  description: string
  created: Date
  /** List of names of members of group */
  members: string[]
  items: Item[]
}

class Group {
  public readonly id: number
  public readonly name: string
  public readonly description: string
  public readonly created: Date
  /** List of names of members of group */
  public readonly members: string[]
  public readonly items: Item[]

  private _paymentsRequired?: { [item: string]: { [member: string]: number } }
  /**
   * Keeps track of the actual amounts each person needs to pay
   * for each item (ignoring the credit for each).
   * Needs to be recalculated each time 
   * 
   * { item: { member: amount } }
   */
  public paymentsRequired() {
    if (this._paymentsRequired) return this._paymentsRequired
    // else, need to calculate payments required
    const payments: { [item: string]: { [member: string]: number } } = {}
    // queue to spread 'suffering' as equally as possible
    const nextToSuffer = this.members
    for (const item of this.items) {
      const total = Object.values(item.owees).reduce((a, b) => a + b, 0)
      const participants = item.owers ?? this.members
      const base = Math.floor(total / participants.length)
      const amounts = Object.fromEntries(participants.map(m => [m, base]))
      console.log(`splitting ${total} among ${participants.length} people; each person pays base of ${base}`)
      // The minimum amount that cannot be split evenly among all members
      let totalRemainder = total - (participants.length * base)
      while (totalRemainder > 0) {
        // get the next person participating in the split that should suffer
        const [sufferer] = nextToSuffer.splice(
          nextToSuffer.findIndex(m => participants.includes(m)),
          1
        )
        // ensure that they suffer less later
        nextToSuffer.push(sufferer)
        // make them suffer and reduce remaining suffering
        amounts[sufferer]++
        totalRemainder--
      }
      payments[item.name] = amounts
    }
    this._paymentsRequired = payments
    return payments
  }
  
  private _balances?: { [member: string]: number }
  public balances() {
    if (this._balances) return this._balances
    const balances: { [member: string]: number } = {}
    for (const member of this.members) {
      balances[member] = 0
    }
    const paymentsRequired = this.paymentsRequired()
    for (const item of this.items) {
      for (const [owee, amount] of Object.entries(item.owees)) {
        balances[owee] += amount
      }
      for (const [ower, amount] of Object.entries(paymentsRequired[item.name])) {
        balances[ower] -= amount
      }
    }
    this._balances = balances
    return balances
  }

  private _minimised?: { [payer: string]: { [payee: string] : number } }
  public minimisedTransactions() {
    if (this._minimised) return this._minimised
    const balances = Object.fromEntries(Object.entries(this.balances()))
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
          console.error(`
            Could not find someone for ${member} to pay, even though
            ${member} is still owing ${balances[member]}.
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
        console.error(`
          After calculating transactions,
          ${member} still has a balance of ${amount}.
        `)
      }
    }
    this._minimised = transactions
    return transactions
  }
  
  constructor(groupData: _Group) {
    this.id = groupData.id
    this.name = groupData.name
    this.description = groupData.description
    this.created = groupData.created
    this.members = groupData.members
    this.items = groupData.items
  }
}

/**
 * e.g. a ticket for a movie, dinner at some place
 * tracks who is owed money for the item (i.e. who paid) and
 * who owes money for the item (i.e. participated but did not pay)
 */
interface Item {
  name: string
  /** Who is owed money: how much they are owed */
  owees: { [member: string]: number }
  /**
   * Who owes money: how much they owe
   * if does not exist, means split b/w everyone equally
   * if list of strings means split b/w people in list
   * if map, maps each person to amount they pay
   */
  owers?: string[]
}

const db = new Dexie('Database') as Dexie & {
  groups: EntityTable<Group, 'id'>
}

// Schema declaration:
db.version(1).stores({
  groups: '++id, name' // primary key "id" (for the runtime!)
})

db.groups.mapToClass(Group)

export type { Item }
export { Group }
export default db
