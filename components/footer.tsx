"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Trophy,
  ArrowUp,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    // Scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      if (element) {
        observer.unobserve(element);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "WhatsApp",
      details: ["087864248791 (Usman)", "Hubungi untuk info lebih lanjut"],
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email Admin",
      details: ["adminbasketitbyadika@gmail.com", "Kirim pertanyaan via email"],
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      title: "Lokasi Latihan",
      details: ["Lapangan Kampus ITB Yadika", "Pasuruan, Jawa Timur"],
      color: "text-red-500"
    },
    {
      icon: Clock,
      title: "Jadwal Latihan",
      details: ["Selasa: 20:00 - 22:00", "Jumat: 20:00 - 22:00"],
      color: "text-orange-500"
    }
  ];


  const quickLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Pendaftaran", href: "/register" }
  ];


  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-2">
              📞 Hubungi Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                Mari Bergabung
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Siap untuk menjadi bagian dari tim basket terbaik? Hubungi kami sekarang 
              dan mulai perjalanan basket yang luar biasa!
            </p>
          </div>

          {/* Contact Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {contactInfo.map((contact, index) => (
              <div 
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-5 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105 min-h-[160px] flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <contact.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">{contact.title}</h3>
                </div>
                <div className="space-y-2 flex-1">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-300 text-sm leading-relaxed break-words">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-orange-500/20 relative">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Basket ITB Yadika</h3>
                  <p className="text-orange-400 text-sm">Pasuruan Campus</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Organisasi basket terdepan yang mengembangkan bakat mahasiswa dengan semangat 
                sportif, kompetitif, dan persahabatan yang kuat.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Menu Cepat</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-orange-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Basket ITB Yadika Pasuruan. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 z-50"
            size="sm"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
      </footer>
    </>
  );
}
