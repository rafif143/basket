"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  GraduationCap,
  MapPin,
  FileText,
  MessageCircle
} from "lucide-react";
import { registrationService, settingsService } from "@/lib/supabase";

interface Registration {
  id: string;
  nama: string;
  nim: string;
  no_telepon: string;
  foto_ktm_url: string;
  alamat_domisili: string;
  fakultas: string;
  program_studi: string;
  alasan_bergabung: string;
  created_at: string;
  updated_at: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fakultasFilter, setFakultasFilter] = useState("all");
  const [whatsappUrls, setWhatsappUrls] = useState<{[key: string]: string}>({});

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, fakultasFilter]);

  useEffect(() => {
    if (filteredRegistrations.length > 0) {
      generateWhatsAppUrls();
    }
  }, [filteredRegistrations]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const result = await registrationService.getAllRegistrations();
      if (result.success && result.data) {
        setRegistrations(result.data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.nim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Fakultas filter
    if (fakultasFilter !== "all") {
      filtered = filtered.filter(reg => reg.fakultas === fakultasFilter);
    }

    setFilteredRegistrations(filtered);
  };

  const generateWhatsAppUrls = async () => {
    const urls: {[key: string]: string} = {};
    
    for (const registration of filteredRegistrations) {
      if (registration.no_telepon && registration.nama) {
        try {
          const url = await getWhatsAppUrl(registration.no_telepon, registration.nama);
          urls[registration.id] = url;
        } catch (error) {
          console.error('Error generating WhatsApp URL for registration:', registration.id, error);
          urls[registration.id] = '#';
        }
      }
    }
    
    setWhatsappUrls(urls);
  };



  const getFakultasName = (fakultas: string) => {
    return fakultas === 'FTI' ? 'Fakultas Teknologi dan Informasi' : 'Fakultas Hukum dan Bisnis';
  };

  const formatPhoneNumber = (phone: string) => {
    // Convert Indonesian phone number to WhatsApp format
    if (!phone) return '';
    
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Handle different Indonesian phone number formats
    if (cleanPhone.startsWith('08')) {
      // 08xxxxxxxxxx -> 62xxxxxxxxxx
      return '62' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('8')) {
      // 8xxxxxxxxxx -> 628xxxxxxxxxx
      return '62' + cleanPhone;
    } else if (cleanPhone.startsWith('62')) {
      // Already in correct format
      return cleanPhone;
    } else if (cleanPhone.startsWith('0')) {
      // 0xxxxxxxxxx -> 62xxxxxxxxxx
      return '62' + cleanPhone.substring(1);
    }
    
    // If none of the above, assume it needs 62 prefix
    return '62' + cleanPhone;
  };

  const getWhatsAppUrl = async (phone: string, nama: string) => {
    if (!phone || !nama) {
      console.log('Missing data:', { phone, nama });
      return '#';
    }
    const formattedPhone = formatPhoneNumber(phone);
    console.log('WhatsApp URL:', { originalPhone: phone, formattedPhone, nama });
    
    // Get template from database
    try {
      const result = await settingsService.getSetting('whatsapp_template');
      const template = result.success && result.data 
        ? result.data.value 
        : `Halo ${nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika`;
      
      // Replace {nama} placeholder with actual name
      const personalizedTemplate = template.replace('{nama}', nama);
      return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(personalizedTemplate)}`;
    } catch (error) {
      console.error('Error getting WhatsApp template:', error);
      // Fallback to default template
      const template = `Halo ${nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika`;
      return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(template)}`;
    }
  };

  const getProgramStudiName = (programStudi: string) => {
    const programs: { [key: string]: string } = {
      'STI': 'Sistem dan Teknologi Informasi',
      'SI': 'Sistem Informasi',
      'AK': 'Akuntansi',
      'MN': 'Manajemen',
      'HB': 'Hukum Bisnis'
    };
    return programs[programStudi] || programStudi;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Daftar Pendaftaran</h1>
        <p className="text-gray-600 mt-2">Kelola semua pendaftaran UKM Basket ITB Yadika</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>


            {/* Fakultas Filter */}
            <select
              value={fakultasFilter}
              onChange={(e) => setFakultasFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Semua Fakultas</option>
              <option value="FTI">Fakultas Teknologi dan Informasi</option>
              <option value="FHB">Fakultas Hukum dan Bisnis</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Menampilkan {filteredRegistrations.length} dari {registrations.length} pendaftaran
        </p>
      </div>

      {/* Registrations List */}
      <div className="space-y-4">
        {filteredRegistrations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pendaftaran</h3>
              <p className="text-gray-600">
                {searchTerm || fakultasFilter !== "all" 
                  ? "Tidak ada pendaftaran yang sesuai dengan filter" 
                  : "Belum ada pendaftaran yang masuk"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRegistrations.map((registration) => (
            <Card key={registration.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{registration.nama}</h3>
                        <p className="text-sm text-gray-600">NIM: {registration.nim}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>{getFakultasName(registration.fakultas)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>{getProgramStudiName(registration.program_studi)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{registration.alamat_domisili}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(registration.created_at).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        <strong>Alasan bergabung:</strong> {registration.alasan_bergabung}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Link href={`/admin/registrations/${registration.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </Link>
                    
                    {registration.no_telepon ? (
                      <a
                        href={whatsappUrls[registration.id] || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center px-3 py-2 bg-gray-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        No Phone
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
