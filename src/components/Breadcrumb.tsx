interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      className="breadcrumb-nav"
      style={{ 
        marginBottom: '1rem',
        fontSize: '0.813rem',
        color: '#888',
        padding: 0,
        border: 'none'
      }}
    >
      <ol style={{ 
        display: 'flex', 
        alignItems: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        gap: '0.375rem'
      }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            {index > 0 && (
              <span style={{ color: '#ccc' }}>/</span>
            )}
            {item.onClick ? (
              <button
                onClick={item.onClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                  fontSize: '0.813rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#888';
                }}
              >
                {item.label}
              </button>
            ) : (
              <span style={{ color: '#333' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
