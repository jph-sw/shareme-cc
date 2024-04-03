"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RenderProfile from "../p/[slug]/RenderProfile";
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
  username?: string;
}
export default function EditProfile(props: any) {
  const [user, setUser] = useState<User>();
  const supabase = createClient();

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", props.user_id);

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        console.log("Profile:", data);
        setUser(data[0]);
      }
    };

    getProfile();
  }, []);

  const saveProfile = async () => {
    await supabase
      .from("profiles")
      .update({
        title: user!.title,
        description: user!.description,
        content: user!.content,
        background: user!.background,
        username: user!.username,
      })
      .eq("id", props.user_id);
    console.log("Profile saved successfully");
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 p-12">
        <p className="text-lg pb-1">Settings</p>
        <div>
          {user && (
            <div className="flex flex-col gap-1">
              <Label>Url</Label>
              <Input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <Label>Title</Label>
              <Input
                value={user.title}
                onChange={(e) => setUser({ ...user, title: e.target.value })}
              />
              <Label>Description</Label>
              <Input
                value={user.description}
                onChange={(e) =>
                  setUser({ ...user, description: e.target.value })
                }
              />
              <Label>Content</Label>
              <Input
                value={user.content}
                onChange={(e) => setUser({ ...user, content: e.target.value })}
              />
              <Label>Background</Label>
              <Select
                value={user.background}
                onValueChange={(e) => setUser({ ...user, background: e })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Background</SelectLabel>
                    <SelectItem value="aurora">Aurora</SelectItem>
                    <SelectItem value="dots">Dots</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button className="mt-2" onClick={() => saveProfile()}>
            Save
          </Button>
        </div>
      </div>
      <div className="w-1/2">
        <RenderProfile user={user} />
      </div>
    </div>
  );
}
