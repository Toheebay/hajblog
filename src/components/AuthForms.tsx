
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Register form schema
const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Forgot password schema
const forgotPasswordSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

// Types for the form data
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const forgotPasswordForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { username: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(values.username, values.password);
      // Login successful
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (values: ForgotPasswordValues) => {
    try {
      // In this mock implementation, we'll just show a toast
      toast.success(`Recovery email sent to ${values.username}@example.com`);
      setShowForgotPassword(false);
    } catch (error) {
      toast.error("Failed to process password recovery request");
    }
  };

  if (showForgotPassword) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recover Password</h3>
        <p className="text-sm text-gray-500">Enter your username and we'll send you recovery instructions.</p>
        
        <Form {...forgotPasswordForm}>
          <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
            <FormField
              control={forgotPasswordForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button type="button" variant="outline" className="w-1/2" onClick={() => setShowForgotPassword(false)}>
                Back to Login
              </Button>
              <Button type="submit" className="w-1/2 bg-marketplace-primary">
                Recover Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(true)} 
                  className="text-sm text-marketplace-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-marketplace-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(values.username, values.password);
      // Registration successful
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
            <LoginForm />
          </div>
        </TabsContent>
        <TabsContent value="register">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
            <RegisterForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
