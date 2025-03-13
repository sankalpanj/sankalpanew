"use client";

import EventsTab from "@/components/profile/tabs/events-tab";
import FamilyTab from "@/components/profile/tabs/family-tab";
import PaymentHistoryTab from "@/components/profile/tabs/payment-history-tab";
import PersonalInfoTab from "@/components/profile/tabs/personal-info-tab";
import SettingsTab from "@/components/profile/tabs/settings-tab";
import SubscriptionsTab from "@/components/profile/tabs/subscriptions-tab";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import {
  Bell,
  Calendar,
  CreditCard,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-6">
          <ProfileCard />
          <ProfileNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Mobile Profile Header */}
        <div className="md:hidden">
          <ProfileCard />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Profile Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="personal">Profile</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-lg border shadow-sm">
            {activeTab === "personal" && <PersonalInfoTab />}
            {activeTab === "family" && <FamilyTab />}
            {activeTab === "payments" && <PaymentHistoryTab />}
            {activeTab === "events" && <EventsTab />}
            {activeTab === "subscriptions" && <SubscriptionsTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard() {
  const { user, isSignedIn } = useUser();

  const userImg = useMemo(() => {
    if (!isSignedIn || !user) return undefined;

    return user.imageUrl;
  }, [user, isSignedIn]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`${userImg}?height=96&width=96`} alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
          <Badge>Premium Member</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProfileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ProfileNavigation({
  activeTab,
  setActiveTab,
}: ProfileNavigationProps) {
  const navItems = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "family", label: "Family", icon: Users },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "subscriptions", label: "Subscriptions", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
          <Separator className="my-2" />
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
