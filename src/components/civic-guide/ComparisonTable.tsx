interface ComparisonTableProps {
  columns: string[];
  rows: { label: string; values: string[] }[];
  title: string;
  subtitle?: string;
  className?: string;
}

export function ComparisonTable({ columns, rows, title, subtitle, className = "" }: ComparisonTableProps) {
  return (
    <figure className={`lg-comp-table ${className}`}>
      <figcaption className="lg-comp-table-header">
        <span className="lg-comp-table-title">{title}</span>
        {subtitle && <span className="lg-comp-table-subtitle">{subtitle}</span>}
      </figcaption>
      <div className="lg-comp-table-scroll">
        <table className="lg-comp-table-grid">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="lg-comp-table-th">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="lg-comp-table-row">
                <td className="lg-comp-table-label">{row.label}</td>
                {row.values.map((val, j) => (
                  <td key={j} className="lg-comp-table-cell">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
