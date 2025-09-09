"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown,
  Calendar,
  MapPin,
  Target,
  Zap,
  TrendingUp,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";

export function AchievementsSection() {
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

    const element = document.getElementById('achievements');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const majorAchievements = [
    {
      year: "2024",
      title: "Juara 1 Liga Mahasiswa Jawa Timur",
      description: "Mengalahkan 12 tim terbaik dari universitas se-Jawa Timur",
      category: "Championship",
      icon: Trophy,
      color: "from-yellow-500 to-yellow-600",
      details: {
        location: "Surabaya",
        date: "Maret 2024",
        score: "85-78",
        opponent: "Universitas Airlangga"
      }
    },
    {
      year: "2023",
      title: "Runner-up Turnamen Basket Nasional",
      description: "Prestasi terbaik dalam sejarah organisasi di tingkat nasional",
      category: "National",
      icon: Medal,
      color: "from-gray-400 to-gray-600",
      details: {
        location: "Jakarta",
        date: "Desember 2023",
        score: "72-80",
        opponent: "Universitas Indonesia"
      }
    },
    {
      year: "2023",
      title: "Juara 1 Kejuaraan Basket Kampus",
      description: "Dominasi penuh dalam kompetisi antar kampus regional",
      category: "Regional",
      icon: Crown,
      color: "from-orange-500 to-red-600",
      details: {
        location: "Malang",
        date: "September 2023",
        score: "92-65",
        opponent: "Universitas Brawijaya"
      }
    },
    {
      year: "2022",
      title: "Pemain Terbaik Regional",
      description: "Rizki Pratama meraih penghargaan MVP Regional",
      category: "Individual",
      icon: Star,
      color: "from-blue-500 to-purple-600",
      details: {
        location: "Surabaya",
        date: "November 2022",
        score: "N/A",
        opponent: "N/A"
      }
    }
  ];

  const individualAwards = [
    {
      name: "Rizki Pratama",
      award: "MVP Liga Mahasiswa 2024",
      category: "Most Valuable Player",
      icon: Star
    },
    {
      name: "Dewi Sari",
      award: "Top Scorer 2024",
      category: "Scoring Champion",
      icon: Target
    },
    {
      name: "Budi Santoso",
      award: "Rookie of the Year 2023",
      category: "Best Newcomer",
      icon: Zap
    },
    {
      name: "Siti Rahayu",
      award: "Defensive Player 2023",
      category: "Best Defense",
      icon: Shield
    },
    {
      name: "Andi Wijaya",
      award: "Rebound Leader 2024",
      category: "Rebounding Champion",
      icon: TrendingUp
    },
    {
      name: "Maya Indira",
      award: "Most Improved 2024",
      category: "Development Award",
      icon: TrendingUp
    }
  ];

  const statistics = [
    {
      title: "Total Prestasi",
      value: "15+",
      description: "Trophy & Medals",
      icon: Trophy,
      color: "text-yellow-500"
    },
    {
      title: "Win Rate",
      value: "85%",
      description: "Kemenangan",
      icon: Target,
      color: "text-green-500"
    },
    {
      title: "Pemain Berprestasi",
      value: "12",
      description: "Individual Awards",
      icon: Star,
      color: "text-blue-500"
    },
    {
      title: "Tahun Berprestasi",
      value: "5",
      description: "Konsisten",
      icon: Calendar,
      color: "text-orange-500"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='60' cy='60' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-2">
            🏆 Prestasi Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Koleksi Prestasi
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Perjalanan panjang penuh dedikasi yang menghasilkan berbagai prestasi membanggakan 
            di tingkat regional dan nasional.
          </p>
        </div>

        {/* Statistics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {statistics.map((stat, index) => (
            <Card 
              key={index}
              className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-6 h-6 text-white`} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-orange-400 font-medium mb-1">{stat.title}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Major Achievements */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Prestasi Utama
            </span>
          </h3>
          
          <div className="space-y-8">
            {majorAchievements.map((achievement, index) => (
              <Card 
                key={index}
                className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Icon & Year */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-400">{achievement.year}</div>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          {achievement.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">{achievement.title}</h4>
                      <p className="text-gray-300 mb-4">{achievement.description}</p>
                      
                      {/* Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-300 text-sm">{achievement.details.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-300 text-sm">{achievement.details.date}</span>
                        </div>
                        {achievement.details.score !== "N/A" && (
                          <>
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-orange-500" />
                              <span className="text-gray-300 text-sm">{achievement.details.score}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-orange-500" />
                              <span className="text-gray-300 text-sm">vs {achievement.details.opponent}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Individual Awards */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Penghargaan Individual
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {individualAwards.map((award, index) => (
              <Card 
                key={index}
                className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <award.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{award.name}</h4>
                      <p className="text-orange-400 font-medium mb-2">{award.award}</p>
                      <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-400">
                        {award.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm border-orange-500/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Bergabunglah dengan Tim Juara!
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Jadilah bagian dari perjalanan prestasi kami. Bersama-sama kita bisa meraih 
                pencapaian yang lebih besar lagi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">
                  🏆 15+ Prestasi
                </Badge>
                <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">
                  🎯 85% Win Rate
                </Badge>
                <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">
                  ⭐ 12 Individual Awards
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
