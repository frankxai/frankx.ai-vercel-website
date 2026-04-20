# Chapter 2: Protocols, Not Platforms

> "Protocols are the lingua franca of decentralized systems. They allow independent actors to coordinate without trusting each other."
> -- Chris Dixon, Read Write Own

---

## I. The Architecture That Shapes Everything

Every system you interact with on the internet is built on one of two architectural models: platforms or protocols. The distinction sounds academic. It is not. It determines who owns your data, who controls your distribution, who captures your revenue, and whether the system serves its users or its operators.

Most people do not think about this distinction because the dominant systems of the past fifteen years have all been platforms. Google, Meta, Amazon, Apple, Spotify, YouTube -- these are platforms. They provide services. They control access. They extract value. They are extraordinarily good at what they do, and what they do is centralize.

But the internet itself is not a platform. It is a collection of protocols. And the difference between a protocol and a platform is the difference between a public road and a private toll bridge.

---

## II. Defining the Terms

A **platform** is a centralized service operated by a single entity that mediates interactions between users. The operator controls the rules, the data, the algorithms, and the economics. Users get access to the platform's capabilities in exchange for accepting the platform's terms. The platform can change those terms at any time. Examples: Instagram, YouTube, Spotify, Uber, Airbnb.

A **protocol** is a set of rules that enables independent participants to communicate and transact without requiring a central operator. No single entity controls the rules, the data, or the economics. Anyone can build on a protocol, and no one can revoke access to it. Examples: SMTP (email), HTTP (the web), TCP/IP (internet connectivity), Bitcoin (value transfer), Ethereum (programmable transactions).

The distinction is not philosophical. It is architectural. And architecture has consequences.

**Email is a protocol.** SMTP (Simple Mail Transfer Protocol) was defined in 1982. It specifies how email messages are formatted, routed, and delivered between servers. Anyone can run an email server. Anyone can send email to anyone else. No single company controls email. Google operates Gmail, which is a platform built on the email protocol -- but if Google shut down Gmail tomorrow, email would continue to function. Your email address is portable (in principle, if not always in practice). Your messages are stored on servers you can choose and control. No one can "demonetize" your email or change the algorithm that determines whether your messages arrive.

**Social media is a platform.** Instagram is operated by Meta. Meta controls the feed algorithm, the content policies, the API access, the data retention, and the advertising economics. If Meta shut down Instagram, Instagram would cease to exist. Your followers would be gone. Your content would be gone. Your verification status, your engagement history, your direct messages -- all gone. There is no underlying protocol that would continue to function. There is no way to take your Instagram identity to a competing service. Instagram is not built on a social protocol. Instagram is the protocol, the platform, and the landlord, all in one.

This asymmetry is the root cause of the ownership problem described in the previous chapter. And it is the asymmetry that Web3 protocols are designed to eliminate.

---

## III. Why Protocols Create Different Incentives

The incentive structure of platforms and protocols diverges fundamentally, and understanding this divergence is essential for evaluating Web3's creator infrastructure.

**Platform incentives**: A platform's primary obligation is to its shareholders (or, in the case of private companies, its investors and founders). The platform is incentivized to maximize engagement, data collection, and revenue extraction. Users and creators are inputs to this process, not beneficiaries of it. When a platform's interest conflicts with a creator's interest -- and it inevitably does -- the platform wins, because the platform controls the infrastructure.

Consider YouTube's recommendation algorithm. YouTube is incentivized to maximize watch time, because watch time drives ad revenue. A creator producing high-quality, concise content that respects viewers' time is actively working against the platform's economic interest. The algorithm does not reward quality. It rewards retention. These are not the same thing, and the difference costs creators billions of dollars in potential revenue annually.

**Protocol incentives**: A protocol has no shareholders, no revenue targets, and no engagement metrics. A protocol is a set of rules. SMTP does not care whether you send one email or one million. HTTP does not care whether your website gets ten visitors or ten million. The protocol provides capability. What you do with that capability is your decision, governed by your incentives, not the protocol's.

This does not mean protocols are perfect. They can be poorly designed, technically limited, or economically unsustainable. The early history of the internet is littered with failed protocols. But the incentive alignment is fundamentally different: protocols serve their users by design, because protocols have no competing economic interest.

