import { useState } from 'react';
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
  MessageSquare,
  UserCog
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import PaymentsSection from './PaymentsSection';
import AnnouncementsSection from './AnnouncementsSection';
import ReservationsSection from './ReservationsSection';
import MaintenanceSection from './MaintenanceSection';
import VisitorsSection from './VisitorsSection';
import MyUnitSection from './MyUnitSection';
import NotificationsSection from './NotificationsSection';
import UsersManagementSection from './UsersManagementSection';
import FinancialSection from './FinancialSection';

interface AdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type Section = 'home' | 'payments' | 'announcements' | 'reservations' | 'maintenance' | 'visitors' | 'unit' | 'notifications' | 'users';

export default function AdminDashboard({ userEmail, onLogout }: AdminDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const userName = userEmail.split('@')[0];

  const stats = [
    { label: 'Usuarios Activos', value: '45', icon: Users, color: 'text-green-400', section: 'users' as Section },
    { label: 'Notificaciones', value: '12', icon: MessageSquare, color: 'text-primary', section: 'notifications' as Section },
    { label: 'Pendientes', value: '8', icon: Clock, color: 'text-amber-400', section: 'maintenance' as Section },
  ];

  const adminActions = [
    { 
      title: 'Notificaciones', 
      description: 'Solicitudes de inquilinos',
      icon: MessageSquare,
      badge: '12 nuevas',
      badgeVariant: 'secondary' as const,
      gradient: 'from-blue-600/20 to-blue-900/20',
      section: 'notifications' as Section
    },
    { 
      title: 'Panel de Registro de Usuarios', 
      description: 'Crear cuentas para administradores e inquilinos',
      icon: UserCog,
      badge: '45 usuarios',
      badgeVariant: 'default' as const,
      gradient: 'from-purple-600/20 to-purple-900/20',
      section: 'users' as Section
    },
    { 
      title: 'Pagos y Cuotas', 
      description: 'Gestiona los pagos',
      icon: CreditCard,
      badge: 'Al día',
      badgeVariant: 'default' as const,
      gradient: 'from-emerald-600/20 to-emerald-900/20',
      section: 'payments' as Section
    },
    { 
      title: 'Anuncios', 
      description: 'Comunicados importantes',
      icon: Bell,
      badge: '3 activos',
      badgeVariant: 'secondary' as const,
      gradient: 'from-blue-600/20 to-blue-900/20',
      section: 'announcements' as Section
    },
    { 
      title: 'Reservas', 
      description: 'Áreas comunes disponibles',
      icon: Calendar,
      badge: '8 reservas',
      badgeVariant: 'outline' as const,
      gradient: 'from-purple-600/20 to-purple-900/20',
      section: 'reservations' as Section
    },
    { 
      title: 'Mantenimiento', 
      description: 'Solicitudes de servicio',
      icon: Wrench,
      badge: '5 pendientes',
      badgeVariant: 'secondary' as const,
      gradient: 'from-amber-600/20 to-amber-900/20',
      section: 'maintenance' as Section
    },
    { 
      title: 'Visitantes', 
      description: 'Registros de visitas',
      icon: Users,
      badge: '3 hoy',
      badgeVariant: 'default' as const,
      gradient: 'from-pink-600/20 to-pink-900/20',
      section: 'visitors' as Section
    },
    { 
      title: 'Mi Perfil', 
      description: 'Información del administrador',
      icon: Home,
      badge: 'Admin',
      badgeVariant: 'outline' as const,
      gradient: 'from-cyan-600/20 to-cyan-900/20',
      section: 'unit' as Section
    },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'notifications':
        return <NotificationsSection />;
      case 'users':
        return <UsersManagementSection />;
      case 'payments':
        return <FinancialSection />;
      case 'announcements':
        return <AnnouncementsSection />;
      case 'reservations':
        return <ReservationsSection />;
      case 'maintenance':
        return <MaintenanceSection />;
      case 'visitors':
        return <VisitorsSection />;
      case 'unit':
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
            <Crown className="w-6 h-6 text-primary" />
            <p className="text-muted-foreground">Panel de Administración</p>
          </div>
          <h1 className="text-foreground mb-4 capitalize">Bienvenido, {userName}</h1>
          <p className="text-foreground/80 max-w-2xl">
            Gestiona todos los aspectos del condominio desde un solo lugar. Revisa solicitudes, administra usuarios y mantén todo bajo control.
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
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
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
          <h2 className="text-foreground">Panel de Control</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminActions.map((action, index) => (
            <Card 
              key={index}
              onClick={() => setCurrentSection(action.section)}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
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

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-foreground mb-4">Actividad Reciente</h2>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Nueva solicitud de mantenimiento - Torre A-502</p>
                  <p className="text-sm text-muted-foreground">REP-001 • Hace 30 minutos</p>
                </div>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">Pendiente</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Nueva reserva: Salón de Eventos</p>
                  <p className="text-sm text-muted-foreground">RES-001 • Hace 1 hora</p>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">Nueva</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Nuevo usuario registrado: María González</p>
                  <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                </div>
                <Badge variant="default" className="bg-green-500/20 text-green-400">Completado</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-pink-400" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Registro de visitante - Torre C-105</p>
                  <p className="text-sm text-muted-foreground">VIS-001 • Hace 3 horas</p>
                </div>
                <Badge variant="outline">Procesado</Badge>
              </div>
            </div>
          </div>
        </Card>
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
              {currentSection !== 'home' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentSection('home')}
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
                <p className="text-xs text-muted-foreground">Panel de Administración</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Badge className="hidden sm:flex bg-gradient-to-r from-primary to-accent border-none">
                <Crown className="w-3 h-3 mr-1" />
                Admin
              </Badge>
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