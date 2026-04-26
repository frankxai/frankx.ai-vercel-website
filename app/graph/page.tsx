import { redirect } from 'next/navigation'

export default function GraphAlias() {
  redirect('/network?view=graph')
}
