import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { getStatusColor } from '../../utils/helpers';

export const Table = ({ 
  columns, 
  data, 
  onView, 
  onEdit, 
  onDelete,
  loading = false 
}) => {
  if (loading) return <div className="p-6 text-center text-gray-500">Đang tải...</div>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">
                {col.label}
              </th>
            ))}
            <th className="text-center py-3 px-4 text-gray-600 font-semibold text-sm">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 text-gray-800 text-sm">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-2">
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye size={18} />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không có dữ liệu
        </div>
      )}
    </div>
  );
};
export default Table;