Web3 protocols add a crucial dimension that earlier internet protocols lacked: programmable economics. Ethereum is not just a communication protocol. It is a protocol that can execute financial logic -- transfers, escrow, revenue splits, subscription management, royalty payments -- without requiring a trusted intermediary. This is the capability that makes Web3 relevant to creators. Not the speculation, not the NFT hype, not the token prices. The ability to encode economic relationships in protocol-level infrastructure that no platform controls.

---

## IV. The Web3 Creator Stack

If we are serious about replacing platform infrastructure with protocol infrastructure for creators, we need to specify what that stack looks like. Not in abstract terms. In concrete, deployable, currently-operational technology.

The Web3 creator stack has four layers. Each layer corresponds to a capability that platforms currently provide and control. Each layer has multiple protocol implementations at various stages of maturity.

### Layer 1: Settlement -- Ethereum (and L2s)

The settlement layer is where ownership is recorded and economic transactions execute. In the platform model, this is the platform's database and payment processor. In the protocol model, this is a blockchain.

Ethereum is the dominant settlement layer for creator-oriented Web3 applications. It provides three capabilities that matter:

1. **Immutable ownership records.** When a creator mints an NFT or a fan purchases one, the ownership is recorded on Ethereum's ledger. This record cannot be altered, revoked, or deleted by any entity. It persists as long as the Ethereum network operates.

2. **Programmable transactions.** Smart contracts -- self-executing programs deployed on Ethereum -- can encode complex economic logic. Automatic royalty payments on secondary sales. Revenue splits between collaborators. Subscription management with transparent terms. These execute at the protocol level, without requiring a platform to process them.

3. **Composability.** Any smart contract on Ethereum can interact with any other smart contract. A creator's NFT contract can integrate with a marketplace contract, a governance contract, a revenue-sharing contract, and a social graph contract -- all without permission from any of them. This is the "Lego" property of protocols: independent pieces that snap together because they share a common interface standard.

The primary limitation of Ethereum as a settlement layer is cost. Executing transactions on Ethereum's main network (Layer 1) requires paying gas fees that can range from a few dollars to hundreds of dollars during high-demand periods. For a creator minting a $5 membership pass, a $15 gas fee is economically prohibitive.

Layer 2 networks (L2s) address this. Base (built by Coinbase), Optimism, Arbitrum, and Zora Network are execution environments that process transactions off Ethereum's main chain but inherit its security guarantees. Transaction costs on L2s typically range from $0.01 to $0.10 -- economically viable for creator-scale transactions.

### Layer 2: Storage -- IPFS and Arweave

The storage layer is where content actually lives -- the files, the media, the metadata. In the platform model, content lives on the platform's servers. In the protocol model, content lives on decentralized storage networks.

**IPFS (InterPlanetary File System)** is a peer-to-peer storage protocol. When you upload a file to IPFS, it receives a content-addressed identifier (CID) -- a hash derived from the file's contents. This CID is permanent: the same file always produces the same CID, and the CID can be used to retrieve the file from any IPFS node that has it. No central server. No single point of failure.

The critical limitation of IPFS is persistence. IPFS nodes only store files they have been asked to store ("pin"). If no node is pinning a file, it will eventually be garbage-collected and become unavailable. Pinning services (Pinata, Infura, nft.storage) provide persistent storage on IPFS, but they are centralized services -- reintroducing the dependency on a single operator that protocols are designed to eliminate.

**Arweave** takes a different approach: permanent storage with a one-time payment. When you upload a file to Arweave, you pay a single fee (currently a fraction of a cent per kilobyte) and the file is stored permanently across Arweave's decentralized network. The economic model uses a storage endowment: fees are invested to pay for storage costs over time, with the declining cost of storage providing long-term sustainability.

For creators, the storage layer question is: where does your content live when the platform disappears? On IPFS or Arweave, the answer is: everywhere and nowhere in particular. No single entity controls it. No single failure can destroy it. The tradeoff is that decentralized storage is currently slower, more complex, and less feature-rich than centralized alternatives. These are engineering challenges, not architectural limitations -- and they are being actively addressed.

### Layer 3: Social -- Lens Protocol and Farcaster

The social layer is where audience relationships, reputation, and social interactions live. In the platform model, this is Instagram's follower graph, YouTube's subscriber list, Twitter's follow network. In the protocol model, this is a decentralized social graph that the creator owns and can take anywhere.

