# Wearable AI: technical appendix

Verification: 2026-11-13. Article: `content/blog/samsung-google-meta-wearable-ai-founder-guide.mdx`. Runnable code: `examples/wearable-ai-founder-starter`. This appendix distinguishes tested original code, upstream source-checked instructions and proposed production work.

## Run the starter

Requirements: Node >=22; tested Node 24.22.1. No runtime packages, lockfile resolution or vendor binaries are required.

```bash
cd examples/wearable-ai-founder-starter
cp .env.example .env
node --input-type=module -e "import {randomBytes} from 'node:crypto'; console.log(randomBytes(32).toString('hex'))"
# Set DEMO_API_TOKEN in .env to the generated value.
npm test
npm start
# In a second terminal:
npm run demo
```

Expected: a mock observation becomes a proposed `save_local_note` action. Enter `approve` to obtain a local receipt. The transparent PNG fixture is a transport test, not a visual benchmark. Server shutdown removes state. Neither an external tool nor persistent storage is connected.

| Environment variable | Value / purpose |
| --- | --- |
| `DEMO_API_TOKEN` | Private random bearer token; one local principal only |
| `INFERENCE_MODE` | `mock` default; `openai` optional |
| `OPENAI_API_KEY` | Server-only provider credential in real mode |
| `OPENAI_MODEL` | Explicit image-capable Responses model available to the account; no model automatically selected |
| `DEMO_ALLOW_CLOUD` | Client-side `yes` acknowledgement required for a real-cloud demo |
| `PORT` | Optional local server port; default documented in starter |

For real inference, supply an authorized PNG/JPEG data URL, enable `openai`, select an available model and independently consent to cloud processing. No paid inference request was made during validation. The provider envelope is tested with an injected deterministic response.

