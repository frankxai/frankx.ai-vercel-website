# Workflow: /manage-auction

Manage incoming silent bids and proposals for active drops, select winning bids, draft replies, and update the website catalog.

---

## 1. Context & Setup
- **Trigger**: Run when a silent auction window closes, or when checking active silent bids.
- **Authoritative Data**: `data/auctions.json`
- **Target Audience**: High-value creators, developers, and enterprises applying for coaching or custom builds.

---

## 2. Execution Steps

### Step 1: Collect Bids & Proposals
1. Search your inbox, email exports, or the inbox folder (`_inbox/auctions/` if populated) for incoming bid proposals.
2. Extract the following fields for each bid:
   - Bidder Name & Email
   - Target Drop (e.g., Coaching or Custom ACOS Setup)
   - Bid Amount ($)
   - Project Outline & Situation

### Step 2: Grade & Filter Bids
Evaluate each proposal against the **FrankX Alignment Core**:
- **Financial Value**: Meets or exceeds the starting price.
- **Technical Fit**: The project involves Next.js, agent orchestration, OCI cloud design, or ACOS setup (Frank's core strengths).
- **Execution Feasibility**: The scope is clear and executable within standard timelines.

Create a summary table ranking the bids:
```markdown
| Bidder | Email | Bid Amount | Scope Summary | Alignment Score (1-10) |
| --- | --- | --- | --- | --- |
| ... | ... | ... | ... | ... |
```

### Step 3: Present to Frank for Decision
Provide the summary table to Frank along with the recommended winner. 
Wait for Frank's verbal or written sign-off before proceeding to the next step.

### Step 4: Draft Communication
Once the winner is approved:
1. **Winner Acceptance Draft**:
   - Confirm selection.
   - Outline next steps (scheduling link, custom Stripe payment link).
   - Voice: Technical, professional, encouraging.
2. **Polite Runner-up Drafts**:
   - Thank them for their proposal.
   - Explain that slots are highly limited.
   - Offer to add them to the priority waitlist for the next drop.

### Step 5: Update the Database
1. Open `data/auctions.json` using the replace or multi-replace tool.
2. Modify the target auction object:
   - Set `"status"` to `"completed"`.
   - Add `"winningBid"` (e.g., the selected bid amount).
   - Add `"acquiredBy"` (e.g., the winner's first name / company or "Anonymous Creator").
   - If a new round is planned, scaffold the next slot as `"upcoming"` or `"active"` with new dates.

### Step 6: Deploy & Sync
1. Run local verification gates:
   ```bash
   pnpm merge:gate
   ```
2. Commit the changes:
   ```bash
   git add data/auctions.json
   git commit -m "feat(auctions): close auction for [slug] with winning bid"
   ```
3. Deploy to production by syncing the updated `data/auctions.json` file to the `frankx.ai-vercel-website` repository.