**Lens Protocol** (built by the Aave team, deployed on Polygon) represents social relationships as on-chain data structures. Your profile is an NFT you own. Your followers are recorded in a smart contract you control. Your posts are published to a decentralized content network. Any application can read your social graph and display your content -- and no application can revoke your profile or followers.

The implications for creators are significant: if you build an audience on a Lens-based application and that application shuts down, your audience relationships persist. A new application can read the same social graph and display the same content. Your followers are yours, at the protocol level, not because an application generously chooses to let you export them.

**Farcaster** takes a hybrid approach: a "sufficiently decentralized" social protocol where identity is on-chain (Ethereum) but content is distributed through a network of hub servers. Farcaster prioritizes performance and user experience over maximum decentralization, making a deliberate engineering tradeoff. The protocol stores identity and key social data on Ethereum, while content propagates through a peer-to-peer network of hubs that anyone can operate.

Both protocols are early. Lens has approximately 350,000 profiles. Farcaster has approximately 500,000 registered users. Compare this to Instagram's 2 billion. The scale gap is enormous. But the architectural difference -- user-owned social graphs versus platform-owned social graphs -- is structural, and structural advantages compound over time.

### Layer 4: Content -- Zora, Sound.xyz, Mirror

The content layer is where creative work is published, distributed, and monetized. In the platform model, this is YouTube, Spotify, Medium, Substack. In the protocol model, this is a set of smart contracts and interfaces that let creators publish directly to the blockchain.

**Zora** is a protocol for creating and collecting media on-chain. Creators can mint any media (images, video, audio, text) as NFTs with configurable economics -- free mints, fixed-price mints, auction-based mints. Zora operates its own L2 (Zora Network) where minting costs are fractions of a cent. The protocol has processed over 100 million mints. Zora takes a small protocol fee on paid mints but does not control content distribution, creator access, or audience relationships.

**Sound.xyz** is a music-specific platform built on Ethereum and its L2s. Artists release songs as limited-edition NFTs (typically 25-500 editions). Collectors purchase these editions, directly supporting the artist. Sound artists have collectively earned millions of dollars in direct sales -- not advertising revenue mediated by a platform, but direct payments from fans who value the work enough to own it. The average earning per release on Sound.xyz significantly exceeds what the equivalent number of Spotify streams would generate.

**Mirror.xyz** is a writing platform built on Ethereum and Arweave. Writers publish essays as on-chain content, with optional NFT minting for collectors. Content is stored on Arweave (permanent) with metadata on Ethereum. Mirror demonstrated that written content could follow the same ownership model as visual art and music: the writer owns the work, the infrastructure is protocol-level, and the economics flow directly between creator and audience.

---

## V. Composability -- The Architectural Superpower

The most important property of protocol-based infrastructure is composability: the ability of independent components to interact without permission, integration agreements, or platform approval.

In the platform model, integration is controlled. If you want YouTube data to appear in your app, you need YouTube's API key, which YouTube can revoke. If you want to process payments on Instagram, you need Meta's approval. If you want to build a tool for Spotify artists, you are subject to Spotify's developer terms, which change at Spotify's discretion.

In the protocol model, composability is permissionless. A creator's NFT contract on Ethereum can interact with any marketplace, any governance system, any revenue-splitting contract, any social graph -- without asking anyone for permission. The interfaces are public. The data is public. The interaction logic is defined by open standards (ERC-721, ERC-1155, ERC-20) that anyone can implement.

This matters for creators because composability is how ecosystems emerge. Consider what becomes possible when a creator's content, audience, and economics all live on composable protocols:

- A musician mints a song on Sound.xyz. A podcast platform reads the same NFT contract and automatically licenses the song for use in podcasts, with royalties flowing through the same smart contract. No licensing negotiation. No platform approval. Protocol-level composability.

- A writer publishes an essay on Mirror. A curation platform reads the same content from Arweave and surfaces it to relevant readers, with the writer's Lens social graph providing the reputation signal. No editorial gatekeeper. No algorithm. Composable infrastructure.

- A visual artist creates a collection on Zora. A DAO treasury contract automatically purchases works that match its collection criteria. The artist receives payment. The DAO receives governance rights. The entire transaction executes in a single atomic operation on Ethereum. No gallery. No agent. No platform taking 50%.

These are not hypothetical. Each of these patterns has been implemented, deployed, and used by real creators on existing protocol infrastructure. They are also early, limited, and far from mainstream adoption. The composability is real. The scale is not yet there. Both things are true simultaneously.

