"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar,
  GraduationCap,
  BookOpen,
  MessageCircle
} from "lucide-react";
import { registrationService, settingsService } from "@/lib/supabase";

interface RegistrationStats {
  total_registrations: number;
  fti_count: number;
  fhb_count: number;
}

interface RecentRegistration {
  id: string;
  nama: string;
  nim: string;
  no_telepon: string;
  fakultas: string;
  program_studi: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [recentRegistrations, setRecentRegistrations] = useState<RecentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappUrls, setWhatsappUrls] = useState<{[key: string]: string}>({});

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

  const generateWhatsAppUrls = useCallback(async () => {
    const urls: {[key: string]: string} = {};
    
    for (const registration of recentRegistrations) {
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
  }, [recentRegistrations, getWhatsAppUrl]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all registrations
      const result = await registrationService.getAllRegistrations();
      if (result.success && result.data) {
        const registrations = result.data;
        
        // Calculate stats
        const statsData: RegistrationStats = {
          total_registrations: registrations.length,
          fti_count: registrations.filter(r => r.fakultas === 'FTI').length,
          fhb_count: registrations.filter(r => r.fakultas === 'FHB').length,
        };
        
        setStats(statsData);
        
        // Get recent registrations (last 5)
        const recent = registrations
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);
        
        setRecentRegistrations(recent);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (recentRegistrations.length > 0) {
      generateWhatsAppUrls();
    }
  }, [recentRegistrations, generateWhatsAppUrls]);

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

  const getFakultasName = (fakultas: string) => {
    return fakultas === 'FTI' ? 'Fakultas Teknologi dan Informasi' : 'Fakultas Hukum dan Bisnis';
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-2">Kelola pendaftaran UKM Basket ITB Yadika</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftaran</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_registrations || 0}</div>
            <p className="text-xs text-muted-foreground">
              Semua pendaftaran
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fakultas FTI</CardTitle>
            <GraduationCap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats?.fti_count || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total_registrations ? 
                Math.round((stats.fti_count / stats.total_registrations) * 100) 
                : 0}% dari total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fakultas FHB</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats?.fhb_count || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total_registrations ? 
                Math.round((stats.fhb_count / stats.total_registrations) * 100) 
                : 0}% dari total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-orange-500" />
              Fakultas Teknologi dan Informasi
            </CardTitle>
            <CardDescription>Jumlah pendaftar dari FTI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats?.fti_count || 0}</div>
            <p className="text-sm text-gray-600 mt-2">
              {stats?.total_registrations ? 
                `${Math.round((stats.fti_count / stats.total_registrations) * 100)}% dari total pendaftaran` 
                : '0% dari total pendaftaran'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Fakultas Hukum dan Bisnis
            </CardTitle>
            <CardDescription>Jumlah pendaftar dari FHB</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats?.fhb_count || 0}</div>
            <p className="text-sm text-gray-600 mt-2">
              {stats?.total_registrations ? 
                `${Math.round((stats.fhb_count / stats.total_registrations) * 100)}% dari total pendaftaran` 
                : '0% dari total pendaftaran'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Registrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Pendaftaran Terbaru
          </CardTitle>
          <CardDescription>5 pendaftaran terakhir yang masuk</CardDescription>
        </CardHeader>
        <CardContent>
          {recentRegistrations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada pendaftaran
            </div>
          ) : (
            <div className="space-y-4">
              {recentRegistrations.map((registration) => (
                <div key={registration.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{registration.nama}</h4>
                        <p className="text-sm text-gray-600">NIM: {registration.nim}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{getFakultasName(registration.fakultas)}</span>
                      <span>•</span>
                      <span>{registration.program_studi}</span>
                      <span>•</span>
                      <span>{new Date(registration.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {registration.no_telepon ? (
                      <a
                        href={whatsappUrls[registration.id] || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    ) : (
                      <span className="inline-flex items-center px-3 py-2 bg-gray-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        No Phone
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
