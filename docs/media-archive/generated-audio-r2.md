# generated_audio — archived to Cloudflare R2

Moved out of git on 2026-09-15. Nothing in the site or scripts referenced these files, and
`.vercelignore` already stripped them from every deploy, so they only added clone time: about
535 MB fetched on each Vercel build and then discarded.

- Bucket: `starlight-media-archive` (private) on the Cloudflare account that owns the Starlight media buckets
- Key prefix: `frankx.ai-vercel-website/generated_audio/`, followed by the original path below
- Every object was downloaded back after upload and matched against the SHA-256 listed here

Restore one file:

```bash
wrangler r2 object get starlight-media-archive/frankx.ai-vercel-website/generated_audio/<path> --file generated_audio/<path> --remote
```

| Path | Bytes | SHA-256 |
|---|---:|---|
| `preset_stress_relief.wav` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `preset_stress_relief_30s.wav` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `pro_528hz_warm.wav` | 2880044 | `0ff0a09d93a0e53fbd3229fb8916551fd830174874c6c3ad17b052b9e8e0face` |
| `pro_theta_binaural.wav` | 5760044 | `959027fac1bd32b1a15287d57f27e48b3c16eb4a40048a89fd88f3979992a3bb` |
| `test_528hz.wav` | 882044 | `13f40be46f55df7f455ee6fa16a55402d92f9affcf4045bb221a945bbae06369` |
| `test_theta_binaural.wav` | 1764044 | `99662b3eb592a469a1bdf00df4bafdb252d283f5f546b86d50b4871cb742e4ee` |
| `theta_30s_standard.wav` | 5292044 | `407b2a9fd4ec708552aa9824f4b944591c9181f97c557a5fb227c0fb82ef7bfe` |
| `vibe-os-library/432hz_alpha_binaural_3min.wav` | 51840044 | `17fbe5f97a40b7cc2bd3c75312aa870aeb9937c1e5dab15b9d33be2a3ba3a117` |
| `vibe-os-library/432hz_theta_binaural_3min.wav` | 51840044 | `7e19563a166501a1713b4819f5156cc9048b9bc313f2cbb5e735d8e9bfa9f359` |
| `vibe-os-library/432hz_universal_3min.wav` | 25920044 | `f0d317f9160043ed8e9d81360df01f5531142cab7be28e45f5f32f145a0ec93a` |
| `vibe-os-library/528hz_isochronic_alpha_3min.wav` | 25920044 | `cd086f62fe30e1634dfafb77ba5550da80c32a72dd73c21620842cdfc3fb1ea0` |
| `vibe-os-library/528hz_love_frequency_3min.wav` | 25920044 | `28cdbad19e5983fc89cf60b0fead0a5586cf3975e854fe19f2fe14ce7bce5e6a` |
| `vibe-os-library/QUICK_REFERENCE.md` | 2951 | `7b71c784940b22080bb9238122e9c943534f313bd6e907ffe714452ed871cb4f` |
| `vibe-os-library/README.md` | 8193 | `c74b0e9547f82c5033e28ca63e976aacd523798418746a683734314560aa8489` |
| `vibe-os-library/VERIFICATION_REPORT.md` | 7200 | `85bd690957f5f012c7bba259d3b0919190abc9bede632f93ce9b1a267cefcd99` |
| `vibe-os-library/alpha_focus_3min.wav` | 51840044 | `ead963e4f978533ce71ee2919d65febe8be5481090708e461be810052d13919a` |
| `vibe-os-library/delta_sleep_3min.wav` | 51840044 | `5cca6be911cfdc25182a679a5589af102c909b278f329a51e5405ea0a754256d` |
| `vibe-os-library/gamma_cognition_3min.wav` | 51840044 | `5462e935b51fb6c1590d8558113381a6315cadd5f6f9ee4bff7736e2076c9fc9` |
| `vibe-os-library/schumann_resonance_7.83hz_3min.wav` | 51840044 | `c3a439f26c7a3d694d710c5803ef927545e9fddd4ee9f3378126a454326d9c9c` |
| `vibe-os-library/solfeggio_396hz_liberation_2min.wav` | 17280044 | `7b05185171ad8039472d4691bd05453750ea8431b8cd24cccbbbc2ff7040eca2` |
| `vibe-os-library/solfeggio_639hz_heart_2min.wav` | 17280044 | `e1c2c83a248c26d8ea66c7abf48b1534772984bc2bae607f9a4deb7952637847` |
| `vibe-os-library/solfeggio_963hz_crown_2min.wav` | 17280044 | `8d780adbeed35a6a5a7e7473860bd134e1823be1dc5feb473d8a8dbb7df0d791` |
| `vibe-os-library/theta_meditation_3min.wav` | 51840044 | `f1884c1e27f435032ec94bf26ec97f8b0f50aa8fa8319f88387c9739752cef53` |
| `vibe-os-library/theta_with_pink_noise_3min.wav` | 51840044 | `528d993496c77d6e9f2e1c52e4bb4a4e9cc286a6a679558ff7a3b4e86458f6d2` |
