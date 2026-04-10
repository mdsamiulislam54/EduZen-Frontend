"use client"
import { loginAction } from '@/app/auth/login/_actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { handleError } from '@/lib/error/handleError';
import AppField from '@/shared/from/AppField';
import AppSubmitButton from '@/shared/from/SubmitButton';
import { ILogin, loginZodSchema } from '@/zod/auth.zod';
import { useForm } from '@tanstack/react-form';
import { useMutation, } from '@tanstack/react-query'
import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';


const LoginFrom = () => {
    const [Error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILogin) => loginAction(payload),

    });

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },

        onSubmit: async ({ value }) => {
            try {
                setError(null)
                const res = await mutateAsync(value);
              
                if (res.success) {
                    toast.success(res.message);
                    router.push('/dashboard');
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
                    <div className="flex justify-center">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full gradient dark:bg-gray-900 text-white text-xl font-bold shadow-md">
                            <Lock />
                        </div>
                    </div>

                    {/* Title
                    <CardTitle className="text-2xl font-bold  ">
                        Welcome Back
                    </CardTitle> */}

                    {/* Subtitle */}
                    <p className="text-sm ">
                        Login to your account to continue
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
                            name='email'
                            validators={{ onChange: loginZodSchema.shape.email }}
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
                            validators={{ onChange: loginZodSchema.shape.password }}
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
                        <div>
                            <Link href="/forgot-password" className='text-right my-4'>
                                Forgot Password
                            </Link>
                        </div>

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
                                        Log In
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

export default LoginFrom