import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for registration
export const registrationService = {
  // Insert new registration
  async createRegistration(data) {
    try {
      const { data: result, error } = await supabase
        .from('registrations')
        .insert([
          {
            nama: data.nama,
            nim: data.nim,
            no_telepon: data.noTelepon,
            foto_ktm_url: data.fotoKtmUrl,
            alamat_domisili: data.alamatDomisili,
            fakultas: data.fakultas,
            program_studi: data.programStudi,
            alasan_bergabung: data.alasanBergabung,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      return { success: true, data: result[0] }
    } catch (error) {
      console.error('Error creating registration:', error)
      return { success: false, error: error.message }
    }
  },

  // Upload file to Supabase Storage
  async uploadFile(file, fileName) {
    try {
      const fileExt = fileName.split('.').pop()
      const filePath = `ktm/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return { success: true, url: publicUrl }
    } catch (error) {
      console.error('Error uploading file:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all registrations (for admin)
  async getAllRegistrations() {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching registrations:', error)
      return { success: false, error: error.message }
    }
  },

  // Get WhatsApp template
  async getWhatsAppTemplate() {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'whatsapp_template')
        .single()

      if (error) throw error
      return { success: true, template: data?.value || "Halo {nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika" }
    } catch (error) {
      console.error('Error getting WhatsApp template:', error)
      return { success: false, error: error.message }
    }
  }
}

// Settings service for managing application configuration
export const settingsService = {
  // Get all settings
  async getAllSettings() {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('key')

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching settings:', error)
      return { success: false, error: error.message }
    }
  },

  // Get specific setting by key
  async getSetting(key) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', key)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching setting:', error)
      return { success: false, error: error.message }
    }
  },

  // Update setting
  async updateSetting(key, value, description = null) {
    try {
      // First check if the setting exists
      const { data: existingData, error: checkError } = await supabase
        .from('settings')
        .select('id')
        .eq('key', key)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingData) {
        // Update existing record
        const { data, error } = await supabase
          .from('settings')
          .update({
            value,
            description,
            updated_at: new Date().toISOString()
          })
          .eq('key', key)
          .select()

        if (error) throw error
        return { success: true, data: data[0] }
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('settings')
          .insert({
            key,
            value,
            description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()

        if (error) throw error
        return { success: true, data: data[0] }
      }
    } catch (error) {
      console.error('Error updating setting:', error)
      return { success: false, error: error.message }
    }
  },

  // Update WhatsApp template specifically
  async updateWhatsAppTemplate(template) {
    return this.updateSetting('whatsapp_template', template, 'Template pesan WhatsApp untuk notifikasi pendaftaran')
  }
}
