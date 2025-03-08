import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

interface CalendarDaysIconProps extends React.SVGProps<SVGSVGElement> {}

interface Props {
  value?: Date;
  onSelect: SelectSingleEventHandler;
}

function generateYearsArray(): string[] {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50;
  const endYear = currentYear;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push("" + year);
  }
  return years;
}

export default function CustomDatePicker({ value, onSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
          {selectedDate ? (
            format(dayjs(selectedDate).toDate(), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select defaultValue={"" + selectedDate.getFullYear()}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {generateYearsArray().map((year, index) => {
              return (
                <SelectItem
                  value={year}
                  key={index}
                  onSelect={() =>
                    setSelectedDate(
                      (prevDate) =>
                        new Date(selectedDate.setFullYear(parseInt(year)))
                    )
                  }
                >
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select defaultValue={"" + selectedDate.getMonth()}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <SelectItem
                value={index.toString()}
                key={index}
                onChange={() =>
                  setSelectedDate(
                    (prevDate) => new Date(new Date().setMonth(index))
                  )
                }
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(value) => {
              if (value) {
                setSelectedDate(value);
                onSelect(value, value, {}, {
                  nativeEvent: new MouseEvent("click"),
                } as React.MouseEvent<Element, MouseEvent>);
              }
            }}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CalendarDaysIcon(props: CalendarDaysIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
