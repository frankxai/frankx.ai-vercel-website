# ACOS Creator Kit · Release handoff
## Worked example
A build note reads “The order email arrived.” The newsletter editor is about to write “Buy the kit and start today.” The engineer has seen the email. Nobody has opened the delivered file as the buyer.

**Decision.** Keep the purchase announcement in draft. Give the delivery check to one operator.

| Field | Assignment |
| --- | --- |
| Input | Sandbox receipt, expected release filename and its checksum from the producer |
| Access | One test buyer account and its download. Read access to the release manifest |
| Action | Download from the receipt, check the bytes against the manifest and open the first exercise |
| Return | Test mode, release version, pass/fail, check time, private evidence pointer |
| Stop | A missing file, wrong edition or unreadable exercise goes back to the producer |
| Next owner | The release editor can describe exactly what was delivered when the receipt passes |

## Use it on your release
Paste this into your ACOS session with one source note. Supply a public example or redacted test receipt.

> Act as release editor. Quote the one claim the source supports. Name one claim that still needs a check. Assign the smallest check to one owner. Specify the input, permitted access, expected evidence and stop condition. Then write two sentences a customer could read today. Leave unresolved claims out of those two sentences.

## Review the result
A second reader should be able to find the original evidence, repeat the check and explain the buying decision. Keep credentials and buyer details in the service that issued them. Give the editor an evidence reference.

Example customer copy while delivery is under test: “Read the release handoff. Use it to decide when your own announcement is ready.”
