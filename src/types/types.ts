import { Database } from "./types_db";
// import {
//   StripeAddress,
//   StripePaymentMethod,
//   StripePaymentMethodType,
//   StripePaymentMetadata,
//   StripePriceType,
//   StripePriceRecurringInterval,
//   StripeSubscriptionStatus
// } from "./stripe_type";
export type ResultType = {
  code: number;
  message: string;
};

export type APItestRequest = {
  id: number;
  name: string;
};

type TimeScheduleDto = Database["public"]["Tables"]["schedule_no_rls"]["Row"];
export type TimeSchedule = TimeScheduleDto & {
  isChange?: boolean;
};

export type Song = {
  id: number;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
};

export type userDetails = {
  id: string;
  first_name: string;
  laste_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: any; //StripeAddress;
  payment_method?: any; //StripePaymentMethod[StripePaymentMethodType];
};

export type Product = {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadate?: any; //StripePaymentMetadata;
};

export type Price = {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: any; //StripePriceType;
  interval?: any; //StripePriceRecurringInterval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: any; //StripePaymentMetadata;
  products?: Product;
};

export type Subscription = {
  id: string;
  user_id: string;
  status: any; //StripeSubscriptionStatus;
  metadata?: any; //StripePaymentMetadata;
  price_id: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: string;
};
