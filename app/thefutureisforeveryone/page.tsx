import { permanentRedirect } from "next/navigation";

export default function LegacyFutureRoute() {
  permanentRedirect("/the-future-we-choose");
}
