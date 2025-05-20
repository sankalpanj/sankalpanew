"use client";

import { useStore } from "@/lib/store";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";

function AppOrchestrator() {
  const setSubscriptionPlans = useStore((state) => state.setSubscriptionPlans);

  trpc.getSubscriptionPlans.useQuery(undefined, {
    retry(failureCount) {
      return failureCount < 2;
    },
    onSettled: (plans) => {
      if (plans) {
        const { code, data } = plans;

        if (code === "NO_RECORDS") {
          toast.info("No plans found");
        } else if (code === "FAILED") {
          toast.error("Something went wrong", {
            description:
              "Cannot fetch subscription plans at the moment. Please try again later.",
          });
        }
        if (data) {
          setSubscriptionPlans(data);
        }
      }
    },
    refetchOnWindowFocus: false,
  });

  return null;
}

export { AppOrchestrator };
