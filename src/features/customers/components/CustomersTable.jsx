import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export function CustomersTable({
  customers,
  onDelete
}) {
  if (customers.length === 0) {
    return <div className="rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground">No customers match your search.</div>;
  }
  return <div className="rounded-md border border-border"><Table aria-label="Customers">
        <TableHeader><TableRow>
            <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead className="w-24 text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.full_name}</TableCell><TableCell>{c.email}</TableCell><TableCell className="font-mono text-xs">{c.phone}</TableCell><TableCell className="text-right"><Button size="icon" variant="ghost" aria-label={`Delete ${c.full_name}`} onClick={() => onDelete(c)}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>
          ))}</TableBody></Table></div>;
}