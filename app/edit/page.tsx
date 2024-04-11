import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import EditProfile from "./edit-profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-start items-center p-3 text-sm z-20">
            <Button variant="link" asChild>
              <Link href="/">shareme.cc</Link>
            </Button>
          </div>
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm z-20">
            <AuthButton />
          </div>
        </nav>
        <div>
          <EditProfile
            user_id={user!.id}
            user_data={await getData({ user_id: user!.id })}
          />
        </div>
      </div>
    </div>
  );
}

async function getData(props: { user_id: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", props.user_id);

  if (error) {
    console.error("Error fetching profile:", error);
  } else {
    console.log("Profile:", data);
    return data;
  }
}
