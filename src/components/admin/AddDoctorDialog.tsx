import { useCreateDoctor } from '@/hooks/use-doctors';
import { Gender } from '@prisma/client';
import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { formatPhoneNumber } from '@/lib/utils';

interface AddDoctorDialogProps{
    isOpen: boolean;
    onClose: () => void;
}

function AddDoctorDialog({isOpen, onClose}:AddDoctorDialogProps) {

    const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const createDoctorMutation = useCreateDoctor()

  const handlePhoneChange = (value:string) => {
    const formattedPhoneNumber = formatPhoneNumber(value)
    setNewDoctor({...newDoctor, phone:formattedPhoneNumber})
  }

  const handleSave = () => {
    createDoctorMutation.mutate({
        ...newDoctor,
        specialty: ''
    }, { onSuccess: handleClose });
  };

  const handleClose = () => {
    onClose();
    setNewDoctor({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        gender: "MALE",
        isActive: true,
    });
  }

  return (
    <Dialog open = {isOpen} onOpenChange={handleClose}>
        <DialogContent className = "sm:max-w-[500px] text-white" >
            <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>Add a new doctor to your practice.</DialogDescription>
            </DialogHeader>
            
            <div className ="grid gap-4 py-4">
                <div className = "grid grid-cols-2 gap-4">
                    <div className = "space-y-2">
                        <Label htmlFor = "new-name" className="text-white"> Name *</Label>
                        <Input 
                            id = "new-name"
                            value = {newDoctor.name}
                            onChange = {(e) => setNewDoctor({...newDoctor, name:e.target.value})}
                            placeholder="Dr. John Smith"
                        />
                    </div>
                    <div className = "space-y-2">
                        <Label htmlFor = "new-specialty" className="text-white"> Speciality *</Label>
                        <Input 
                            id = "new-speciality"
                            value = {newDoctor.specialty}
                            onChange = {(e) => setNewDoctor({...newDoctor, specialty:e.target.value})}
                            placeholder="General Dentistry"
                        />
                    </div>    
                    
                    <div className = "space-y-2">
                        <Label htmlFor = "new-email" className="text-white"> Email *</Label>
                        <Input 
                            id = "new-email"
                            value = {newDoctor.email}
                            onChange = {(e) => setNewDoctor({...newDoctor, email:e.target.value})}
                            placeholder="doctor@example.com"
                        />
                    </div>
                        <div className = "space-y-2">
                        <Label htmlFor = "new-phone" className="text-white"> Phone *</Label>
                        <Input 
                            id = "new-phone"
                            value = {newDoctor.phone}
                            onChange = {(e) => handlePhoneChange(e.target.value)}
                            placeholder="(555) 123-4567"
                        />
                </div>
                <div className = "grid grid-cols-2 gap-4">
                   <div className = "space-y-2">
                        <Label htmlFor="new-gender" className = "text-white">Gender</Label>
                        <Select
                            value={newDoctor.gender || ""}
                            onValueChange={(value) => setNewDoctor({ ...newDoctor, gender: value as Gender })}
                            >
                                <SelectTrigger>
                                         <SelectValue placeholder="Select gender" />
                                </SelectTrigger>

                                <SelectContent>
                                   <SelectItem value="MALE" className="text-white">Male</SelectItem>
                                   <SelectItem value="FEMALE" className="text-white">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className = "space-y-2">
                        <Label htmlFor="new-status" className = "text-white">Status</Label>
                        <Select
                            value={newDoctor.isActive ? "active" : "inactive"}
                            onValueChange={(value) => setNewDoctor({ ...newDoctor, isActive: value ==="active" })}
                            >
                                <SelectTrigger>
                                         <SelectValue/>
                                </SelectTrigger>

                                <SelectContent className="bg-background text-white">
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant ="outline" onClick={handleClose}>
                    Cancel 
                </Button>

                <Button
                    onClick = {handleSave}
                    className = "bg-primary hover:bg-primary/90"
                    disabled={!newDoctor.name || !newDoctor.email || !newDoctor.specialty||createDoctorMutation.isPending}
                >
                    {createDoctorMutation.isPending? "Adding..." :"Add Doctor"}


                </Button>
            </DialogFooter>
        </div>
    </DialogContent>
</Dialog>
  )
}

export default AddDoctorDialog;
