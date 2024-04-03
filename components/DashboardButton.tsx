import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function DashboardButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (
    <div className="flex items-center gap-4">
      <Button variant={"link"} asChild>
        <Link href="/edit">Dashboard</Link>
      </Button>
    </div>
  ) : (
    ""
  );
}
