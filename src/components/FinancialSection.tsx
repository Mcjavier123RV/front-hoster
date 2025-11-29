import { DollarSign, Plus, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  unit?: string;
}

export default function FinancialSection() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '01 Nov 2025',
      description: 'Cuota mensual - Torre A-502',
      category: 'Cuotas',
      amount: 350.00,
      type: 'income',
      unit: 'Torre A-502'
    },
    {
      id: 2,
      date: '01 Nov 2025',
      description: 'Cuota mensual - Torre B-301',
      category: 'Cuotas',
      amount: 350.00,
      type: 'income',
      unit: 'Torre B-301'
    },
    {
      id: 3,
      date: '03 Nov 2025',
      description: 'Mantenimiento de piscina',
      category: 'Mantenimiento',
      amount: 450.00,
      type: 'expense'
    },
    {
      id: 4,
      date: '05 Nov 2025',
      description: 'Cuota mensual - Torre C-105',
      category: 'Cuotas',
      amount: 350.00,
      type: 'income',
      unit: 'Torre C-105'
    },
    {
      id: 5,
      date: '08 Nov 2025',
      description: 'Servicio de jardinería',
      category: 'Servicios',
      amount: 200.00,
      type: 'expense'
    },
    {
      id: 6,
      date: '10 Nov 2025',
      description: 'Reparación de elevador',
      category: 'Mantenimiento',
      amount: 850.00,
      type: 'expense'
    },
    {
      id: 7,
      date: '12 Nov 2025',
      description: 'Cuota mensual - Torre B-405',
      category: 'Cuotas',
      amount: 350.00,
      type: 'income',
      unit: 'Torre B-405'
    },
    {
      id: 8,
      date: '15 Nov 2025',
      description: 'Servicio de seguridad',
      category: 'Servicios',
      amount: 600.00,
      type: 'expense'
    }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    type: 'income' as 'income' | 'expense',
    unit: ''
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
      type: formData.type,
      unit: formData.unit || undefined
    };
    setTransactions([newTransaction, ...transactions]);
    setShowDialog(false);
    setFormData({
      description: '',
      category: '',
      amount: '',
      type: 'income',
      unit: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Gestión Financiera</h1>
          <p className="text-muted-foreground">Control de ingresos y egresos del condominio</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 gap-2"
          >
            <Download className="w-5 h-5" />
            Exportar
          </Button>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary gap-2">
                <Plus className="w-5 h-5" />
                Agregar Movimiento
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Nuevo Movimiento</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Movimiento</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger id="type" className="bg-input-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Ingreso</SelectItem>
                      <SelectItem value="expense">Egreso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    placeholder="Ej: Cuota mensual - Torre A-502"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-input-background border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category" className="bg-input-background border-border">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cuotas">Cuotas</SelectItem>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Reparaciones">Reparaciones</SelectItem>
                      <SelectItem value="Eventos">Eventos</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="bg-input-background border-border"
                    required
                  />
                </div>
                {formData.type === 'income' && (
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidad (Opcional)</Label>
                    <Input
                      id="unit"
                      placeholder="Ej: Torre A-502"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="bg-input-background border-border"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary flex-1">
                    Agregar
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
                <p className="text-green-400">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Egresos Totales</p>
                <p className="text-red-400">${totalExpense.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Balance</p>
                <p className={balance >= 0 ? 'text-green-400' : 'text-red-400'}>
                  ${balance.toFixed(2)}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${balance >= 0 ? 'bg-primary/20 border-primary/30' : 'bg-red-500/20 border-red-500/30'} border flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-primary' : 'text-red-400'}`} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <div className="p-6">
          <h2 className="text-foreground mb-4">Movimientos Recientes</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Fecha</TableHead>
                  <TableHead className="text-muted-foreground">Descripción</TableHead>
                  <TableHead className="text-muted-foreground">Categoría</TableHead>
                  <TableHead className="text-muted-foreground">Unidad</TableHead>
                  <TableHead className="text-muted-foreground">Tipo</TableHead>
                  <TableHead className="text-muted-foreground text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-border">
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {transaction.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/50">
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.unit || '-'}
                    </TableCell>
                    <TableCell>
                      {transaction.type === 'income' ? (
                        <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                          Ingreso
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                          Egreso
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className={`text-right ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
