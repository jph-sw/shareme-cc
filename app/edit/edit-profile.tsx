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
import Link from "next/link";
import ProfileBg from "./profile-bg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Car,
  LoaderIcon,
  Plus,
  Save,
  Settings2,
  Settings2Icon,
} from "lucide-react";
import RenderProfile from "../p/[slug]/RenderProfile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  console.log(props.user_data[0]);
  const [user, setUser] = useState<User>(props.user_data[0]);
  const supabase = createClient();

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
    <div className="flex justify-center w-full h-full">
      <ProfileBg background={user?.background}>
        <div className="w-full flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="z-10" asChild>
              <Button className="m-2" variant={"ghost"}>
                <Settings2 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Change Background
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={user?.background}
                      onValueChange={(e) => setUser({ ...user, background: e })}
                    >
                      <DropdownMenuRadioItem value="aurora">
                        Aurora
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="grid">
                        Grid
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dots">
                        Dots
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="gradient-animation">
                        Gradient Animation
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>Change URL</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-center align-center p-24">
          <Card className="max-w-[300px] min-w-max z-10">
            <CardHeader>
              <CardTitle>
                <Input defaultValue={user?.title} />
              </CardTitle>
              <CardDescription>
                <Input defaultValue={user?.description} />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea defaultValue={user?.content} />
            </CardContent>
            <CardFooter>
              {user?.links?.map((link, index) => link.title)}
              <Button variant={"outline"}>Add Link</Button>
            </CardFooter>
          </Card>
        </div>
      </ProfileBg>
    </div>
  );
}
