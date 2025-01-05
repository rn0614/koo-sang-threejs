import Stripe from "stripe";

export type StripeSubscriptionStatus =Stripe.Subscription.Status;
export type StripePriceType =Stripe.Price.Type;
export type StripePriceRecurringInterval =Stripe.Price.Recurring.Interval;
export type StripeAddress = Stripe.Address;
export type StripePaymentMethod = Stripe.PaymentMethod;
export type StripePaymentMethodType = Stripe.PaymentMethod.Type;
export type StripePaymentMetadata = Stripe.Metadata;