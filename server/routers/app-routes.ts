import { db } from "@/lib/db";
import { contacts, members } from "@/lib/db/schema";
import { contactSchema, memberSchema } from "@/lib/zod-types";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { z } from "zod";
import { procedure, router } from "../trpc";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const appRouter = router({
  addMember: procedure
    .input(z.object({ payload: memberSchema }))
    .mutation(async ({ input: { payload } }) => {
      try {
        const records = await db
          .insert(members)
          .values({
            ...payload,
          })
          .returning();

        if (records.length > 0) {
          return {
            code: "SUCCESS",
            memberId: records[0].id,
          };
        }
        return { code: "FAILED", memberId: null };
      } catch (err) {
        console.log("MEMBER_ADD_ERROR: ", err);
        return { code: "FAILED", memberId: null };
      }
    }),
  getProfileDetails: procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input: { userId } }) => {
      try {
        const records = await db
          .select()
          .from(members)
          .where(eq(members.id, userId));

        if (records.length > 0) {
          const { success, data, error } = memberSchema.safeParse(records[0]);

          console.log(error);

          if (success) {
            return {
              code: "SUCCESS",
              data,
            };
          } else {
            return {
              code: "VALIDATION_ERROR",
              data: null,
            };
          }
        }
        return {
          code: "NOT_FOUND",
          data: null,
        };
      } catch (err) {
        console.log("getProfile error: ", err);
        throw err;
      }
    }),
  addContact: procedure
    .input(z.object({ payload: contactSchema }))
    .mutation(async ({ input: { payload } }) => {
      try {
        const { rowsAffected } = await db.insert(contacts).values(payload);
        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          } as const;
        }
        return {
          code: "FAILED",
        } as const;
      } catch (err) {
        console.log("ADD_CONTACT_ERROR: ", err);
        return {
          code: "FAILED",
        } as const;
      }
    }),
  getSubscriptionPlans: procedure.query(async () => {
    try {
      const plans = await stripe.subscriptions.list();
      if (plans.data.length === 0) {
        return { code: "NO_RECORDS", data: null } as const;
      }
      return { code: "SUCCESS", data: plans } as const;
    } catch (err) {
      console.log("getSubscriptionPlans error: ", err);
      return { code: "FAILED", data: null } as const;
    }
  }),
  createCustomer: procedure
    .input(
      z.object({
        paymentMethodId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        addressLine1: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        paymentMethodId,
        firstName,
        lastName,
        email,
        addressLine1,
        city,
        state,
        postalCode,
        country,
        userId,
      } = input;
      try {
        const customer = await stripe.customers.create({
          payment_method: paymentMethodId,
          name: `${firstName} ${lastName}`,
          email: email,
          description: `Payment from ${firstName} ${lastName} at ${dayjs().format(
            "MMM-DD-YYYY | hh:mm a"
          )}`,
          address: {
            line1: addressLine1,
            city: city,
            state: state,
            postal_code: postalCode,
            country: country,
          },
          metadata: {
            userId,
          },
        });

        return {
          code: "SUCCESS",
          data: customer,
        } as const;
      } catch (err) {
        console.error("Create Customer error: ", err);
        return {
          code: "FAILED",
          data: null,
        } as const;
      }
    }),
  createSubscription: procedure
    .input(
      z.object({
        customerId: z.string(),
        priceId: z.string(),
        paymentMethodId: z.string(),
        currency: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { currency, customerId, paymentMethodId, priceId, userId } = input;
      const payload: Stripe.SubscriptionCreateParams = {
        customer: customerId,
        default_payment_method: paymentMethodId,
        items: [
          {
            price: priceId,
          },
        ],
        currency,
        metadata: {
          userId,
        },
      };

      try {
        const subscription = await stripe.subscriptions.create({
          ...payload,
        });

        return {
          code: "SUCCESS",
          data: subscription,
        } as const;
      } catch (err) {
        console.log("create subscription error: ", err);
        return {
          code: "FAILED",
          data: null,
        } as const;
      }
    }),
});

export type AppRouter = typeof appRouter;
