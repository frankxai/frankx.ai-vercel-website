import { Metadata } from 'next'
import StudentWorkshop from '@/components/students/StudentWorkshop'

export const metadata: Metadata = {
    title: 'Student Hub | FrankX.ai',
    description: 'Find Your Edge in the Age of Intelligence. A self-guided workshop to help students find purpose, map career tracks, and build an AI-accelerated portfolio.',
}

export default function StudentHubPage() {
    return <StudentWorkshop />
}
