import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Card, CardContent } from "@/shared/components/ui/card";

import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthFormLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5 md:p-10">
      <Card className="w-full min-h-[90vh] max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl rounded-2xl p-0">
        <CardContent className="flex flex-col justify-between p-10">
          <div className="mb-6">
            <h1 className="text-2xl text-center font-semibold mb-10">
              Smart Save
            </h1>
            <p className="text-xl text-center font-medium">Welcome Back</p>
            <p className="text-sm text-center text-gray-500">
              Please enter your details
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 w-full h-12">
              <TabsTrigger value="signin">Signin</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            repellendus tenetur sit enim ad ullam placeat. Vitae temporibus
            nihil accusamus.
          </p>
        </CardContent>

        {/* Right Section */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/auth-banner.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </Card>
    </div>
  );
}
