"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Shield,
  Users
} from "lucide-react";
import { useState, useEffect } from "react";

export function TeamSection() {
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

    const element = document.getElementById('team');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const coaches = [
    {
      name: "Coach Ahmad Rizki",
      role: "Head Coach",
      image: "/api/placeholder/300/300",
      experience: "8 Tahun",
      specialization: "Strategy & Tactics",
      achievements: ["Juara Nasional 2023", "Best Coach 2022"],
      description: "Pelatih berpengalaman dengan visi strategis yang tajam"
    },
    {
      name: "Coach Sarah Putri",
      role: "Assistant Coach",
      image: "/api/placeholder/300/300",
      experience: "5 Tahun",
      specialization: "Physical Training",
      achievements: ["Certified Trainer", "Fitness Expert"],
      description: "Ahli dalam pengembangan fisik dan mental atlet"
    }
  ];

  const players = [
    {
      name: "Rizki Pratama",
      position: "Point Guard",
      number: 7,
      image: "/api/placeholder/300/300",
      height: "180 cm",
      weight: "75 kg",
      year: "2022",
      stats: { points: 18.5, assists: 8.2, rebounds: 4.1 },
      achievements: ["MVP 2023", "Best Assists 2024"]
    },
    {
      name: "Dewi Sari",
      position: "Shooting Guard",
      number: 23,
      image: "/api/placeholder/300/300",
      height: "175 cm",
      weight: "65 kg",
      year: "2021",
      stats: { points: 22.3, assists: 3.8, rebounds: 5.2 },
      achievements: ["Top Scorer 2024", "3-Point Champion"]
    },
    {
      name: "Budi Santoso",
      position: "Small Forward",
      number: 15,
      image: "/api/placeholder/300/300",
      height: "185 cm",
      weight: "80 kg",
      year: "2023",
      stats: { points: 16.8, assists: 4.5, rebounds: 7.3 },
      achievements: ["Rookie of the Year", "Defensive Player"]
    },
    {
      name: "Siti Rahayu",
      position: "Power Forward",
      number: 32,
      image: "/api/placeholder/300/300",
      height: "182 cm",
      weight: "78 kg",
      year: "2020",
      stats: { points: 14.2, assists: 2.1, rebounds: 9.8 },
      achievements: ["Rebound Leader", "Team Captain"]
    },
    {
      name: "Andi Wijaya",
      position: "Center",
      number: 55,
      image: "/api/placeholder/300/300",
      height: "195 cm",
      weight: "95 kg",
      year: "2021",
      stats: { points: 12.5, assists: 1.8, rebounds: 11.2 },
      achievements: ["Block Leader", "Defensive Anchor"]
    },
    {
      name: "Maya Indira",
      position: "Guard",
      number: 12,
      image: "/api/placeholder/300/300",
      height: "170 cm",
      weight: "60 kg",
      year: "2024",
      stats: { points: 15.3, assists: 6.7, rebounds: 3.9 },
      achievements: ["Rising Star", "Most Improved"]
    }
  ];

  const staff = [
    {
      name: "Dr. Budi Hartono",
      role: "Team Doctor",
      specialization: "Sports Medicine",
      experience: "10 Tahun"
    },
    {
      name: "Lisa Fitriani",
      role: "Physiotherapist",
      specialization: "Rehabilitation",
      experience: "6 Tahun"
    },
    {
      name: "Rudi Kurniawan",
      role: "Equipment Manager",
      specialization: "Gear & Facilities",
      experience: "4 Tahun"
    },
    {
      name: "Sari Dewi",
      role: "Nutritionist",
      specialization: "Sports Nutrition",
      experience: "7 Tahun"
    }
  ];

  return (
    <section id="team" className="py-20 bg-black relative overflow-hidden">
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
            👥 Tim Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Squad Terbaik
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tim yang solid dengan pemain-pemain berbakat dan pelatih berpengalaman, 
            siap menghadapi setiap tantangan di lapangan.
          </p>
        </div>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur-sm border border-orange-500/20 mb-12">
            <TabsTrigger 
              value="players" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Pemain
            </TabsTrigger>
            <TabsTrigger 
              value="coaches" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300"
            >
              <Crown className="w-4 h-4 mr-2" />
              Pelatih
            </TabsTrigger>
            <TabsTrigger 
              value="staff" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300"
            >
              <Shield className="w-4 h-4 mr-2" />
              Staff
            </TabsTrigger>
          </TabsList>

          {/* Players Tab */}
          <TabsContent value="players">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {players.map((player, index) => (
                  <Card 
                    key={index}
                    className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105 group"
                  >
                    <CardContent className="p-6">
                      {/* Player Image & Number */}
                      <div className="relative mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl font-bold text-white">{player.number}</span>
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
                          {player.position}
                        </Badge>
                      </div>

                      {/* Player Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">{player.name}</h3>
                        <p className="text-orange-400 font-medium">#{player.number} • {player.position}</p>
                        <p className="text-gray-400 text-sm">Tinggi: {player.height} • Berat: {player.weight}</p>
                        <p className="text-gray-400 text-sm">Bergabung: {player.year}</p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <div className="text-orange-400 font-bold">{player.stats.points}</div>
                          <div className="text-gray-400 text-xs">PTS</div>
                        </div>
                        <div className="text-center">
                          <div className="text-orange-400 font-bold">{player.stats.assists}</div>
                          <div className="text-gray-400 text-xs">AST</div>
                        </div>
                        <div className="text-center">
                          <div className="text-orange-400 font-bold">{player.stats.rebounds}</div>
                          <div className="text-gray-400 text-xs">REB</div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-1">
                        {player.achievements.map((achievement, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline" 
                            className="text-xs border-orange-500/30 text-orange-400 mr-1 mb-1"
                          >
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Coaches Tab */}
          <TabsContent value="coaches">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coaches.map((coach, index) => (
                  <Card 
                    key={index}
                    className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Crown className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                              {coach.role}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-300 mb-4">{coach.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-orange-400 font-medium">Pengalaman</p>
                              <p className="text-gray-300">{coach.experience}</p>
                            </div>
                            <div>
                              <p className="text-orange-400 font-medium">Spesialisasi</p>
                              <p className="text-gray-300">{coach.specialization}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-orange-400 font-medium mb-2">Prestasi:</p>
                            <div className="flex flex-wrap gap-1">
                              {coach.achievements.map((achievement, idx) => (
                                <Badge 
                                  key={idx}
                                  variant="outline" 
                                  className="text-xs border-orange-500/30 text-orange-400"
                                >
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {staff.map((member, index) => (
                  <Card 
                    key={index}
                    className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                      <Badge className="mb-3 bg-orange-500/20 text-orange-400 border-orange-500/30">
                        {member.role}
                      </Badge>
                      
                      <p className="text-gray-300 text-sm mb-2">{member.specialization}</p>
                      <p className="text-orange-400 text-sm font-medium">{member.experience}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
