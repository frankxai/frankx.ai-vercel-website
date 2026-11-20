import type { Resource } from '@/content/university/catalog'
import CommonsLink from './CommonsLink'
import styles from './commons.module.css'

export default function ResourceList({ items, ordered = false }: { items: Resource[]; ordered?: boolean }) {
  const List = ordered ? 'ol' : 'ul'
  return <List className={ordered ? styles.steps : styles.list}>
    {items.map(item => <li key={item.id}>
      <div>
        <p className={styles.meta}>{item.kind} · {item.publisher}</p>
        <h3><CommonsLink href={item.href} event="commons_resource_open" id={item.id}>{item.title}</CommonsLink></h3>
        <p>{item.task}</p>
        <small>{item.access} · <span lang="en">{item.language === 'nl' ? 'Dutch' : 'English'}</span></small>
      </div>
    </li>)}
  </List>
}
