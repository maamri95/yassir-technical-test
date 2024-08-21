import { HeaderContext } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../components/ui/button';

export function WithHeader<TData>(label: string) {
  return ({ column }: HeaderContext<TData, unknown>) =>
    (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
}
