"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CalendarIcon, Pencil, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";

// Sample data
const initialFamilyMembers = [
  {
    id: 1,
    name: "Jane Doe",
    relationship: "Spouse",
    birthdate: new Date(1987, 5, 12),
    email: "jane.doe@example.com",
    phone: "+1 (555) 987-6543",
  },
  {
    id: 2,
    name: "Emily Doe",
    relationship: "Child",
    birthdate: new Date(2010, 8, 23),
    email: "",
    phone: "",
  },
  {
    id: 3,
    name: "Michael Doe",
    relationship: "Child",
    birthdate: new Date(2012, 2, 15),
    email: "",
    phone: "",
  },
];

export default function FamilyTab() {
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    birthdate: new Date(),
    email: "",
    phone: "",
  });

  const handleAddMember = () => {
    setFamilyMembers([
      ...familyMembers,
      {
        id: Math.max(0, ...familyMembers.map((m) => m.id)) + 1,
        ...newMember,
        birthdate: newMember.birthdate || new Date(),
      },
    ]);
    setNewMember({
      name: "",
      relationship: "",
      birthdate: new Date(),
      email: "",
      phone: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditMember = () => {
    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === currentMember.id ? currentMember : member
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteMember = () => {
    setFamilyMembers(
      familyMembers.filter((member) => member.id !== currentMember.id)
    );
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Family Members</h2>
          <p className="text-muted-foreground">
            Manage your family information
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Family Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
              <DialogDescription>
                Add details about your family member. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={newMember.relationship}
                  onValueChange={(value) =>
                    setNewMember({ ...newMember, relationship: value })
                  }
                >
                  <SelectTrigger id="relationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newMember.birthdate
                        ? format(newMember.birthdate, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newMember.birthdate}
                      onSelect={(date) => {
                        date && setNewMember({ ...newMember, birthdate: date });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            onEdit={(member) => {
              setCurrentMember(member);
              setIsEditDialogOpen(true);
            }}
            onDelete={(member) => {
              setCurrentMember(member);
              setIsDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Family Member</DialogTitle>
            <DialogDescription>
              Update details about your family member. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          {currentMember && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={currentMember.name}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-relationship">Relationship</Label>
                <Select
                  value={currentMember.relationship}
                  onValueChange={(value) =>
                    setCurrentMember({ ...currentMember, relationship: value })
                  }
                >
                  <SelectTrigger id="edit-relationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentMember.birthdate
                        ? format(currentMember.birthdate, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentMember.birthdate}
                      onSelect={(date) =>
                        setCurrentMember({ ...currentMember, birthdate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email (optional)</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentMember.email}
                  onChange={(e) =>
                    setCurrentMember({
                      ...currentMember,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone (optional)</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={currentMember.phone}
                  onChange={(e) =>
                    setCurrentMember({
                      ...currentMember,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditMember}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {currentMember?.name} from your
              family members? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMember}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface FamilyMemberCardProps {
  member: {
    id: number;
    name: string;
    relationship: string;
    birthdate: Date;
    email: string;
    phone: string;
  };
  onEdit: (member: any) => void;
  onDelete: (member: any) => void;
}

function FamilyMemberCard({ member, onEdit, onDelete }: FamilyMemberCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{member.name}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(member)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-500"
              onClick={() => onDelete(member)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          <Badge variant="outline">{member.relationship}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">
                {format(member.birthdate, "PPP")}
              </p>
            </div>
          </div>
          {member.email && (
            <p className="text-sm">
              <span className="font-medium">Email:</span> {member.email}
            </p>
          )}
          {member.phone && (
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {member.phone}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