---

## VI. The Web3 Creator Stack -- Architecture Diagram

```
+------------------------------------------------------------------+
|                    APPLICATION LAYER                               |
|  Zora Mint Page | Sound.xyz | Mirror | Lens Apps | Farcaster Apps |
+------------------------------------------------------------------+
         |              |           |          |            |
+------------------------------------------------------------------+
|                    CONTENT LAYER                                   |
|  Zora Protocol | Sound Protocol | Mirror Protocol                 |
|  (Minting, pricing, editions, royalties)                          |
+------------------------------------------------------------------+
         |              |           |
+------------------------------------------------------------------+
|                    SOCIAL LAYER                                    |
|  Lens Protocol (profiles, follows, content graph)                 |
|  Farcaster Protocol (identity, casts, channels)                   |
+------------------------------------------------------------------+
         |              |
+------------------------------------------------------------------+
|                    STORAGE LAYER                                   |
|  IPFS (content-addressed, pinned)                                 |
|  Arweave (permanent, endowment-funded)                            |
+------------------------------------------------------------------+
         |
+------------------------------------------------------------------+
|                    SETTLEMENT LAYER                                |
|  Ethereum L1 (high-value, identity, governance)                   |
|  L2s: Base, Optimism, Zora Network (low-cost transactions)        |
+------------------------------------------------------------------+
```

Each layer is independent, open, and composable. No single entity controls any layer. Applications at the top can be replaced without affecting the data, relationships, or economics at the lower layers. This is the structural guarantee that platforms cannot provide: the persistence of the creator's assets, relationships, and revenue infrastructure independent of any single application's existence.

---

## VII. The Honest Tradeoffs

Protocol architecture solves the ownership problem. It does not solve every problem. And intellectual honesty requires acknowledging the tradeoffs that come with this architectural choice.

**User experience.** Protocol-based applications are currently harder to use than platform applications. Wallet management, gas fees, transaction confirmations, key custody -- these introduce friction that platforms have spent fifteen years eliminating. The UX gap is real, and it is the primary barrier to mainstream creator adoption. It is also an engineering problem with known solutions (account abstraction, social recovery, gasless transactions) that are being actively deployed.

**Discovery.** Platforms are extraordinary at discovery. YouTube's recommendation algorithm surfaces relevant content to billions of users with remarkable precision. Protocol-based systems have no equivalent. Decentralized discovery remains an unsolved problem. The composability of protocols makes it technically possible -- any application can read any content from the protocol layer -- but no one has yet built a discovery system that matches platform-scale recommendation engines.

**Scale.** Ethereum processes approximately 15-30 transactions per second on L1. Layer 2 networks increase this to thousands of transactions per second. This is sufficient for current Web3 creator activity but orders of magnitude below what would be needed if Web3 creator tools reached platform-scale adoption. Scaling is an active area of research and development, with meaningful progress (rollups, data availability sampling, sharding) -- but it is not yet solved at internet scale.

**Legal clarity.** The regulatory environment for blockchain-based creative assets is unclear in most jurisdictions. NFTs may or may not be securities. DAOs may or may not be legal entities. Smart contract revenue may or may not be subject to specific tax treatments. This uncertainty creates real risk for creators who adopt protocol-based infrastructure.

These tradeoffs are real. They are not reasons to dismiss the protocol architecture. They are reasons to understand it precisely -- its capabilities, its limitations, and its trajectory. The following chapters examine each component of the Web3 creator stack in detail, with the same engineering rigor applied to both the promise and the problems.

---

## VIII. The Architectural Thesis

The argument of this book is not that protocols are perfect and platforms are evil. The argument is that the ownership problem described in Chapter 1 is a structural consequence of platform architecture, and it can only be solved by a structural shift to protocol architecture.

Platforms give creators reach. Protocols give creators ownership. These are different things, and for the first time in the history of digital creative work, it is technically possible to have both.

The next chapter examines the most misunderstood component of the Web3 creator stack: NFTs. Not the speculative mania of 2021. Not the cartoon apes. The actual technology -- what it does, how it works, and what it means for creators who want to own their work at the infrastructure level.

---

*The Decentralized Creator -- Chapter 2 of 12*
*Book 1 of the Web3 Builder Series by Frank Riemer*
