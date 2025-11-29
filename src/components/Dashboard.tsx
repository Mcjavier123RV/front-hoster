import { useState } from "react";
import {
  Building2,
  CreditCard,
  Bell,
  Calendar,
  Wrench,
  Users,
  LogOut,
  Home,
  TrendingUp,
  CheckCircle2,
  Clock,
  Crown,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

import PaymentsSection from "../components/PaymentsSection";
import AnnouncementsSection from "../components/AnnouncementsSection";
import ReservationsSection from "../components/ReservationsSection";
import MaintenanceSection from "../components/MaintenanceSection";
import VisitorsSection from "../components/VisitorsSection";
import MyUnitSection from "../components/MyUnitSection";

interface DashboardProps {
  userEmail: string | null;
  onLogout: () => void;
}

type Section =
  | "home"
  | "payments"
  | "announcements"
  | "reservations"
  | "maintenance"
  | "visitors"
  | "unit";

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>("home");

  // 🔥 FIX 1 — Si no hay email, mostrar carga
  if (!userEmail || typeof userEmail !== "string") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-lg animate-pulse">Cargando tu información...</p>
      </div>
    );
  }

  // 🔥 FIX 2 — Convertir email a string siempre
  const safeEmail = String(userEmail ?? "");

  // 🔥 FIX 3 — Evitar reventar si no hay @
  const userName = safeEmail.includes("@")
    ? safeEmail.split("@")[0]
    : safeEmail;

  const stats = [
    {
      label: "Pagos al día",
      value: "12/12",
      icon: CheckCircle2,
      color: "text-green-400",
      section: "payments" as Section,
    },
    {
      label: "Reservas activas",
      value: "2",
      icon: Calendar,
      color: "text-primary",
      section: "reservations" as Section,
    },
    {
      label: "Pendientes",
      value: "1",
      icon: Clock,
      color: "text-amber-400",
      section: "maintenance" as Section,
    },
  ];

  const quickActions = [
    {
      title: "Pagos y Cuotas",
      description: "Gestiona tus pagos mensuales",
      icon: CreditCard,
      badge: "Al día",
      badgeVariant: "default" as const,
      gradient: "from-emerald-600/20 to-emerald-900/20",
      section: "payments" as Section,
    },
    {
      title: "Anuncios",
      description: "Comunicados importantes",
      icon: Bell,
      badge: "3 nuevos",
      badgeVariant: "secondary" as const,
      gradient: "from-blue-600/20 to-blue-900/20",
      section: "announcements" as Section,
    },
    {
      title: "Reservas",
      description: "Áreas comunes disponibles",
      icon: Calendar,
      badge: "Disponible",
      badgeVariant: "outline" as const,
      gradient: "from-purple-600/20 to-purple-900/20",
      section: "reservations" as Section,
    },
    {
      title: "Mantenimiento",
      description: "Reporta incidencias",
      icon: Wrench,
      badge: "1 pendiente",
      badgeVariant: "secondary" as const,
      gradient: "from-amber-600/20 to-amber-900/20",
      section: "maintenance" as Section,
    },
    {
      title: "Visitantes",
      description: "Registra tus visitas",
      icon: Users,
      badge: "Activo",
      badgeVariant: "default" as const,
      gradient: "from-pink-600/20 to-pink-900/20",
      section: "visitors" as Section,
    },
    {
      title: "Mi Unidad",
      description: "Información de tu propiedad",
      icon: Home,
      badge: "Torre A-502",
      badgeVariant: "outline" as const,
      gradient: "from-cyan-600/20 to-cyan-900/20",
      section: "unit" as Section,
    },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case "payments":
        return <PaymentsSection />;
      case "announcements":
        return <AnnouncementsSection />;
      case "reservations":
        return <ReservationsSection />;
      case "maintenance":
        return <MaintenanceSection />;
      case "visitors":
        return <VisitorsSection />;
      case "unit":
        return <MyUnitSection />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <>
      {/* Welcome Section */}
      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6 text-primary" />
            <p className="text-muted-foreground">Bienvenid@</p>
          </div>
          <h1 className="text-foreground mb-4 capitalize">{userName}</h1>
          <p className="text-foreground/80 max-w-2xl">
            Gestiona todos los servicios de tu condominio desde un solo lugar.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                onClick={() => setCurrentSection(stat.section)}
                className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 cursor-pointer hover:border-primary/50 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className={`${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-foreground">Accesos Rápidos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              onClick={() => setCurrentSection(action.section)}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary group-hover:to-accent transition-all duration-300">
                    <action.icon className="w-6 h-6 text-primary group-hover:text-background transition-colors duration-300" />
                  </div>
                  <Badge variant={action.badgeVariant} className="border-primary/30">
                    {action.badge}
                  </Badge>
                </div>
                <h3 className="text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#1a1a24] to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {currentSection !== "home" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentSection("home")}
                  className="mr-2 text-primary hover:text-accent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Crown className="w-6 h-6 text-background" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-primary">HosterLink</h2>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Avatar className="border-2 border-primary/50">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-background">
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden text-primary"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="sm:hidden pb-4 border-t border-border mt-2 pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="w-full flex items-center gap-2 text-muted-foreground hover:text-primary justify-center"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 HosterLink. Gestión de lujo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
