/**
 * The single registry of products `/api/checkout` can sell.
 *
 * Every product ships closed. Opening one is a status edit in a reviewed PR,
 * and `lib/checkout-gate.ts` enforces it before Stripe is called. The viewer
 * reads this same registry so an account offer cannot claim availability that
 * checkout would refuse.
 */

export const NOT_FOR_SALE = "pre-stage (not for sale)";

export type CheckoutProduct = {
  name: string;
  /** Env var that holds the Stripe price id, not the value itself. */
  priceEnv: string;
  amount: number;
  status: string;
};

export const CHECKOUT_PRODUCTS: Record<string, CheckoutProduct> = {
  "creative-ai-toolkit": {
    name: "Creative AI Toolkit",
    priceEnv: "STRIPE_PRICE_TOOLKIT",
    amount: 4700,
    status: NOT_FOR_SALE,
  },
  "agentic-creator-os": {
    name: "ACOS Creator Kit",
    priceEnv: "STRIPE_PRICE_ACOS",
    amount: 4700,
    status: NOT_FOR_SALE,
  },
  "suno-prompt-library": {
    name: "Suno Prompt Pack",
    priceEnv: "STRIPE_PRICE_SUNO",
    amount: 2900,
    status: NOT_FOR_SALE,
  },
  "system-architect-starter-kit": {
    name: "System Architect Starter Kit",
    priceEnv: "STRIPE_PRICE_SYSTEM_ARCHITECT",
    amount: 9700,
    status: NOT_FOR_SALE,
  },
  "visual-creation-loop": {
    name: "Visual Creation Loop",
    priceEnv: "STRIPE_PRICE_VISUAL_LOOP",
    amount: 14700,
    status: NOT_FOR_SALE,
  },
  "income-architecture-blueprint": {
    name: "Income Architecture Blueprint",
    priceEnv: "STRIPE_PRICE_INCOME_ARCH",
    amount: 6700,
    status: NOT_FOR_SALE,
  },
  "dpi-field-kit": {
    name: "DPI Field Kit: Wealth Substrate Pro",
    priceEnv: "STRIPE_PRICE_DPI_KIT",
    amount: 9700,
    status: NOT_FOR_SALE,
  },
  "agent-fleet-pro": {
    name: "Agent Fleet Pro",
    priceEnv: "STRIPE_PRICE_FLEET_PRO",
    amount: 14700,
    status: NOT_FOR_SALE,
  },
  "memory-palace-os": {
    name: "The Sovereign Memory Palace OS",
    priceEnv: "STRIPE_PRICE_MEMORY_PALACE",
    amount: 9700,
    status: NOT_FOR_SALE,
  },
  "agentic-media-machine": {
    name: "The Agentic Media Machine",
    priceEnv: "STRIPE_PRICE_MEDIA_MACHINE",
    amount: 9700,
    status: NOT_FOR_SALE,
  },
  "agentic-content-engine": {
    name: "Agentic Content Engine",
    priceEnv: "STRIPE_PRICE_AGENTIC_CONTENT",
    amount: 9700,
    status: NOT_FOR_SALE,
  },
  "starlight-operator-pack": {
    name: "Starlight Operator Field Kit",
    priceEnv: "STRIPE_PRICE_OPERATOR_PACK",
    amount: 9700,
    status: NOT_FOR_SALE,
  },
  "aurora-ui-kit": {
    name: "Aurora UI Kit",
    priceEnv: "STRIPE_PRICE_AURORA",
    amount: 1900,
    status: NOT_FOR_SALE,
  },
  "founders-circle-guild": {
    name: "Founders Circle Guild",
    priceEnv: "STRIPE_PRICE_FOUNDERS_GUILD",
    amount: 299700,
    status: NOT_FOR_SALE,
  },
  "creation-chronicles": {
    name: "Creation Chronicles",
    priceEnv: "STRIPE_PRICE_CHRONICLES",
    amount: 49700,
    status: NOT_FOR_SALE,
  },
  "command-center-template": {
    name: "The Command Center Template",
    priceEnv: "STRIPE_PRICE_COMMAND_CENTER",
    amount: 49700,
    status: NOT_FOR_SALE,
  },
};
