"use client";

import { useStore } from "@/lib/store";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

function RenderPlans() {
  const plans = useStore((state) => state.subscriptionPlans);

  if (!plans) {
    return (
      <Card>
        <CardHeader>No Plans found</CardHeader>
        <CardContent>
          Please check back later or contact support for more information.
        </CardContent>
      </Card>
    );
  }

  const planItems = plans.data[0].items.data.map((plan, index) => {
    return (
      <Card className="relative" key={index}>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold">{plan.plan.nickname}</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">
                $ {plan.price.unit_amount}
              </span>
              <span className="text-muted-foreground ml-1">/year</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>All Individual benefits</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Monthly insider updates</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Recognition on our website</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Exclusive webinars</span>
            </li>
          </ul>
          <Link href={`/donate?t=m&pId=${plan.plan.id}`}>
            <Button className="w-full">Join Now</Button>
          </Link>
        </CardContent>
      </Card>
    );
  });

  return (
    <div
      className={
        planItems.length > 1
          ? "grid gap-8 md:grid-cols-3"
          : "flex w-full justify-center"
      }
    >
      {[...planItems]}
    </div>
  );
}

export { RenderPlans };
