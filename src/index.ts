export interface Message {
  id: string;
  event: "listing-update" | "listing-delete";
  payload: Listing;
}

export interface Listing {
  /**
   * Pattern of appid_assetid for sell orders
   * appid_steamid64_md5(full item name)
   * full item name example: Burning Flames Team Captain
   */
  id: string;
  steamid: string;
  appid: number;
  currencies: Partial<Currencies> | CurrenciesCrosslist;
  value: Value;
  tradeOffersPreferred?: boolean;
  buyoutOnly?: boolean;
  details?: string;
  /** Timestamp in seconds */
  listedAt: number;
  /** Timestamp in seconds */
  bumpedAt: number;
  intent: "buy" | "sell";
  count: number;
  status: "active" | "archived";
  source: "userAgent" | "marketplaceTf" | "steam";
  item: Item;
  userAgent: UserAgent;
  user: User;
  promoted?: boolean;
  deal?: Deal;
}

export interface Item {
  appid: number;
  baseName: string;
  defindex: number;
  id: string | "";
  imageUrl: string;
  /** Unusual Scout Shako */
  marketName: string;
  /** Scorching Flames Scout Shako */
  name: string;
  origin: null | Origin;
  /**
   * "" for buy orders
   * "0" for sell orders made from fallback (?)
   * number as a string for sell orders
   */
  originalId: "0" | "" | string;
  price: Price;
  quality: Quality;
  elevatedQuality?: Quality;
  /** Level 3 Mask */
  summary: string;
  craftNumber?: number;
  killstreakTier?: number;
  sheen?: KillstreakDetails;
  killstreaker?: KillstreakDetails;
  level: number;
  strangeParts?: StrangePart[];
  class?: string[];
  slot?: "misc" | "taunt" | "primary" | "secondary" | "melee";
  killEaters?: KillEater[];
  australium?: boolean;
  particle?: Particle;
  crateSeries?: number;
  spells?: Spell[];
  tradable: boolean;
  craftable: boolean;
  craftedBy: CraftedBy;
  giftedBy: GiftedBy;
  /**
   * For unu effects, effect id (number) as a string
   */
  priceindex?: string;
  paint?: Paint;
  paintSecondaryHex?: string;
  tag?: null | Tag;
  texture?: Texture;
  wearTier?: WearTier;
  /** TODO */
  recipe?: any;
  /** TODO */
  style?: any;
  customName?: string;
  customDesc?: string;
  equipped?: Equipped[];
  tradableAfter?: number;
  festivized?: boolean;
  rarity: Rarity;
  marketplaceTfListing?: MarketplaceTfListing;
  dupe?: boolean;
  decal: Decal;
  quantity?: number;
  attributes?: Attribute2;
  medalNumber?: number;
  containedItem?: Item;
}

export interface Currencies {
  keys: number;
  metal: number;
}

export interface CurrenciesCrosslist {
  usd: number;
}

export function isCrosslistCurrencies(
  curr: Partial<Currencies> | CurrenciesCrosslist
): curr is CurrenciesCrosslist {
  return Object.hasOwnProperty.call(curr, "usd");
}

export interface Value {
  /**
   * Raw value in refined metal
   * eg: 2488.685
   */
  raw: number;
  /** 35.7 keys */
  short: string;
  /** 35 keys, 48.66 ref */
  long: string;
}

export interface Origin {
  id: number;
  name: string;
}

export interface Price {
  steam: {
    currency: "usd";
    /** "$0.29" / "$20.22" */
    short: string;
    /** "11.84 ref" / "825.31 ref, 11.84 keys" */
    long: string;
    /** Price in refined metal (raw, unrounded) */
    raw: number;
    /**
     * Price in cents
     * eg: $20.22 --> 2022
     */
    value: number;
  };
  /** Suggested price displayed on bp.tf for default item */
  community: {
    value: number;
    /** if suggested price is a range */
    valueHigh?: number;
    currency: "metal" | "keys";
    /** Price in refined metal (raw, unrounded) */
    raw: number;
    /** "10-11 keys" */
    short: string;
    /** "732.01 ref, $17.93" */
    long: string;
    /** price converted to usd */
    usd: number;
    /** timestamp in seconds */
    updatedAt: number;
    /**
     * Price difference in refined metal
     * between current suggested price and previous
     */
    difference: number;
  };
  /**
   * Suggested price + additional attributes
   * eg: paints, parts etc.
   */
  suggested: {
    /** Price in refined metal (raw, unrounded) */
    raw: number;
    /** "10.58 keys" */
    short: string;
    /** "737.42 ref, $18.07" */
    long: string;
    usd: number;
  };
}

