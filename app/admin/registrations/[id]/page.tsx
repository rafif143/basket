"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  User,
  GraduationCap,
  FileText,
  Calendar,
  Download,
  Eye,
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

export default function RegistrationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('#');

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

  const fetchRegistration = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const result = await registrationService.getAllRegistrations();
      if (result.success && result.data) {
        const reg = result.data.find(r => r.id === id);
        if (reg) {
          setRegistration(reg);
        } else {
          router.push('/admin/registrations');
        }
      }
    } catch (error) {
      console.error('Error fetching registration:', error);
      router.push('/admin/registrations');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const generateWhatsAppUrl = useCallback(async () => {
    if (!registration || !registration.no_telepon || !registration.nama) return;
    
    try {
      const url = await getWhatsAppUrl(registration.no_telepon, registration.nama);
      setWhatsappUrl(url);
    } catch (error) {
      console.error('Error generating WhatsApp URL:', error);
      setWhatsappUrl('#');
    }
  }, [registration, getWhatsAppUrl]);

  useEffect(() => {
    if (params.id) {
      fetchRegistration(params.id as string);
    }
  }, [params.id, fetchRegistration]);

  useEffect(() => {
    if (registration && registration.no_telepon && registration.nama) {
      generateWhatsAppUrl();
    }
  }, [registration, generateWhatsAppUrl]);

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

  if (!registration) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pendaftaran tidak ditemukan</h2>
        <Link href="/admin/registrations">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/registrations">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detail Pendaftaran</h1>
            <p className="text-gray-600 mt-1">Informasi lengkap pendaftar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                  <p className="text-lg font-semibold text-gray-900">{registration.nama}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">NIM</label>
                  <p className="text-lg font-semibold text-gray-900">{registration.nim}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Alamat Domisili</label>
                <p className="text-gray-900 mt-1">{registration.alamat_domisili}</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Informasi Akademik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Fakultas</label>
                  <p className="text-lg font-semibold text-gray-900">{getFakultasName(registration.fakultas)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Program Studi</label>
                  <p className="text-lg font-semibold text-gray-900">{getProgramStudiName(registration.program_studi)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Alasan Bergabung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900 leading-relaxed">{registration.alasan_bergabung}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* KTM Photo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Foto KTM
              </CardTitle>
            </CardHeader>
            <CardContent>
              {registration.foto_ktm_url ? (
                <div className="space-y-3">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                    <Image
                      src={registration.foto_ktm_url}
                      alt="Foto KTM"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(registration.foto_ktm_url, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Lihat Full Size
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Foto KTM tidak tersedia</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Informasi Waktu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Tanggal Daftar</label>
                <p className="text-gray-900">
                  {new Date(registration.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {registration.updated_at !== registration.created_at && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                  <p className="text-gray-900">
                    {new Date(registration.updated_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi</CardTitle>
              <CardDescription>Hubungi pendaftar via WhatsApp</CardDescription>
            </CardHeader>
              <CardContent className="space-y-3">
                {registration.no_telepon ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi via WhatsApp
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Nomor Telepon Tidak Tersedia
                  </span>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
