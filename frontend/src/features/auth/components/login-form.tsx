import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import useLoginForm from "../hooks/use-login-form";
import LoadingSpinner from "@/shared/components/ui/loading-spinner";

export default function LoginForm() {
  const { form, onSubmit } = useLoginForm();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : "Continue"}
          </Button>
        </form>
      </Form>

      <div className="my-6 flex items-center">
        <Separator className="flex-1" />
        <span className="px-2 text-sm text-gray-500">Or continue with</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" className="rounded-full w-14 h-14">
          <FcGoogle size={26} />
        </Button>
        <Button
          variant="outline"
          className="rounded-full w-14 h-14 bg-black hover:bg-black/90"
        >
          <FaApple size={26} className="text-white" />
        </Button>
        <Button
          variant="outline"
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-500"
        >
          <FaFacebook size={26} className="text-white" />
        </Button>
      </div>
    </div>
  );
}