export interface Quality {
  id: number;
  name: string;
  color: string;
}

export type Paint = Quality;

export type Rarity = Quality;

export interface Particle {
  id: number;
  name: string;
  shortName: string;
  imageUrl: string;
  type: string | "standard";
}

export interface UserAgent {
  client: string;
  /** timestamp in seconds */
  lastPulse: number;
}

export interface User {
  /** steamid64 */
  id: string;
  name: string;
  avatar: string;
  avatarFull: string;
  premium: boolean;
  online: boolean;
  banned: boolean;
  customNameStyle: string | "xmas" | "awesome1" | "awesome2" | "awesome3";
  acceptedSuggestions: number;
  class: string;
  style: string | "";
  role: null | Role;
  tradeOfferUrl: string;
  isMarketplaceSeller: boolean;
  flagImpersonated: null | boolean;
  bans: any[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  nameColor: string;
}

export interface KillEater {
  score: number;
  killEater: {
    id: number;
    name: string;
  };
}

export interface StrangePart {
  score: number;
  killEater: {
    id: number;
    name: string;
    /**
     * Item object of the applied strange part
     */
    item: Item;
  };
}

export interface CraftedBy {
  personaname: string;
  steamid: string;
}

type GiftedBy = CraftedBy;

export interface Deal {
  percent: number;
  value: number;
}

export interface Spell {
  id: string;
  /** Number as a string */
  spellId: string;
  /**
   * Name of the spell, not including "Halloween: "
   * eg: "Die Job", "Headless Horseshoes"
   */
  name: string;
  type: "paint" | "footsteps" | "weapon";
  /**
   * Defindex of the unapplied spell
   */
  defindex: number;
  /**
   * Color as hex
   * eg: "#8b00ff"
   * #8b00ff to decimal --> 9109759 (Headless Horseshoes)
   */
  color: string;
}

export interface KillstreakDetails {
  id: number;
  name: string;
}

export interface Texture {
  id: number;
  itemDefindex: number;
  rarity: Quality;
  name: string;
}

export interface WearTier {
  id: number;
  name: string;
  short: string;
}

export interface Tag {
  id: string;
  steamId: string;
  itemId: number;
  color: string;
  text: string;
}

export interface MarketplaceTfListing {
  value: number;
  raw: number;
  short: string;
  currency: string;
}

export interface Decal {
  url: string;
}

// https://gist.github.com/joekiller/9045906cd4419fab5f50e1f8775b050b
export interface Attribute2 {
  field: string;
  value: number | string;
}

export interface ApiItem {
  id: number;
  original_id: number;
  defindex: number;
  /**
   * Does not exist on buy orders
   * unless specified
   */
  level?: number;
  quality: number;
  inventory: number;
  quantity: number;
  origin: number;
  flag_cannot_craft?: boolean;
  custom_name?: string;
  custom_desc?: string;
  equipped?: Equipped[];
  style: number;
  attributes?: Attribute[];
}

export interface Equipped {
  class: number;
  slot: number;
}

export interface Attribute {
  defindex: number;
  value: number | string;
  float_value?: number;
}

export interface InputOutputAttribute extends Attribute {
  is_output: boolean;
  quantity: number;
  itemdef: number;
  quality: number;
  match_all_attribs?: boolean;
  attributes?: Attribute[];
}

export function isInputOutputAttribute(
  attr: Attribute
): attr is InputOutputAttribute {
  return Object.hasOwnProperty.call(attr, "is_output");
}

export interface SnapshotResponse {
  listings?: SnapshotListing[];
  appid: number;
  sku: string;
  createdAt: number;
}

export interface SnapshotListing {
  steamid: string;
  offers: 0 | 1;
  buyout: 0 | 1;
  details: string;
  intent: Intent;
  /** Timestamp in seconds */
  timestamp: number;
  /** Price in refined metal, using average key price if range (eg. 56.77-56.88 --> 56.825) */
  price: number;
  item: ApiItem;
  currencies: Partial<Currencies> | CurrenciesCrosslist;
  bump: number;
  userAgent?: UserAgent;
}

export type Intent = "buy" | "sell";
