// Stub component for ArchitectureDiagram
interface ArchitectureDiagramProps {
  preset?: string
  title?: string
  className?: string
}

export const ArchitectureDiagram = ({ preset, title, className }: ArchitectureDiagramProps) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <p>Architecture Diagram - {preset}</p>
    </div>
  )
}

export default ArchitectureDiagram
