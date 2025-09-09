"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Save,
  RefreshCw,
  MessageCircle,
  Loader2
} from "lucide-react";
import { settingsService } from "@/lib/supabase";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    whatsappTemplate: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const defaultTemplate = "Halo {nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika";

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const result = await settingsService.getSetting('whatsapp_template');
      
      if (result.success && result.data) {
        setSettings({
          whatsappTemplate: result.data.value || defaultTemplate,
        });
      } else {
        // If no setting found, use default
        setSettings({
          whatsappTemplate: defaultTemplate,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Gagal memuat pengaturan' });
      // Use default template as fallback
      setSettings({
        whatsappTemplate: defaultTemplate,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });

      console.log('Saving WhatsApp template:', settings.whatsappTemplate);
      const result = await settingsService.updateWhatsAppTemplate(settings.whatsappTemplate);
      
      console.log('Save result:', result);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
      } else {
        setMessage({ type: 'error', text: 'Gagal menyimpan pengaturan: ' + result.error });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan pengaturan';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mereset template WhatsApp ke default?')) {
      setSettings({
        whatsappTemplate: defaultTemplate,
      });
      setMessage({ type: '', text: '' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <span className="text-gray-600">Memuat pengaturan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600 mt-2">Kelola konfigurasi sistem dan preferensi</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleReset} disabled={saving}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* WhatsApp Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Pengaturan WhatsApp
            </CardTitle>
            <CardDescription>
              Konfigurasi template pesan WhatsApp yang akan dikirim ke pendaftar baru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Pesan WhatsApp
              </label>
              <textarea
                value={settings.whatsappTemplate}
                onChange={(e) => setSettings(prev => ({ ...prev, whatsappTemplate: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Masukkan template pesan WhatsApp..."
                disabled={saving}
              />
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">
                  <strong>Variabel yang tersedia:</strong> {"{nama}"} - Nama pendaftar
                </p>
                <p className="text-xs text-gray-500">
                  Template ini akan digunakan untuk mengirim pesan WhatsApp otomatis kepada pendaftar baru.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                Preview Template:
              </h4>
              <div className="bg-white p-3 rounded border text-sm text-gray-600">
                {settings.whatsappTemplate.replace('{nama}', 'John Doe')}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-blue-700">
                  Template tersimpan di database dan dapat diubah kapan saja
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
