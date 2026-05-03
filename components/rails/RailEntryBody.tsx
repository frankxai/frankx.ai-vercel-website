/**
 * Renders pre-compiled markdown HTML inside the contemplative typography
 * frame. Body HTML is generated server-side by `marked` in load-entries.ts,
 * so this is a server component that only has to wrap it.
 */

interface Props {
  html: string;
}

export function RailEntryBody({ html }: Props) {
  return (
    <div
      className="rails-prose"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
