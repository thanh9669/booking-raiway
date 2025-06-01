import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${className}`}>
        {children}
      </table>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export function TableRow({ children, className = '' }: TableRowProps) {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = '' }: TableRowProps) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      {children}
    </td>
  );
}