The request shape follows the official [image guide](https://developers.openai.com/api/docs/guides/images-vision) and [Responses reference](https://developers.openai.com/api/reference/resources/responses/methods/create): `POST /v1/responses`, `input_text` and `input_image`, bounded output, and `store:false`. This setting is not a zero-retention guarantee. The exact implementation and error paths are in `src/inference.mjs`.

## Source structure and trust boundaries

| Path | Responsibility |
| --- | --- |
| `src/policy.mjs` | Server-owned mock profiles, capability intersection, consent age, byte/MIME framing |
| `src/inference.mjs` | Deterministic mock plus optional official multimodal HTTP transport |
| `src/app.mjs` | Bearer identity, routes, proposal hashing, nonces, expiry, consumption, receipts and demo counters |
| `src/server.mjs` | Loopback Node HTTP bridge and request bound |
| `api/index.mjs` | Vercel observation preview; confirmation disabled |
| `scripts/demo.mjs` | Trusted interactive review/confirmation client |
| `test/` | Policy, transport, provider envelope and full local flow |

Device profiles are application-defined mocks. A caller cannot obtain a feature solely by asserting it. This is not device attestation. Image signatures and byte limits do not fully decode media, strip EXIF, prevent decompression bombs or redact faces. The model produces text only; it cannot select a tool, destination or approval. Confirmation is bound to the principal, exact action hash, random nonce and expiry. Its replay protection is local to one running process.

## Meta: exact upstream setup, not an invented SDK wrapper

Source pin: [`meta/meta-wearables-dat-android@f4371bc9f90249d51eb07d7f8a61e8d829294f16`](https://github.com/meta/meta-wearables-dat-android/tree/f4371bc9f90249d51eb07d7f8a61e8d829294f16), October 9, 2026. Read README, CHANGELOG, CameraAccess README, Gradle catalog, app build file and SDK registration/streaming/mock guides. Setup is source-checked; native tasks were not executed here.

```bash
git clone https://github.com/meta/meta-wearables-dat-android.git
cd meta-wearables-dat-android
git checkout f4371bc9f90249d51eb07d7f8a61e8d829294f16
cd samples/CameraAccess
./gradlew :app:assembleDebug
./gradlew :app:installDebug
./gradlew :app:connectedDebugAndroidTest
```

Use Android SDK36, JDK17+, and the inspected sample toolchain (AGP8.11.1, Kotlin2.2.21). Configure the SDK path locally. In ignored `local.properties`, the SDK registration guidance permits `mwdat_application_id=0` and `mwdat_client_token=0` for local Developer Mode. Assigned production credentials and release eligibility remain required for deployment.

Exact SDK dependencies from the official catalog, not independently package-installed here:

```kotlin
// mavenCentral(); integrate into the official sample's existing Gradle project.
implementation("com.meta.wearable:mwdat-core:1.0.1")
implementation("com.meta.wearable:mwdat-camera:1.0.1")
debugImplementation("com.meta.wearable:mwdat-mockdevice:1.0.1")
```

Do not duplicate these declarations if using the sample's version-catalog aliases. SDK terms govern these binaries; the starter does not redistribute them.

Use the [official camera integration guide](https://github.com/meta/meta-wearables-dat-android/blob/f4371bc9f90249d51eb07d7f8a61e8d829294f16/plugins/mwdat-android/skills/camera-streaming/SKILL.md) for lifecycle. Initialize, register, obtain camera permission, create/start the session, wait for STARTED, attach/start the camera stream, then use the stream's still-capture result. Stop/remove session resources on disconnect and lifecycle exit. A stopped camera is not reusable.

### Attach the capture to the tested backend

The native bridge is an integration specification, not compiled code in this kit:

1. Keep the official sample's wearer-triggered `stream.capturePhoto()` result handler. Convert Bitmap output to JPEG; if it returns HEIC, decode/re-encode to JPEG or PNG before this starter, which deliberately rejects HEIC.
2. Create the JSON shape in `fixtures/capture.json` with a current consent timestamp, requested features and the image data URL. Resolve identity from a phone session, not a hardcoded API key shipped to customers. For the local demonstration only, inject the demo bearer from private development settings.
3. Send `POST /propose`. Render returned text as text. Display the local-note destination and exact action arguments on the phone; glasses audio can summarize only after a valid connection/capability check.
4. A separate explicit user confirmation sends the proposal ID, hash and nonce to `POST /confirm`. Never auto-confirm from a photo callback, OCR text or a model output.
5. Display the receipt; recover cleanly from denial, expiry and disconnect. Replace the local action only after a scoped real-tool integration passes its own tests.

For MockDeviceKit, use the CameraAccess Debug menu to pair a displayless Ray-Ban mock, power on, unfold, don and select its packaged feed. FAQ says display mocks are unsupported while the 1.0 changelog introduces MockDisplayKit. This tutorial avoids that unresolved display-mock discrepancy.

## Android XR: current projected template

Use the current Studio Basic Display Glasses Activity template and [first activity guide](https://developer.android.com/develop/xr/jetpack-xr-sdk/glasses/first-activity), updated November10. Preserve its coherent Gradle, Kotlin and SDK baseline. [Glimmer notes](https://developer.android.com/jetpack/androidx/releases/xr-glimmer) carry compileSdk/Kotlin requirements; installing an alpha into an older app is not a validated migration.

Latest inspected October21 entries: Projected `1.0.0-alpha14`, Glimmer `1.0.0-alpha22`, Compose XR `1.0.0-beta02`; runtime `1.0.0` stable with `1.1.0-alpha02` preview; SceneCore/ARCore `1.0.0` stable with `1.1.0-alpha01` preview. Stable spatial libraries do not imply support on audio eyewear.

Current manifest values from that guide:

```xml
<activity
    android:name=".ProjectedMainActivity"
    android:exported="true"
    android:requiredDisplayCategory="android.hardware.display.category.XR_PROJECTED">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.XR_PROJECTED_LAUNCHER" />
    </intent-filter>
</activity>
```

Source-checked launch fragment, within the official template and its lifecycle; not a standalone or compiled app:

```kotlin
val options = ProjectedContext.createProjectedActivityOptions(context)
val intent = Intent(context, ProjectedMainActivity::class.java)
context.startActivity(intent, options.toBundle())
```

Create paired phone and glasses AVDs, deploy to the phone, and test permission denial. To exercise audio-only mode, enable it in the phone Glasses app, stop both AVDs, cold-boot the phone, then relaunch. [Emulator camera capture is unavailable](https://developer.android.com/develop/xr/jetpack-xr-sdk/run/emulator/glasses); feed fixtures into the backend rather than claim camera validation.

### Official samples with explicit compatibility limits

```bash
# Prototype audio/display sample: reference only, older dependency baseline.
git clone --branch prototype-ai-glasses https://github.com/android/ai-samples.git
cd ai-samples
git checkout 193dfa3062b57178c4af2cb125d6cec328ed74cd
# Configure Firebase locally per README; then source-supported, unexecuted task:
./gradlew :app:assembleDebug
```

This pin uses Projected alpha13, Glimmer alpha20 and old manifest constants. Its preview model's current availability was not checked. Do not silently combine it with the current template. The spatial example is separately [`android/xr-samples@434a733c8425dcf7b5bf8c0d86265c332f669314`](https://github.com/android/xr-samples/tree/434a733c8425dcf7b5bf8c0d86265c332f669314), for headsets/wired XR, not a Samsung audio-glasses certification.

## Preview deployment and production promotion

The starter's `api/index.mjs` uses Vercel's documented Web fetch export. From its directory, use an authenticated Vercel CLI `vercel` preview, or Git integration with root `examples/wearable-ai-founder-starter`, framework Other, no build step, Node22/24. Set `DEMO_API_TOKEN` privately for Preview and keep `INFERENCE_MODE=mock`. Do not deploy this nested `vercel.json` as the root FrankX site configuration. Read [runtime](https://vercel.com/docs/functions/runtimes/node-js) and [limits](https://vercel.com/docs/functions/limitations).

Preview confirmations fail closed because serverless process memory cannot authorize durable actions. Production needs transactional proposal consumption, tenant-scoped identity, persistent idempotency/receipts, deletion/export, an actual device registry, durable budget reservations, model evaluation and scoped tool credentials. The kit neither creates a parallel Starlight database nor asserts these services are deployed.

FrankX article preview uses its existing Vercel Git integration. Keep the PR draft and inspect its exact route, metadata, schema, images, downloadable kit and source links before seeking publication approval. No production promotion is authorized by this commission.
