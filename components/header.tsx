"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Trophy, Users, Calendar } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Pendaftaran", href: "/register" },
    { name: "Masuk", href: "/admin/login" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">UKM Basketball Yadika Pasuruan</h1>
              <p className="text-xs text-orange-400">Pasuruan</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-400 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-400 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>


          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-orange-500/20"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-gradient-to-br from-black via-gray-900 to-black border-orange-500/30">
              <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="relative mb-8">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center space-x-3 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-orange-500/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">UKM Basketball Yadika</h2>
                      <p className="text-sm text-orange-400">Pasuruan</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Section */}
                <nav className="flex-1 px-2">
                  <div className="space-y-2">
                    {navigation.map((item, index) => (
                      item.href.startsWith('#') ? (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center px-4 py-3 text-white hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-300 font-medium rounded-lg border border-transparent hover:border-orange-500/30"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-400 transition-colors"></div>
                          <span className="text-sm">{item.name}</span>
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center px-4 py-3 text-white hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-300 font-medium rounded-lg border border-transparent hover:border-orange-500/30"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-400 transition-colors"></div>
                          <span className="text-sm">{item.name}</span>
                        </Link>
                      )
                    ))}
                  </div>
                </nav>

                {/* Footer Section */}
                <div className="mt-auto p-4 border-t border-orange-500/20">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">Bergabung dengan komunitas terbaik</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-400 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
