import Dexie, { type EntityTable } from 'dexie'

interface Group {
  id: number
  name: string
  description: string
  created: Date
  /** List of names of members of group */
  members: string[]
  items: Item[]
  /**
   * Keeps track of how many cents each member is up from uneven splitting
   * across all items in the group
   */
  remainders: { [item: string]: { [member: string]: number } }
}

/**
 * e.g. a ticket for a movie, dinner at some place
 * tracks who is owed money for the item (i.e. who paid) and
 * who owes money for the item (i.e. participated but did not pay)
 */
interface Item {
  name: string
  /** Who is owed money: how much they are owed */
  owees: Record<string, number>
  /** Who owes money: how much they owe */
  owers: Record<string, number>
  /**
   * 'equal' means split b/w everyone equally
   * 'some' means split b/w not everyone, but still equally
   * 'custom' means possible unequal splitting
   */
  splitting: 'equal' | 'some' | 'custom'
}

const db = new Dexie('Database') as Dexie & {
  groups: EntityTable<Group, 'id'>
}

// Schema declaration:
db.version(1).stores({
  groups: '++id, name' // primary key "id" (for the runtime!)
})

export type { Group, Item }
export default db
