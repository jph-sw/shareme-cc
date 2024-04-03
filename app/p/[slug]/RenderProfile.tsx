"use client";
import Link from "next/link";
import ProfileBg from "./profile-bg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";

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

export default function RenderProfile(props: {
  user?: User;
  isLoading?: boolean;
}) {
  return (
    <>
      <ProfileBg background={props.user?.background}>
        <div className="flex justify-center align-center p-24">
          <Card className="shadow-2xl w-[450px]">
            <CardHeader>
              <CardTitle>{props.user?.title}</CardTitle>
              <CardDescription>{props.user?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {props.isLoading && (
                <div className="flex justify-center">
                  <LoaderIcon className="animate-spin" />
                </div>
              )}
              <p>{props.user?.content}</p>
            </CardContent>
            <CardFooter>
              {props.user?.links?.map((link) => (
                <Button
                  className="me-1 shadow-md z-50"
                  variant={"outline"}
                  key={link.url}
                  asChild
                >
                  <Link href={link.url} target="_blank">
                    {link.title}
                  </Link>
                </Button>
              ))}
            </CardFooter>
          </Card>
        </div>
      </ProfileBg>
    </>
  );
}
