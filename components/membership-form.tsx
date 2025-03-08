"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import dayjs from "dayjs";
import { CalendarIcon, Check, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomDatePicker from "./date-picker";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const memberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Invalid telephone number"),
  dob: z.date().nullable(),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{4,6}$/, "Invalid ZIP code format"),
  occupation: z.string().optional(),
  profilePhoto: z.string().nullable(),
});

const childSchema = z
  .object({
    hasChild: z.boolean(),
    children: z.array(
      z.object({
        name: z.string().min(1, "Child's name is required"),
        age: z.preprocess(
          (value) => Number(value),
          z.number().positive("Age must be a positive integer")
        ),
        gender: z.string().min(1, "Gender is required"),
      })
    ),
  })
  .refine(
    (data) => {
      if (data.hasChild) {
        return data.children.every(
          (child) => child.name && child.age && child.gender
        );
      }
      return true;
    },
    {
      message: "All child fields are required if hasChild is true",
      path: ["children"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.hasChild) {
      data.children.forEach((child, index) => {
        if (!child.name) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Child's name is required",
            path: ["children", index, "name"],
          });
        }
        if (!child.age) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Child's age is required",
            path: ["children", index, "age"],
          });
        }
        if (!child.gender) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Child's gender is required",
            path: ["children", index, "gender"],
          });
        }
      });
    }
  });

const spouseSchema = z
  .object({
    hasSpouse: z.boolean(),
    spouseFirstName: z.string().nullable().optional(),
    spouseLastName: z.string().nullable().optional(),
    spouseDob: z.date().nullable(),
    spouseEmail: z.string().email("Invalid email format").nullable().optional(),
    spousePhone: z.string().nullable().optional(),
    spouseOccupation: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.hasSpouse) {
        return (
          data.spouseFirstName &&
          data.spouseLastName &&
          data.spouseDob &&
          data.spouseEmail &&
          data.spousePhone
        );
      }
      return true;
    },
    {
      message: "All spouse fields are required if hasSpouse is true",
      path: [
        "spouseFirstName",
        "spouseLastName",
        "spouseDob",
        "spouseEmail",
        "spousePhone",
      ],
    }
  )
  .superRefine((data, ctx) => {
    if (data.hasSpouse) {
      if (!data.spouseFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Spouse's first name is required",
          path: ["spouseFirstName"],
        });
      }
      if (!data.spouseLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Spouse's last name is required",
          path: ["spouseLastName"],
        });
      }
      if (!data.spouseDob) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Spouse's date of birth is required",
          path: ["spouseDob"],
        });
      }
      if (!data.spouseEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Spouse's email is required",
          path: ["spouseEmail"],
        });
      }
      if (!data.spousePhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Spouse's phone number is required",
          path: ["spousePhone"],
        });
      }
    }
  });

interface Props {
  open: boolean;
  close: VoidFunction;
}

