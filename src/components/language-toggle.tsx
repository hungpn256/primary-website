"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useState } from "react";

const languages = {
  vi: "Tiếng Việt",
  en: "English",
};

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState("vi");

  const handleLanguageChange = (locale: string) => {
    setCurrentLang(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Languages className="h-[1.2rem]" />
          <span className="ml-2 hidden md:inline-block">
            {languages[currentLang as keyof typeof languages]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("vi")}>
          🇻🇳 Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
