// Script to fix settings database issues
// Run this if you're having problems with the settings table

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixSettingsDatabase() {
  console.log('🔧 Fixing settings database...\n');

  try {
    // 1. Check if settings table exists and has data
    console.log('1. Checking current settings...');
    const { data: settings, error: fetchError } = await supabase
      .from('settings')
      .select('*');

    if (fetchError) {
      console.log('❌ Error fetching settings:', fetchError.message);
      return;
    }

    console.log('✅ Settings found:', settings);

    // 2. Check if whatsapp_template exists
    const whatsappTemplate = settings.find(s => s.key === 'whatsapp_template');
    
    if (whatsappTemplate) {
      console.log('✅ WhatsApp template exists:', whatsappTemplate.value);
    } else {
      console.log('❌ WhatsApp template not found, creating...');
      
      // Insert the template
      const { data: insertData, error: insertError } = await supabase
        .from('settings')
        .insert({
          key: 'whatsapp_template',
          value: 'Halo {nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika',
          description: 'Template pesan WhatsApp untuk notifikasi pendaftaran'
        })
        .select();

      if (insertError) {
        console.log('❌ Error inserting template:', insertError.message);
      } else {
        console.log('✅ WhatsApp template created successfully');
      }
    }

    // 3. Test update functionality
    console.log('\n2. Testing update functionality...');
    const { data: updateData, error: updateError } = await supabase
      .from('settings')
      .update({
        value: 'Halo {nama}! Test template - ' + new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('key', 'whatsapp_template')
      .select();

    if (updateError) {
      console.log('❌ Error updating template:', updateError.message);
    } else {
      console.log('✅ Update test successful:', updateData[0]);
    }

    // 4. Restore original template
    console.log('\n3. Restoring original template...');
    const { data: restoreData, error: restoreError } = await supabase
      .from('settings')
      .update({
        value: 'Halo {nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika',
        updated_at: new Date().toISOString()
      })
      .eq('key', 'whatsapp_template')
      .select();

    if (restoreError) {
      console.log('❌ Error restoring template:', restoreError.message);
    } else {
      console.log('✅ Original template restored');
    }

    console.log('\n🎉 Database fix completed!');

  } catch (error) {
    console.error('❌ Error during database fix:', error);
  }
}

// Run the fix
fixSettingsDatabase();