export default function MemberRegistrationPage({ open, close }: Props) {
  const [step, setStep] = useState(1);

  const memberForm = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: null,
      gender: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      occupation: "",
      profilePhoto: null,
    },
  });

  const spouseForm = useForm<z.infer<typeof spouseSchema>>({
    resolver: zodResolver(spouseSchema),
    defaultValues: {
      hasSpouse: false,
      spouseFirstName: null,
      spouseLastName: null,
      spouseDob: null,
      spouseEmail: null,
      spousePhone: null,
      spouseOccupation: null,
    },
  });

  const childrenForm = useForm<z.infer<typeof childSchema>>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      hasChild: false,
      children: [
        {
          name: "",
          age: 0,
          gender: "",
        },
      ],
    },
  });

  async function nextStep() {
    if (step === 1) {
      const status = await memberForm.trigger();

      if (!status) return;
    } else if (step === 2) {
      const status = await spouseForm.trigger();
      if (!status) return;
    } else if (step === 3) {
      const status = await childrenForm.trigger();
      if (!status) return;
    }

    setStep(step + 1);
  }

  const prevStep = () => {
    setStep(step - 1);
  };

  function removeChild(index: number): void {
    const { children } = childrenForm.getValues();
    const updatedChildren = children.filter((_, i) => i !== index);
    childrenForm.setValue("children", updatedChildren);
  }

  function addChild(): void {
    const { children } = childrenForm.getValues();
    childrenForm.setValue("children", [
      ...children,
      { name: "", age: 0, gender: "" },
    ]);
  }
  return (
    <Dialog open={open} onOpenChange={close} modal={true}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>Membership Details</DialogHeader>
        <div className="flex flex-col h-auto w-full">
          <main className="flex-1">
            <div className="w-full">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                    </div>
                    <span className="text-sm mt-1">Personal</span>
                  </div>

                  <div className="flex-1 flex items-center mx-2">
                    <div
                      className={`h-1 w-full ${
                        step >= 2 ? "bg-primary" : "bg-muted"
                      }`}
                    ></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= 2
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                    </div>
                    <span className="text-sm mt-1">Spouse</span>
                  </div>

                  <div className="flex-1 flex items-center mx-2">
                    <div
                      className={`h-1 w-full ${
                        step >= 3 ? "bg-primary" : "bg-muted"
                      }`}
                    ></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= 3
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > 3 ? <Check className="h-5 w-5" /> : "3"}
                    </div>
                    <span className="text-sm mt-1">Children</span>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 1 && "Personal Details"}
                    {step === 2 && "Spouse Details"}
                    {step === 3 && "Children Details"}
                  </CardTitle>
                  <CardDescription>
                    {step === 1 && "Please provide your personal information"}
                    {step === 2 &&
                      "Please provide information about your spouse (if applicable)"}
                    {step === 3 &&
                      "Please provide information about your children (if applicable)"}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {step === 1 && (
                    <Form {...memberForm}>
                      <form onSubmit={memberForm.handleSubmit((values) => {})}>
                        <div className="space-y-4">
                          {/* <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          {formData.profilePhoto ? (
                            <Image
                              src={formData.profilePhoto || "/placeholder.svg"}
                              alt="Profile"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User className="h-16 w-16 text-muted-foreground" />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white"
                            >
                              <Upload className="h-5 w-5 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      </div> */}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={memberForm.control}
                              name="firstName"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="eg. Jhon"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={memberForm.control}
                              name="lastName"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="eg. Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <FormField
                              control={memberForm.control}
                              name="email"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="eg. test@example.com"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <FormField
                              control={memberForm.control}
                              name="phone"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder="eg. 123456780"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={memberForm.control}
                              name="dob"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <FormControl>
                                      {/* <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {memberForm.getValues().dob ? (
                                              format(
                                                dayjs(
                                                  memberForm.getValues().dob
                                                ).toDate(),
                                                "PPP"
                                              )
                                            ) : (
                                              <span>Pick a date</span>
                                            )}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                          <Calendar
                                            mode="single"
                                            selected={field.value ?? undefined}
                                            onSelect={field.onChange}
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover> */}
                                      <CustomDatePicker
                                        value={field.value ?? undefined}
                                        onSelect={field.onChange}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <div className="space-y-2">
                              <FormField
                                control={memberForm.control}
                                name="gender"
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <FormLabel>Gender</FormLabel>
                                      <FormControl>
                                        <RadioGroup
                                          value={field.value}
                                          onValueChange={field.onChange}
                                          className="flex space-x-4"
                                        >
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="male"
                                              id="male"
                                            />
                                            <Label htmlFor="male">Male</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="female"
                                              id="female"
                                            />
                                            <Label htmlFor="female">
                                              Female
                                            </Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="other"
                                              id="other"
                                            />
                                            <Label htmlFor="other">Other</Label>
                                          </div>
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <FormField
                              control={memberForm.control}
                              name="address"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        placeholder="Your address"
                                        className="resize-none"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <FormField
                              control={memberForm.control}
                              name="city"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={memberForm.control}
                              name="state"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>State/Province</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={memberForm.control}
                              name="zipCode"
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Zip/Postal Code</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="eg. 12345"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <FormField
                            control={memberForm.control}
                            name="occupation"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Occupation</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="eg. Architect"
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </form>
                    </Form>
                  )}
                  {step === 2 && (
                    <Form {...spouseForm}>
                      <form action="">
                        <div className="space-y-6">
                          <FormField
                            control={spouseForm.control}
                            name="hasSpouse"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex items-center space-x-2 mb-6">
                                      <Checkbox
                                        id="hasSpouse"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                      <label
                                        htmlFor="hasSpouse"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        I have a spouse/partner
                                      </label>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />

                          {spouseForm.getValues().hasSpouse && (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={spouseForm.control}
                                  name="spouseFirstName"
                                  render={({ field }) => {
                                    return (
                                      <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            placeholder="eg. Marry"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    );
                                  }}
                                />
                                <FormField
                                  control={spouseForm.control}
                                  name="spouseLastName"
                                  render={({ field }) => {
                                    return (
                                      <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            placeholder="eg. Jane"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    );
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={spouseForm.control}
                                  name="spouseDob"
                                  render={({ field }) => {
                                    return (
                                      <FormItem>
                                        <FormLabel>Date Of Birth</FormLabel>
                                        <FormControl>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {spouseForm.getValues()
                                                  .spouseDob ? (
                                                  format(
                                                    dayjs(
                                                      spouseForm.getValues()
                                                        .spouseDob
                                                    ).toDate(),
                                                    "PPP"
                                                  )
                                                ) : (
                                                  <span>Pick a date</span>
                                                )}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                              <Calendar
                                                mode="single"
                                                selected={
                                                  field.value ?? undefined
                                                }
                                                onSelect={field.onChange}
                                                initialFocus
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    );
                                  }}
                                />
                              </div>
                              <FormField
                                control={spouseForm.control}
                                name="spouseEmail"
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          value={field.value ?? ""}
                                          placeholder="eg. test@example.com"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  );
                                }}
                              />
                              <FormField
                                control={spouseForm.control}
                                name="spousePhone"
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <FormLabel>Phone Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          value={field.value ?? ""}
                                          placeholder="eg. 13456780"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  );
                                }}
                              />
                              <FormField
                                control={spouseForm.control}
                                name="spouseOccupation"
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <FormLabel>Occupation</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          value={field.value ?? ""}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  );
                                }}
                              />
                            </>
                          )}
                        </div>
                      </form>
                    </Form>
                  )}
                  {step === 3 && (
                    <Form {...childrenForm}>
                      <form action="" className="space-y-6">
                        <FormField
                          control={childrenForm.control}
                          name="hasChild"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <div className="flex items-center space-x-2 mb-6">
                                    <Checkbox
                                      id="hasChildren"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                    <label
                                      htmlFor="hasChildren"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      I have children
                                    </label>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        {childrenForm.getValues().hasChild &&
                          childrenForm
                            .getValues()
                            .children.map((child, index) => {
                              const { children } = childrenForm.getValues();
                              return (
                                <div
                                  key={index}
                                  className="border p-4 rounded-md relative"
                                >
                                  <div className="absolute top-4 right-4">
                                    {children.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeChild(index)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>

                                  <h3 className="font-medium mb-4">
                                    Child {index + 1}
                                  </h3>

                                  <div className="space-y-4">
                                    <FormField
                                      control={childrenForm.control}
                                      name={`children.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Child's Name</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="eg. John"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={childrenForm.control}
                                      name={`children.${index}.age`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Child's Age</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              type="number"
                                              placeholder="eg. 5"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={childrenForm.control}
                                      name={`children.${index}.gender`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Child's Gender</FormLabel>
                                          <FormControl>
                                            <RadioGroup
                                              value={field.value}
                                              onValueChange={field.onChange}
                                              className="flex space-x-4"
                                            >
                                              <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                  value="male"
                                                  id={`male-${index}`}
                                                />
                                                <Label
                                                  htmlFor={`male-${index}`}
                                                >
                                                  Male
                                                </Label>
                                              </div>
                                              <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                  value="female"
                                                  id={`female-${index}`}
                                                />
                                                <Label
                                                  htmlFor={`female-${index}`}
                                                >
                                                  Female
                                                </Label>
                                              </div>
                                              <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                  value="other"
                                                  id={`other-${index}`}
                                                />
                                                <Label
                                                  htmlFor={`other-${index}`}
                                                >
                                                  Other
                                                </Label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addChild}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another Child
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className={step > 1 ? "" : "ml-auto"}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-primary">
                      Complete Registration
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>
                  Already a member?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
