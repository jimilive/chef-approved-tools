export default function TestPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'red', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          🔥 CSS TEST! 🔥
        </h1>
        <p style={{ fontSize: '1.5rem' }}>
          If you see RED background now, Tailwind is broken!
        </p>
      </div>
    </div>
  )
}