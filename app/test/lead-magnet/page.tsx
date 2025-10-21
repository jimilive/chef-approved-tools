import { generateLeadMagnetHTML } from '@/lib/lead-magnet-content'

export default function LeadMagnetPreview() {
  const htmlContent = generateLeadMagnetHTML()

  return (
    <div>
      <div style={{
        background: '#dc2626',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        ⚠️ DEV PREVIEW ONLY - NOT FOR PRODUCTION ⚠️
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
