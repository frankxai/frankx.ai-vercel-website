import SoulbookNavigation from '@/components/soulbook/SoulbookNavigation'

export default function SoulbookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SoulbookNavigation />
      {children}
    </>
  )
}
