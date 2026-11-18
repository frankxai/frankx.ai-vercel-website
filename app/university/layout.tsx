import type { ReactNode } from 'react'
import styles from '@/components/university/commons.module.css'

export default function CommonsLayout({ children }: { children: ReactNode }) {
  return <main className={styles.commons}>{children}</main>
}
