"use client"
import { loginAction } from '@/app/auth/login/_actions';
import { register } from '@/app/auth/register/_actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleError } from '@/lib/error/handleError';
import AppField from '@/shared/from/AppField';
import AppSubmitButton from '@/shared/from/SubmitButton';
import { ILogin, loginZodSchema, RegisterZodSchema } from '@/zod/auth.zod';
import { useForm } from '@tanstack/react-form';
import { useMutation, } from '@tanstack/react-query'
import { Eye, EyeOff, GraduationCap, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';


const RegisterForm = () => {
    const [Error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: register

    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },

        onSubmit: async ({ value }) => {
            try {
                setError(null)
                const res = await mutateAsync(value);

                if (res.success) {
                    toast.success(res.message);
                    router.push('/auth/login');
                } else {
                    toast.error(res.message);
                }

            } catch (error) {
                const message = handleError(error)
                console.log(`Login failed: ${message}`);
                setError(`Login failed: ${message}`);
            }
        }
    })
    return (
        <div className='h-full'>
            <div className="relative">
                <CardHeader className="text-center space-y-3 mb-10">

                    {/* Icon */}
                    <Link href={"/"} className="flex items-center gap-2 justify-center">
                        <GraduationCap size={50} className="gradient rounded-full p-1 text-white" />
                        <span className="text-2xl font-semibold tracking-tighter">
                            EduZen
                        </span>
                    </Link>


                    <CardTitle className="text-xl font-bold  ">
                        Welcome Back
                    </CardTitle>

                    <p className="text-sm ">
                        Register to your account to continue
                    </p>

                </CardHeader>

                <CardContent>
                    <form
                        className='space-y-4'
                        method='POST'
                        action="#"
                        noValidate
                        onSubmit={
                            (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                form.handleSubmit()

                            }
                        }

                    >
                        <form.Field
                            name='name'
                            validators={{ onChange: RegisterZodSchema.shape.name }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Name'
                                        type='email'
                                        placeholder='Enter Your Full Name...'

                                    />
                                )
                            }
                        </form.Field>
                        <form.Field
                            name='email'
                            validators={{ onChange: RegisterZodSchema.shape.email }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Email'
                                        type='email'
                                        placeholder='Enter Your Email'

                                    />
                                )
                            }
                        </form.Field>
                        <form.Field
                            name='password'
                            validators={{ onChange: RegisterZodSchema.shape.password }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Password'
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Enter Your Password'
                                        append={
                                            <Button onClick={() => setShowPassword(!showPassword)}
                                                variant={'ghost'}
                                            >
                                                {
                                                    showPassword ? <EyeOff className='aria-hidden:true' /> : <Eye className='aria-hidden:true' />
                                                }
                                            </Button>
                                        }

                                    />
                                )
                            }
                        </form.Field>


                        {
                            Error && (
                                <Alert variant={'destructive'}>
                                    <AlertDescription>
                                        {
                                            Error
                                        }
                                    </AlertDescription>
                                </Alert>
                            )
                        }

                        <form.Subscribe selector={(s) => [s.canSubmit,]}>
                            {
                                ([canSubmit]) => (
                                    <AppSubmitButton
                                        isPending={isPending}
                                        disabled={!canSubmit || isPending}

                                    >
                                      Register
                                    </AppSubmitButton>
                                )
                            }
                        </form.Subscribe>

                        <CardFooter className="text-center mt-4 justify-center border-t pt-4">
                            <p className="text-sm text-muted-foreground">
                                Do not have an account?{" "}
                                <Link
                                    href="/auth/register"
                                    className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
                                >
                                    Create one
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </CardContent>
            </div>
        </div>
    )
}

export default RegisterForm