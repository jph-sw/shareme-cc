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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    try {
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
      alert("Succesfully saved profile");
    } catch (error) {
      // Handle the error here
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="z-10" asChild>
            <Button className="m-2" variant={"outline"}>
              <Settings2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change Background</DropdownMenuSubTrigger>
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
            <DropdownMenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
              <Dialog>
                <DialogTrigger className="border-hidden z-10"><Button variant={"outline"}>Change URI</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change URI</DialogTitle>
                    <DialogDescription>
                      <Input value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}/>
                      <Button className="my-2">Save</Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
        <Button
          className="m-2 z-10"
          variant={"outline"}
          onClick={() => saveProfile()}
        >
          <Save />
        </Button>
      </div>
      <ProfileBg background={user?.background}>
        <div className="w-full flex justify-end"></div>
        <div className="flex justify-center align-center p-24">
          <Card className="max-w-[300px] min-w-max z-10">
            <CardHeader>
              <CardTitle>
                <Input
                  defaultValue={user?.title}
                  onChange={(e) => setUser({ ...user, title: e.target.value })}
                />
              </CardTitle>
              <CardDescription>
                <Input
                  defaultValue={user?.description}
                  onChange={(e) =>
                    setUser({ ...user, description: e.target.value })
                  }
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                defaultValue={user?.content}
                onChange={(e) => setUser({ ...user, content: e.target.value })}
              />
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
