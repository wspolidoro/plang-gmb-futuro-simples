
import { ColumnDef } from "@tanstack/react-table"
import ColumnsActions from "./columnsActions"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "planName",
    header: "Nome do Plano",
  },
  {
    accessorKey: "planValue",
    header: "Valor do plano",
  },
    {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const plano = row.original;
 
      return <ColumnsActions plano={plano} />;
    },
  },
]