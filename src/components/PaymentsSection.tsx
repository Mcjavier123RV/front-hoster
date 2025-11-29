import { useEffect, useState } from "react";
import { CreditCard, DollarSign, Download, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function PaymentsSection() {
  const [payments, setPayments] = useState([]);
  const [nextPayment, setNextPayment] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://hosterlink.somee.com/api/Payment";

  const stored = JSON.parse(localStorage.getItem("auth"));
  const token = stored?.token;
  const userId = stored?.userId;

  // -----------------------------
  // GET Pagos del usuario
  // -----------------------------
  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_URL}/by-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener pagos");

      const data = await res.json();
      setPayments(data);

      // Buscar el próximo pago pendiente
      const pending = data.filter((p) => p.status === "Pending");
      if (pending.length > 0) {
        const next = pending[0];
        const due = new Date(next.dueDate);
        const today = new Date();
        const daysLeft = Math.max(0, Math.ceil((due - today) / (1000 * 60 * 60 * 24)));

        setNextPayment({
          month: next.paymentType,
          amount: `$${next.amount}`,
          dueDate: due.toLocaleDateString(),
          daysLeft,
        });
      } else {
        setNextPayment(null);
      }

      // Resumen
      const totalPaid = data
        .filter((p) => p.status === "Completed")
        .reduce((acc, p) => acc + p.amount, 0);

      const totalPending = data
        .filter((p) => p.status === "Pending")
        .reduce((acc, p) => acc + p.amount, 0);

      setSummary({
        totalPaid: `$${totalPaid}`,
        totalPending: `$${totalPending}`,
        yearlyTotal: `$${totalPaid}`,
        paymentStreak: data.filter((p) => p.status === "Completed").length,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando pagos...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-foreground mb-2">Pagos y Cuotas</h1>
      <p className="text-muted-foreground">Administra tus pagos y revisa tu historial</p>

      {/* --- CARDS DE RESUMEN --- */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">Total Pagado: {summary.totalPaid}</Card>
          <Card className="p-6">Pendiente: {summary.totalPending}</Card>
          <Card className="p-6">Total Anual: {summary.yearlyTotal}</Card>
          <Card className="p-6">Racha: {summary.paymentStreak} Pagos</Card>
        </div>
      )}

      {/* --- PRÓXIMO PAGO --- */}
      {nextPayment ? (
        <Card className="p-6">
          <h2>Próximo pago</h2>
          <p>Periodo: {nextPayment.month}</p>
          <p>Monto: {nextPayment.amount}</p>
          <p>Fecha límite: {nextPayment.dueDate}</p>
          <p>Días restantes: {nextPayment.daysLeft}</p>
        </Card>
      ) : (
        <Card className="p-6 text-green-500">
          No tienes pagos pendientes 🎉
        </Card>
      )}

      {/* --- HISTORIAL --- */}
      <Card className="p-6">
        <h2 className="mb-4">Historial de Pagos</h2>

        <div className="space-y-4">
          {payments.map((p) => (
            <div key={p.id} className="p-4 border rounded-md flex justify-between">
              <div>
                <p>{p.paymentType}</p>
                <p className="text-muted-foreground">{new Date(p.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="text-right">
                <p>${p.amount}</p>
                <Badge
                  className={
                    p.status === "Completed"
                      ? "bg-green-500/20 text-green-500"
                      : p.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-red-500/20 text-red-500"
                  }
                >
                  {p.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
