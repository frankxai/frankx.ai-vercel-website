// Stub component for ai-architecture
export const Hero3D = () => {
  return <div>Hero3D Component</div>
}

export const ArchitectureDiagram = ({ preset, title, className }: any) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <p>Architecture Diagram - {preset}</p>
    </div>
  )
}
