"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, CreditCard } from "lucide-react"

// Sample subscription data
const subscriptionData = {
  plan: "Premium",
  status: "Active",
  billingCycle: "Monthly",
  nextBillingDate: "April 1, 2025",
  amount: "$49.99",
  startDate: "October 1, 2024",
  paymentMethod: {
    type: "Credit Card",
    last4: "4242",
    expiry: "09/27",
  },
  features: [
    "Unlimited access to all events",
    "Priority registration for workshops",
    "Exclusive content and resources",
    "Monthly newsletter",
    "Discounted merchandise",
  ],
  usage: {
    events: {
      used: 4,
      total: 10,
      label: "Event Registrations",
    },
    downloads: {
      used: 15,
      total: 50,
      label: "Resource Downloads",
    },
  },
}

// Available plans for upgrade/downgrade
const availablePlans = [
  {
    id: "basic",
    name: "Basic",
    price: "$19.99",
    cycle: "monthly",
    features: ["Access to select events", "Basic resources", "Monthly newsletter"],
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49.99",
    cycle: "monthly",
    features: [
      "Unlimited access to all events",
      "Priority registration for workshops",
      "Exclusive content and resources",
      "Monthly newsletter",
      "Discounted merchandise",
    ],
    recommended: true,
    current: true,
  },
  {
    id: "pro",
    name: "Professional",
    price: "$99.99",
    cycle: "monthly",
    features: [
      "All Premium features",
      "One-on-one consultations",
      "Early access to new programs",
      "Dedicated support",
      "Free merchandise annually",
      "Bring a guest to events",
    ],
    recommended: false,
  },
]

export default function SubscriptionsTab() {
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscription</h2>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Details about your current subscription</CardDescription>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{subscriptionData.plan}</h3>
                  <p className="text-muted-foreground">{subscriptionData.billingCycle} billing</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{subscriptionData.amount}</p>
                  <p className="text-sm text-muted-foreground">Next billing on {subscriptionData.nextBillingDate}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Plan Features</h4>
                <ul className="space-y-2">
                  {subscriptionData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Usage This Month</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{subscriptionData.usage.events.label}</span>
                      <span className="text-sm font-medium">
                        {subscriptionData.usage.events.used} of {subscriptionData.usage.events.total}
                      </span>
                    </div>
                    <Progress
                      value={(subscriptionData.usage.events.used / subscriptionData.usage.events.total) * 100}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{subscriptionData.usage.downloads.label}</span>
                      <span className="text-sm font-medium">
                        {subscriptionData.usage.downloads.used} of {subscriptionData.usage.downloads.total}
                      </span>
                    </div>
                    <Progress
                      value={(subscriptionData.usage.downloads.used / subscriptionData.usage.downloads.total) * 100}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog open={isChangePlanOpen} onOpenChange={setIsChangePlanOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Plan</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Change Subscription Plan</DialogTitle>
                    <DialogDescription>Choose the plan that works best for you</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {availablePlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative rounded-lg border p-4 ${
                          plan.current ? "border-primary bg-primary/5" : "hover:border-primary"
                        }`}
                      >
                        {plan.recommended && <Badge className="absolute -top-2 -right-2">Recommended</Badge>}
                        {plan.current && (
                          <Badge variant="outline" className="absolute -top-2 -right-2 border-primary text-primary">
                            Current Plan
                          </Badge>
                        )}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{plan.name}</h3>
                            <p className="text-muted-foreground text-sm">Billed {plan.cycle}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{plan.price}</p>
                            <p className="text-muted-foreground text-sm">per month</p>
                          </div>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full"
                          variant={plan.current ? "outline" : "default"}
                          disabled={plan.current}
                        >
                          {plan.current ? "Current Plan" : "Select Plan"}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsChangePlanOpen(false)}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Cancel Subscription
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will cancel your subscription at the end of your current billing period. You will lose access
                      to premium features after {subscriptionData.nextBillingDate}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600">Cancel Subscription</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Recent invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">March 1, 2025</p>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$49.99</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">February 1, 2025</p>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$49.99</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">January 1, 2025</p>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$49.99</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Invoices
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="bg-muted rounded-md p-2">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{subscriptionData.paymentMethod.type}</p>
                  <p className="text-sm text-muted-foreground">
                    Ending in {subscriptionData.paymentMethod.last4} • Expires {subscriptionData.paymentMethod.expiry}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isPaymentMethodOpen} onOpenChange={setIsPaymentMethodOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Payment Method</DialogTitle>
                    <DialogDescription>Add a new payment method or update your existing one</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="rounded-lg border p-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted rounded-md p-2">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Credit Card</p>
                          <p className="text-sm text-muted-foreground">Update your credit card information</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      For security reasons, we'll redirect you to our secure payment page to update your payment
                      information.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPaymentMethodOpen(false)}>
                      Cancel
                    </Button>
                    <Button>Continue to Secure Page</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>John Doe</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>john.doe@example.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p>123 Main Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Update Billing Information
              </Button>
            </CardFooter>
          </Card>

          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Plan</p>
                  <p>{subscriptionData.plan}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Billing Cycle</p>
                  <p>{subscriptionData.billingCycle}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p>{subscriptionData.startDate}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Next Billing</p>
                  <p>{subscriptionData.nextBillingDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

