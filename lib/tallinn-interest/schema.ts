import { z } from 'zod'

import {
  TALLINN_TIME_WINDOWS,
  tallinnExperiences,
} from '@/data/tallinn-experiences'
import {
  TALLINN_ATTENDANCE_INTENTS,
  TALLINN_ROLE_LENSES,
} from '@/lib/tallinn-interest/options'

const experienceSlugs = new Set<string>(
  tallinnExperiences.map((experience) => experience.slug),
)
const slotIds = new Set<string>(TALLINN_TIME_WINDOWS.map((slot) => slot.id))

export const TallinnInterestSchema = z.object({
  fullName: z.string().trim().min(1, 'Your name is required.').max(200),
  email: z.string().trim().toLowerCase().email('Enter a valid email.').max(200),
  experienceSlug: z
    .string()
    .trim()
    .refine((value) => experienceSlugs.has(value), 'Choose a valid session.'),
  variantId: z
    .string()
    .trim()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9-]+$/, 'Invalid session option.'),
  roleLens: z.enum(TALLINN_ROLE_LENSES),
  attendanceIntent: z.enum(TALLINN_ATTENDANCE_INTENTS),
  slotIds: z
    .array(z.string())
    .min(1, 'Choose at least one possible time.')
    .max(3, 'Choose no more than three times.')
    .refine(
      (values) => new Set(values).size === values.length,
      'Choose each time only once.',
    )
    .refine(
      (values) => values.every((value) => slotIds.has(value)),
      'Choose only listed times.',
    ),
  companyOrProject: z.string().trim().max(200).optional().or(z.literal('')),
  note: z.string().trim().max(800).optional().or(z.literal('')),
  aftercareConsent: z.boolean(),
  consentToContact: z.literal(true, {
    error: () => 'Consent is required to coordinate this session.',
  }),
  submissionId: z.string().uuid('Invalid submission ID.'),
  // Honeypot: deliberately not constrained to empty. Filled submissions are
  // silently dropped by the route so bots do not learn the filter.
  website: z.string().max(200).optional().or(z.literal('')),
})

export type TallinnInterestPayload = z.infer<typeof TallinnInterestSchema>
