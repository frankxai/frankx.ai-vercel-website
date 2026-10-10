import type { ProductBonus } from '@/types/products'

/** Dollar "values" on an unreleased pack read as a price. Keep the description. */
export function waitlistBonuses(bonuses: ProductBonus[] | undefined): ProductBonus[] | undefined {
  return bonuses?.map((bonus) => ({
    title: bonus.title,
    description: bonus.description,
    value: '',
  }))
}
