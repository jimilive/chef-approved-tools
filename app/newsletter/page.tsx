export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
        Get Weekly Kitchen Tips
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '32px' }}>
        Join 15,000+ home chefs getting exclusive deals, equipment recommendations, and professional cooking tips.
      </p>

      <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '12px', marginBottom: '32px' }}>
        <form style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input 
            type="email" 
            placeholder="Your email address" 
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid #d1d5db', 
              fontSize: '1rem',
              marginBottom: '16px'
            }}
          />
          <button style={{ 
            width: '100%',
            backgroundColor: '#ea580c', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            border: 'none', 
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Get Free Kitchen Tips
          </button>
        </form>
      </div>

      <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>What You&rsquo;ll Get:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Weekly equipment recommendations from a certified chef
          </li>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Exclusive deals on professional kitchen tools
          </li>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Pro cooking tips from restaurant experience
          </li>
          <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#ea580c', marginRight: '8px' }}>✓</span>
            Equipment maintenance guides
          </li>
        </ul>
      </div>
    </div>
  );
}