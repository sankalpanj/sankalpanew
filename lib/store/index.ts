import Stripe from "stripe";

import { create } from "zustand";
import {
    createJSONStorage,
    devtools,
    persist,
    subscribeWithSelector,
} from "zustand/middleware";

interface State {
  subscriptionPlans: Stripe.Response<
    Stripe.ApiList<Stripe.Subscription>
  > | null;
}

interface Actions {
  setSubscriptionPlans: (
    plans: Stripe.Response<Stripe.ApiList<Stripe.Subscription>> | null
  ) => void;
}

const useStore = create<State & Actions>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          setSubscriptionPlans: (plans) => {
            set({ subscriptionPlans: plans });
          },
          subscriptionPlans: null,
        }),
        {
          name: "init-store",
          storage: createJSONStorage(() => localStorage),
          merge: (persistedState, currentState) => ({
            ...currentState,
            ...(persistedState as State & Actions),
          }),
        }
      )
    )
  )
);

export { useStore };
