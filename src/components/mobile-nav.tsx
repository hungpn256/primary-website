"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Contact2, Image, Laptop, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

interface Route {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const productRoutes: Route[] = [
  {
    title: "Công cụ tối ưu hình ảnh",
    href: "/image-optimizer",
    icon: Image,
  },
  {
    title: "Sản phẩm khác",
    href: "/other-product",
    icon: Laptop,
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        className="md:hidden"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed min-h-screen inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 z-50 h-full w-[300px] bg-background border-r"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Laptop className="h-6 w-6" />
                  <span className="font-bold">HungPN</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto h-[calc(100vh-64px)] py-4">
                <div className="space-y-2 px-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setShowProducts(!showProducts)}
                  >
                    Sản phẩm
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        showProducts ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  <AnimatePresence>
                    {showProducts && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {productRoutes.map((route) => {
                          const Icon = route.icon;
                          return (
                            <Button
                              key={route.href}
                              variant="ghost"
                              className={`w-full justify-start pl-8 ${
                                pathname === route.href
                                  ? "bg-muted"
                                  : "hover:bg-transparent"
                              }`}
                              asChild
                            >
                              <Link
                                href={route.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center"
                              >
                                {Icon && <Icon className="mr-2 h-4 w-4" />}
                                {route.title}
                              </Link>
                            </Button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      pathname === "/contact"
                        ? "bg-muted"
                        : "hover:bg-transparent"
                    }`}
                    asChild
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center"
                    >
                      <Contact2 className="mr-2 h-4 w-4" />
                      Liên hệ
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
