'use client'

import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import EcosystemRelationshipFallback from './EcosystemRelationshipFallback'

const Ecosystem3DGraph = dynamic(() => import('./Ecosystem3DGraph'), {
  ssr: false,
  loading: () => (
    <EcosystemRelationshipFallback
      label="Loading the public relationship lens"
      note="The public operating systems and the Starlight substrate they share."
    />
  )
})

class GraphErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ecosystem-graph] failed to render the relationship view', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <EcosystemRelationshipFallback
          label="Public relationship lens"
          note="The public operating systems and the Starlight substrate they share."
        />
      )
    }

    return this.props.children
  }
}

export default function EcosystemGraphWrapper() {
  const [useStaticMap, setUseStaticMap] = useState(true)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactQuery = window.matchMedia('(max-width: 767px)')

    const updatePreference = () => {
      setUseStaticMap(reducedMotionQuery.matches || compactQuery.matches)
    }

    updatePreference()
    reducedMotionQuery.addEventListener('change', updatePreference)
    compactQuery.addEventListener('change', updatePreference)

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreference)
      compactQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  if (useStaticMap) {
    return (
      <EcosystemRelationshipFallback
        label="Public relationship lens"
        note="The public operating systems and the Starlight substrate they share."
      />
    )
  }

  return (
    <GraphErrorBoundary>
      <Ecosystem3DGraph />
    </GraphErrorBoundary>
  )
}
