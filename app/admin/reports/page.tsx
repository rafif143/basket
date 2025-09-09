"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  PieChart
} from "lucide-react";
import { registrationService } from "@/lib/supabase";

interface RegistrationStats {
  total_registrations: number;
  fti_count: number;
  fhb_count: number;
}

interface MonthlyData {
  month: string;
  count: number;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
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

        // Calculate monthly data
        const monthly = registrations.reduce((acc: { [key: string]: number }, reg) => {
          const month = new Date(reg.created_at).toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long' 
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const monthlyArray = Object.entries(monthly)
          .map(([month, count]) => ({ month, count }))
          .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

        setMonthlyData(monthlyArray);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    // This would typically fetch all data and export to CSV
    // For now, we'll just show an alert
    alert('Fitur export CSV akan segera tersedia');
  };

  const exportToPDF = () => {
    // This would typically generate a PDF report
    // For now, we'll just show an alert
    alert('Fitur export PDF akan segera tersedia');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Pendaftaran</h1>
          <p className="text-gray-600 mt-2">Analisis dan statistik pendaftaran UKM Basket ITB Yadika</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={exportToPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <BarChart3 className="h-4 w-4 text-orange-500" />
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
            <PieChart className="h-4 w-4 text-blue-500" />
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

      {/* Faculty Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Fakultas</CardTitle>
            <CardDescription>Persentase pendaftaran berdasarkan fakultas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">Fakultas Teknologi dan Informasi</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stats?.fti_count || 0}</div>
                  <div className="text-sm text-gray-500">
                    {stats?.total_registrations ? 
                      Math.round((stats.fti_count / stats.total_registrations) * 100) 
                      : 0}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Fakultas Hukum dan Bisnis</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stats?.fhb_count || 0}</div>
                  <div className="text-sm text-gray-500">
                    {stats?.total_registrations ? 
                      Math.round((stats.fhb_count / stats.total_registrations) * 100) 
                      : 0}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Tren Bulanan
          </CardTitle>
          <CardDescription>Jumlah pendaftaran per bulan</CardDescription>
        </CardHeader>
        <CardContent>
          {monthlyData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada data pendaftaran
            </div>
          ) : (
            <div className="space-y-3">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((data.count / Math.max(...monthlyData.map(d => d.count))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold w-8 text-right">{data.count}</span>
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
