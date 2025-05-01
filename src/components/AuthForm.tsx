
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FileText } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const AuthForm = ({ mode }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const schema = mode === "login" ? loginSchema : registerSchema;
  
  const form = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: mode === "login" 
      ? { email: "", password: "" } 
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (values: LoginValues | RegisterValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: mode === "login" ? "Logged in successfully!" : "Account created successfully!",
        description: mode === "login" 
          ? "Welcome back to DocCollab."
          : "You can now log in with your credentials.",
      });
      
      navigate("/");
    }, 1500);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="rounded-full bg-theme-orange/10 p-3">
          <FileText className="h-8 w-8 text-theme-orange" />
        </div>
        <h1 className="text-3xl font-bold">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-gray-500">
          {mode === "login" 
            ? "Enter your email and password to access your documents."
            : "Sign up to start creating and collaborating on documents."
          }
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {mode === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {mode === "register" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button 
            type="submit"
            className="w-full bg-theme-orange hover:bg-theme-orange/90"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <a 
              onClick={() => navigate("/register")} 
              className="cursor-pointer font-semibold text-theme-blue hover:underline"
            >
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a 
              onClick={() => navigate("/login")} 
              className="cursor-pointer font-semibold text-theme-blue hover:underline"
            >
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
