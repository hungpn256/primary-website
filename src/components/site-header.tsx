import { LanguageToggle } from "@/components/language-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Contact2, Image, Laptop } from "lucide-react";
import Link from "next/link";
import { ButtonThemeToggle } from "./button-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <Laptop className="h-6 w-6" />
            <span className="hidden font-bold md:inline-block">HungPN</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-full justify-start">
                Sản phẩm
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/image-optimizer" className="flex items-center">
                  <Image className="mr-2 h-4 w-4" />
                  Công cụ tối ưu hình ảnh
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/other-product" className="flex items-center">
                  <Laptop className="mr-2 h-4 w-4" />
                  Sản phẩm khác
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" asChild className="h-8">
            <Link href="/contact" className="flex items-center">
              <Contact2 className="mr-2 h-4 w-4" />
              Liên hệ
            </Link>
          </Button>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <LanguageToggle />
            <ButtonThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
