import { FileText, PenLine, Wrench } from 'lucide-react'

import type { MvuLayer } from '@/lib/mvu'

export const MVU_LAYER_META: Record<
  MvuLayer,
  {
    label: string
    shortLabel: string
    collectionLabel: string
    description: string
    icon: typeof PenLine
    accent: string
    panel: string
  }
> = {
  'frank-note': {
    label: 'Frank’s note',
    shortLabel: 'First person',
    collectionLabel: 'MVU journal',
    description:
      'My words and lived experience, edited only for grammar, privacy, and public clarity.',
    icon: PenLine,
    accent: 'text-amber-200',
    panel: 'border-amber-200/20 bg-amber-100/[0.04]',
  },
  'field-intelligence': {
    label: 'Field intelligence',
    shortLabel: 'Editorial synthesis',
    collectionLabel: 'MVU field intelligence',
    description:
      'Session notes and my interpretation, clearly separated from a speaker’s original work.',
    icon: FileText,
    accent: 'text-tech-light',
    panel: 'border-tech-light/20 bg-tech-light/[0.04]',
  },
  'practice-guide': {
    label: 'Practice guide',
    shortLabel: 'Applied system',
    collectionLabel: 'MVU practice guide',
    description:
      'A sourced exercise, tracker, or protocol built to make an insight testable in ordinary life.',
    icon: Wrench,
    accent: 'text-emerald-300',
    panel: 'border-emerald-300/20 bg-emerald-300/[0.04]',
  },
}
