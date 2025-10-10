// types/index.ts

export type MerchantType =
  | 'amazon'
  | 'williams_sonoma'
  | 'kitchenaid_direct'
  | 'sur_la_table'
  | 'other';

export type CTAPositionType =
  | 'above_fold'
  | 'mid_article'
  | 'final_cta'
  | 'comparison_table'
  | 'related_products';

export type EmailSignupLocationType =
  | 'price_alert'
  | 'content_upgrade'
  | 'newsletter'
  | 'footer'
  | 'exit_intent';

export type InternalLinkType =
  | 'related_product'
  | 'bundle'
  | 'guide'
  | 'category'
  | 'blog';
