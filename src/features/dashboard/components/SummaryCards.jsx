import { Boxes, Receipt, TriangleAlert, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const CARD_STYLE = "shadow-sm";
export function SummaryCards(props) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className={CARD_STYLE}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total products</CardTitle><Boxes className="h-4 w-4 text-muted-foreground" aria-hidden={true} /></CardHeader><CardContent><div className="text-2xl font-semibold">{props.totalProducts}</div></CardContent></Card><Card className={CARD_STYLE}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total customers</CardTitle><Users className="h-4 w-4 text-muted-foreground" aria-hidden={true} /></CardHeader><CardContent><div className="text-2xl font-semibold">{props.totalCustomers}</div></CardContent></Card><Card className={CARD_STYLE}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total orders</CardTitle><Receipt className="h-4 w-4 text-muted-foreground" aria-hidden={true} /></CardHeader><CardContent><div className="text-2xl font-semibold">{props.totalOrders}</div></CardContent></Card><Card className={CARD_STYLE}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low stock</CardTitle><TriangleAlert className="h-4 w-4 text-amber-500" aria-hidden={true} /></CardHeader><CardContent><div className="text-2xl font-semibold">{props.lowStockCount}</div></CardContent></Card></div>;
}