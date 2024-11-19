import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToExcel, exportToPDF } from "@/lib/utils/export";

interface ExportButtonProps {
  data: any[];
  filename: string;
  type: 'excel' | 'pdf';
}

export function ExportButton({ data, filename, type }: ExportButtonProps) {
  const handleExport = () => {
    if (type === 'excel') {
      exportToExcel(data, filename);
    } else {
      exportToPDF(data, Object.keys(data[0]), filename);
    }
  };

  return (
    <Button onClick={handleExport}>
      <Download className="w-4 h-4 mr-2" />
      Export to {type.toUpperCase()}
    </Button>
  );
}