"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Users, 
  Heart, 
  Shield,
  MapPin
} from "lucide-react";
import { useState, useEffect } from "react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Berusaha mencapai standar tertinggi dalam setiap aspek permainan dan kehidupan"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Semangat membara untuk basket yang mendorong kami untuk terus berkembang"
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Kekuatan tim yang solid dan saling mendukung dalam setiap pertandingan"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Menjunjung tinggi nilai-nilai fair play dan sportivitas dalam setiap kompetisi"
    }
  ];


  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-2">
            🏀 Tentang Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Organisasi Basket Terdepan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Basket ITB Yadika Pasuruan adalah wadah terbaik untuk mengembangkan bakat basket mahasiswa 
            dengan semangat sportif, kompetitif, dan persahabatan yang kuat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-orange-500 mr-3" />
                  Visi & Misi
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-orange-400 mb-2">Visi</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Menjadi UKM basket terdepan di ITB Yadika Pasuruan yang membentuk mahasiswa 
                      berkarakter, sehat jasmani rohani, dan berprestasi dalam bidang olahraga basket.
                    </p>
                  </div>
                  
                  <Separator className="bg-orange-500/20" />
                  
                  <div>
                    <h4 className="text-lg font-semibold text-orange-400 mb-2">Misi</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        Mengembangkan bakat dan minat mahasiswa dalam olahraga basket
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        Membangun karakter sportif, disiplin, dan kerja sama tim
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        Menciptakan lingkungan yang kondusif untuk berlatih dan berprestasi
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        Menjalin silaturahmi dan persahabatan antar mahasiswa
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        Mewakili ITB Yadika dalam berbagai kompetisi basket
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Values */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
              Nilai-Nilai Kami
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>


        {/* Stats Section */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm border-orange-500/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">2024</div>
                  <div className="text-gray-300">Tahun Berdiri</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">2x</div>
                  <div className="text-gray-300">Latihan/Minggu</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">20:00</div>
                  <div className="text-gray-300">Jam Latihan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                  <div className="text-gray-300">Semangat</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
