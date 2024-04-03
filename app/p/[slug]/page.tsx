"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import RenderProfile from "./RenderProfile";

interface Links {
  title: string;
  url: string;
}

interface User {
  title: string;
  description?: string;
  content?: string;
  background?: string;
  theme?: string;
  links?: Links[];
}

export default function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const [isUser, setIsUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", params.slug);

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    if (data.length > 0) {
      setIsUser(true);
      setUser(data[0]);
      console.info("Got data", data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [params.slug]);
  return (
    <div>
      {isUser ? (
        <div className="w-screen h-screen">
          <RenderProfile user={user} isLoading={isLoading} />
        </div>
      ) : (
        <div className="flex justify-center align-center h-screen pt-48 gap-2 text-2xl">
          <h1 className="font-semibold">{params.slug}</h1>
          <p>is not a user</p>
        </div>
      )}
    </div>
  );
}
