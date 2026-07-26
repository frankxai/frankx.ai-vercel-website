# Data Boundaries

The system works because it separates approved public knowledge, private owner workspace data, and runtime renter data.

## Public Template Repos

Allowed:

- sample property facts
- schema examples
- workflow docs
- agent role definitions
- skills and commands
- sample FAQs
- mock inquiries
- install notes

Blocked:

- renter names tied to addresses or tickets
- access codes
- payment details
- signed leases
- identity documents
- private owner financials
- private phone numbers
- unresolved disputes

## Private Owner Workspace

Allowed:

- real property profiles
- approved owner decisions
- private listing notes
- sanitized ticket summaries
- maintenance contacts when access is restricted
- weekly review logs

Still blocked unless explicitly secured:

- raw identity documents
- bank details
- unrestricted access secrets
- uncontrolled exports of runtime tickets

## Runtime Database And Storage

Belongs here:

- inquiries
- support tickets
- renter portal sessions
- access-code/session mapping
- document uploads
- approval records
- agent run logs

## GitHub Issue Summaries

Only sanitized summaries go into GitHub issues:

- ticket type
- urgency class
- owner action needed
- public-safe property/unit reference
- no access secrets
- no payment data
- no identity files

## Public Page And Download Kit

The public page may show:

- sample portal screenshots
- architecture
- business model
- public starter files
- safety boundaries

It must not imply the AI can autonomously make binding rental commitments in v1.
