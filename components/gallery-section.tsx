"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Play, 
  Trophy, 
  Users, 
  Calendar,
  MapPin,
  Heart,
  Share2,
  Download,
  Eye
} from "lucide-react";
import { useState, useEffect } from "react";

export function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('gallery');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const categories = [
    { id: "all", name: "Semua", icon: Camera },
    { id: "matches", name: "Pertandingan", icon: Trophy },
    { id: "training", name: "Latihan", icon: Users },
    { id: "events", name: "Acara", icon: Calendar },
    { id: "awards", name: "Penghargaan", icon: Trophy }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Final Liga Mahasiswa 2024",
      category: "matches",
      type: "image",
      image: "/api/placeholder/400/300",
      date: "Maret 2024",
      location: "Surabaya",
      description: "Momen kemenangan spektakuler di final Liga Mahasiswa Jawa Timur",
      likes: 156,
      views: 1240
    },
    {
      id: 2,
      title: "Sesi Latihan Intensif",
      category: "training",
      type: "video",
      image: "/api/placeholder/400/300",
      date: "Februari 2024",
      location: "Lapangan ITB Yadika",
      description: "Latihan persiapan menghadapi kompetisi besar",
      likes: 89,
      views: 567
    },
    {
      id: 3,
      title: "Penghargaan MVP 2024",
      category: "awards",
      type: "image",
      image: "/api/placeholder/400/300",
      date: "April 2024",
      location: "Jakarta",
      description: "Rizki Pratama meraih penghargaan Most Valuable Player",
      likes: 234,
      views: 1890
    },
    {
      id: 4,
      title: "Team Building 2024",
      category: "events",
      type: "image",
      image: "/api/placeholder/400/300",
      date: "Januari 2024",
      location: "Batu, Malang",
      description: "Kegiatan team building untuk mempererat kekompakan tim",
      likes: 178,
      views: 923
    },
    {
      id: 5,
      title: "Semifinal vs Universitas Brawijaya",
      category: "matches",
      type: "video",
      image: "/api/placeholder/400/300",
      date: "Maret 2024",
      location: "Malang",
      description: "Pertandingan sengit yang berakhir dengan kemenangan",
      likes: 201,
      views: 1456
    },
    {
      id: 6,
      title: "Latihan Shooting",
      category: "training",
      type: "image",
      image: "/api/placeholder/400/300",
      date: "Februari 2024",
      location: "Lapangan ITB Yadika",
      description: "Sesi latihan shooting yang intensif",
      likes: 67,
      views: 445
    },
    {
      id: 7,
      title: "Upacara Penghargaan",
      category: "awards",
      type: "image",
      image: "/api/placeholder/400/300",
      date: "Desember 2023",
      location: "ITB Yadika Pasuruan",
      description: "Upacara penghargaan untuk prestasi tahun 2023",
      likes: 145,
      views: 1123
    },
    {
      id: 8,
      title: "Workshop Basket",
      category: "events",
      type: "video",
      image: "/api/placeholder/400/300",
      date: "November 2023",
      location: "ITB Yadika Pasuruan",
      description: "Workshop teknik basket bersama pelatih profesional",
      likes: 98,
      views: 678
    },
    {
      id: 9,
      title: "Latihan Defensive",
      category: "training",
      type: "image",
      image: "/api/placeholder/400/300",
      date: "Januari 2024",
      location: "Lapangan ITB Yadika",
      description: "Fokus pada pengembangan kemampuan defensive",
      likes: 76,
      views: 512
    }
  ];

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-2">
            📸 Galeri Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Momen Terbaik
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Koleksi momen-momen berharga dari perjalanan tim basket ITB Yadika Pasuruan, 
            dari latihan hingga pertandingan yang penuh semangat.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50"
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredItems.map((item) => (
            <Card 
              key={item.id}
              className="bg-black/40 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105 group overflow-hidden"
            >
              <div className="relative">
                {/* Image/Video */}
                <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-red-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-600/30 flex items-center justify-center">
                    {item.type === "video" ? (
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    ) : (
                      <Camera className="w-12 h-12 text-white/50" />
                    )}
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                        <Download className="w-4 h-4 mr-2" />
                        Unduh
                      </Button>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      item.type === "video" 
                        ? "bg-red-500/80 text-white" 
                        : "bg-orange-500/80 text-white"
                    }`}
                  >
                    {item.type === "video" ? "Video" : "Foto"}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  {/* Title & Category */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-400 ml-2 flex-shrink-0">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.date}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {item.location}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-orange-500/20">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Heart className="w-4 h-4 mr-1" />
                        {item.likes}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-3 transition-all duration-300"
          >
            <Camera className="w-5 h-5 mr-2" />
            Lihat Lebih Banyak
          </Button>
        </div>

        {/* Stats */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm border-orange-500/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
                  <div className="text-gray-300">Foto & Video</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">50+</div>
                  <div className="text-gray-300">Pertandingan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">200+</div>
                  <div className="text-gray-300">Sesi Latihan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">15+</div>
                  <div className="text-gray-300">Acara Khusus</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
