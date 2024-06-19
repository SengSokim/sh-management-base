import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { PasswordInput } from "@/components/ui/password-input";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    return redirect("/dashboard");
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 ">
      <title>Log in</title>
      <div className="flex items-center justify-center py-12 bg-midnight">
        <div className="mx-auto grid w-[350px] gap-6">
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <Card className="w-full max-w-sm dark:text-black">
              <CardHeader>
                <Image
                  src={"/logo.svg"}
                  width="150"
                  height="150"
                  alt="logo-only"
                />
                <CardTitle className="text-2xl text-midnight">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="dark:bg-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="grid gap-4">
                <Button
                  variant="gooeyRight"
                  className="w-full text-white bg-seaweed hover:bg-midnight"
                  formAction={signIn}
                >
                  Sign in
                </Button>
                {/* <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Button variant="link">
                    <Link href={"signup"} className="underline">
                      Sign up
                    </Link>
                  </Button>
                </div> */}
              </CardFooter>
            </Card>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-black">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="hidden dark:bg-cloud lg:block p-3 bg-onyx">
        <Image
          src="/login-amico.png"
          alt="Image"
          width={1920}
          height={1080}
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
