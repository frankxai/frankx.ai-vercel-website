export type Product = {
  id: string
  name: string
  description: string
  price: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Creative AI Toolkit',
    description: 'A collection of prompts, workflows, and quick wins to help you get started with creative AI.',
    price: 49,
  },
  {
    id: '2',
    name: 'Agentic Creator OS Blueprint',
    description: 'The full system we use internally to ship Golden Age of Intelligence and more.',
    price: 99,
  },
]
