"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, FileText, MapPin, GraduationCap, BookOpen, MessageSquare, CheckCircle, Upload, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { registrationService } from "@/lib/supabase";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    noTelepon: "",
    fotoKtm: null as File | null,
    alamatDomisili: "",
    fakultas: "",
    programStudi: "",
    alasanBergabung: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      fotoKtm: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      let fotoKtmUrl = "";

      // Upload file if exists
      if (formData.fotoKtm) {
        const uploadResult = await registrationService.uploadFile(formData.fotoKtm, formData.fotoKtm.name);
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(`Gagal mengupload foto KTM: ${uploadResult.error || 'URL tidak tersedia'}`);
        }
        fotoKtmUrl = uploadResult.url;
      }

      // Submit registration data
      const result = await registrationService.createRegistration({
        ...formData,
        fotoKtmUrl
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setIsSuccess(true);
      
      // Reset form
      setFormData({
        nama: "",
        nim: "",
        noTelepon: "",
        fotoKtm: null,
        alamatDomisili: "",
        fakultas: "",
        programStudi: "",
        alasanBergabung: ""
      });

    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgramStudiOptions = () => {
    if (formData.fakultas === "FTI") {
      return [
        { value: "STI", label: "Sistem dan Teknologi Informasi" },
        { value: "SI", label: "Sistem Informasi" }
      ];
    } else if (formData.fakultas === "FHB") {
      return [
        { value: "AK", label: "Akuntansi" },
        { value: "MN", label: "Manajemen" },
        { value: "HB", label: "Hukum Bisnis" }
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-black/80 backdrop-blur-md border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="absolute top-20 left-10 w-16 h-16 bg-orange-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-red-600 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-40 left-20 w-14 h-14 bg-orange-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge 
            variant="outline" 
            className="mb-6 border-orange-500 text-orange-400 bg-orange-500/10 px-4 py-2 text-sm font-medium"
          >
            🏀 Bergabung dengan Tim Terbaik
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              PENDAFTARAN
            </span>
            <br />
            <span className="text-2xl md:text-4xl text-gray-300">
              Basket ITB Yadika
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Daftarkan diri Anda sekarang dan bergabunglah dengan komunitas basket terbaik di ITB Yadika Pasuruan. 
            Raih prestasi bersama tim yang solid dan penuh semangat!
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="bg-black/40 backdrop-blur-sm border border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white flex items-center">
                      <User className="w-6 h-6 mr-3 text-orange-500" />
                      Form Pendaftaran
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Lengkapi data diri Anda dengan benar dan lengkap
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Success Message */}
                    {isSuccess && (
                      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-400">Pendaftaran Berhasil!</h4>
                          <p className="text-sm text-gray-300 mt-1">
                            Terima kasih telah mendaftar. Data Anda telah tersimpan dan akan segera diproses.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-3">
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-red-400">Gagal Mendaftar</h4>
                          <p className="text-sm text-gray-300 mt-1">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Nama */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          name="nama"
                          value={formData.nama}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          placeholder="Masukkan nama lengkap Anda"
                        />
                      </div>

                      {/* NIM */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          NIM *
                        </label>
                        <input
                          type="text"
                          name="nim"
                          value={formData.nim}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          placeholder="Masukkan NIM Anda"
                        />
                      </div>

                      {/* Nomor Telepon */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Nomor Telepon/WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="noTelepon"
                          value={formData.noTelepon}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          placeholder="Contoh: 081234567890"
                        />
                        <p className="text-xs text-gray-400 mt-1">Gunakan format: 08xxxxxxxxxx</p>
                      </div>

                      {/* Foto KTM */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Foto KTM *
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-500 file:text-white hover:file:bg-orange-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          />
                          <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG, PDF (Max: 5MB)</p>
                      </div>

                      {/* Alamat Domisili */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Alamat Domisili *
                        </label>
                        <textarea
                          name="alamatDomisili"
                          value={formData.alamatDomisili}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                          placeholder="Masukkan alamat domisili lengkap Anda"
                        />
                      </div>

                      {/* Fakultas */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <GraduationCap className="w-4 h-4 inline mr-2" />
                          Fakultas *
                        </label>
                        <select
                          name="fakultas"
                          value={formData.fakultas}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                        >
                          <option value="">Pilih Fakultas</option>
                          <option value="FTI">Fakultas Teknologi dan Informasi</option>
                          <option value="FHB">Fakultas Hukum dan Bisnis</option>
                        </select>
                      </div>

                      {/* Program Studi */}
                      {formData.fakultas && (
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            <BookOpen className="w-4 h-4 inline mr-2" />
                            Program Studi *
                          </label>
                          <select
                            name="programStudi"
                            value={formData.programStudi}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          >
                            <option value="">Pilih Program Studi</option>
                            {getProgramStudiOptions().map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Alasan Bergabung */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <MessageSquare className="w-4 h-4 inline mr-2" />
                          Alasan Bergabung *
                        </label>
                        <textarea
                          name="alasanBergabung"
                          value={formData.alasanBergabung}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                          placeholder="Ceritakan alasan Anda ingin bergabung dengan Basket ITB Yadika..."
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Mengirim Pendaftaran...
                          </>
                        ) : isSuccess ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Pendaftaran Berhasil!
                          </>
                        ) : (
                          <>
                            <Trophy className="w-5 h-5 mr-2" />
                            Daftar Sekarang
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Requirements Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-black/40 backdrop-blur-sm border border-orange-500/20 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-orange-500" />
                      Persyaratan
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Pastikan Anda memenuhi semua persyaratan berikut
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Mahasiswa Aktif</h4>
                          <p className="text-sm text-gray-400">Mahasiswa aktif ITB Yadika Pasuruan</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Sehat Jasmani</h4>
                          <p className="text-sm text-gray-400">Tidak ada masalah kesehatan yang menghalangi kegiatan basket</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Komitmen</h4>
                          <p className="text-sm text-gray-400">Bersedia mengikuti jadwal latihan dan pertandingan</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Semangat Tim</h4>
                          <p className="text-sm text-gray-400">Memiliki semangat kerja sama dan sportivitas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Dokumen Lengkap</h4>
                          <p className="text-sm text-gray-400">Menyiapkan semua dokumen yang diperlukan</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <h4 className="font-medium text-orange-400 mb-2">📞 Butuh Bantuan?</h4>
                      <p className="text-sm text-gray-300">
                        Jika ada pertanyaan terkait pendaftaran, silakan hubungi kami melalui kontak yang tersedia.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
