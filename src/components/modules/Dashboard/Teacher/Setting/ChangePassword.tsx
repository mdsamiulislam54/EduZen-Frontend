"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { changePassword } from "@/app/(dashboardLayout)/dashboard/teacher/setting/_actions"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const ChangePassword = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const {mutateAsync, isPending} = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: changePassword,
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;
        if(!currentPassword || !newPassword || !confirmPassword) {
            toast.warning("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.warning("New password and confirm password do not match.");
            return;
        };

        try {
            console.log("Submitting password change:", { currentPassword, newPassword, confirmPassword });
            await mutateAsync({ currentPassword, newPassword });
            toast.success("Password changed successfully!");
            router.push("/auth/login");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            toast.error(`Failed to change password: ${errorMessage}`);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <Card className="w-full max-w-lg border border-border/50 shadow-xl rounded-2xl backdrop-blur-sm">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>

                    <CardTitle className="text-2xl font-bold">
                        Change Password
                    </CardTitle>

                    <CardDescription className="text-muted-foreground">
                        Update your password to keep your account secure.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">
                                Current Password
                            </Label>

                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter current password"
                                    className="pl-10 h-11 rounded-xl"
                                    onChange={handleInputChange}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-3 top-3 h-8 w-8"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4" />
                                    ) : (
                                        <EyeOff className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">
                                New Password
                            </Label>

                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className="pl-10 h-11 rounded-xl"
                                    onChange={handleInputChange}
                                />
                              

                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>

                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    className="pl-10 h-11 rounded-xl"
                                    onChange={handleInputChange}
                                />
                             
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl text-base font-semibold cursor-pointer"
                        >
                            {isPending ? "Changing..." : "Change Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChangePassword