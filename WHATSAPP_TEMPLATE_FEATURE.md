# WhatsApp Template Feature

## Overview
This feature allows administrators to dynamically manage WhatsApp message templates through the admin panel. The templates are stored in a database and can be updated without code changes.

## Features

### 1. Dynamic Template Storage
- Templates are stored in a `settings` table in Supabase
- Templates can be updated through the admin interface
- Fallback to default template if database is unavailable

### 2. Admin Interface
- **Location**: `/admin/settings`
- **Features**:
  - View current template
  - Edit template with live preview
  - Save changes to database
  - Reset to default template
  - Real-time preview with sample data

### 3. Template Variables
- `{nama}` - Replaced with the actual name of the registrant
- More variables can be added in the future

## Database Schema

### Settings Table
```sql
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Default Data
```sql
INSERT INTO settings (key, value, description) VALUES 
('whatsapp_template', 'Halo {nama}! Terima kasih telah mendaftar di UKM Basket ITB Yadika. Kami akan segera menghubungi Anda untuk informasi lebih lanjut. Salam, Tim Basket ITB Yadika', 'Template pesan WhatsApp untuk notifikasi pendaftaran');
```

## API Functions

### Settings Service (`lib/supabase.js`)

#### `settingsService.getSetting(key)`
- Retrieves a specific setting by key
- Returns: `{ success: boolean, data: object, error: string }`

#### `settingsService.updateSetting(key, value, description)`
- Updates or creates a setting
- Returns: `{ success: boolean, data: object, error: string }`

#### `settingsService.updateWhatsAppTemplate(template)`
- Convenience function to update WhatsApp template
- Returns: `{ success: boolean, data: object, error: string }`

## Implementation Details

### 1. Admin Settings Page
- **File**: `app/admin/settings/page.tsx`
- **Features**:
  - Loads template from database on mount
  - Shows loading state while fetching
  - Real-time preview with sample data
  - Error handling with user feedback
  - Save and reset functionality

### 2. WhatsApp URL Generation
All admin pages now use dynamic templates:

#### Registrations List (`app/admin/registrations/page.tsx`)
- Pre-generates WhatsApp URLs for all registrations
- Uses async `getWhatsAppUrl()` function
- Caches URLs in component state

#### Admin Dashboard (`app/admin/page.tsx`)
- Pre-generates WhatsApp URLs for recent registrations
- Uses async `getWhatsAppUrl()` function
- Caches URLs in component state

#### Individual Registration (`app/admin/registrations/[id]/page.tsx`)
- Generates WhatsApp URL for specific registration
- Uses async `getWhatsAppUrl()` function
- Caches URL in component state

### 3. Template Processing
```javascript
const getWhatsAppUrl = async (phone: string, nama: string) => {
  // Get template from database
  const result = await settingsService.getSetting('whatsapp_template');
  const template = result.success && result.data 
    ? result.data.value 
    : defaultTemplate;
  
  // Replace {nama} placeholder with actual name
  const personalizedTemplate = template.replace('{nama}', nama);
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(personalizedTemplate)}`;
};
```

## Usage

### For Administrators

1. **Access Settings**:
   - Go to `/admin/settings`
   - Navigate to "Pengaturan WhatsApp" section

2. **Edit Template**:
   - Modify the template text in the textarea
   - Use `{nama}` placeholder for registrant name
   - Preview changes in real-time

3. **Save Changes**:
   - Click "Simpan" to save to database
   - Changes take effect immediately

4. **Reset Template**:
   - Click "Reset" to restore default template
   - Confirm the reset action

### For Developers

1. **Add New Variables**:
   - Update template processing logic
   - Add new placeholder replacements
   - Update admin interface documentation

2. **Extend Settings**:
   - Add new settings keys to database
   - Create new service functions
   - Add UI components for new settings

## Error Handling

### Database Errors
- Falls back to default template if database is unavailable
- Shows error messages to users
- Logs errors to console for debugging

### Template Errors
- Validates template before saving
- Shows preview with sample data
- Handles malformed templates gracefully

## Testing

### Manual Testing
1. Access admin settings page
2. Edit WhatsApp template
3. Save changes
4. Test WhatsApp links in admin pages
5. Verify template is applied correctly

### Automated Testing
Run the test script:
```bash
node test-whatsapp-template.js
```

## Migration

### Database Migration
Run the migration script to create the settings table:
```sql
-- Run supabase/migrations/001_create_settings_table.sql
```

### Code Migration
- All existing hardcoded templates have been replaced
- New async functions handle template loading
- Backward compatibility maintained with fallbacks

## Future Enhancements

1. **Multiple Templates**:
   - Different templates for different scenarios
   - Template selection in admin interface

2. **Rich Variables**:
   - More dynamic data (registration date, program, etc.)
   - Conditional template sections

3. **Template History**:
   - Track template changes
   - Rollback to previous versions

4. **Template Validation**:
   - Syntax checking for placeholders
   - Character limit validation
   - Preview with real data

## Troubleshooting

### Common Issues

1. **Template not updating**:
   - Check database connection
   - Verify admin permissions
   - Clear browser cache

2. **WhatsApp links not working**:
   - Check phone number formatting
   - Verify template has valid placeholders
   - Test with sample data

3. **Database errors**:
   - Check Supabase connection
   - Verify table exists
   - Check RLS policies

### Debug Steps

1. Check browser console for errors
2. Verify database connection
3. Test settings service functions
4. Check template processing logic
5. Validate WhatsApp URL generation
