import { Users, UserPlus, Clock, CheckCircle2, XCircle, Calendar, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

export default function VisitorsSection() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visitors = [
    {
      id: 1,
      name: 'María González',
      document: 'ID: 12345678',
      visitDate: '05 Nov 2025',
      visitTime: '6:00 PM',
      status: 'active',
      type: 'guest',
      vehicle: 'ABC-123',
      authorized: '05 Nov 2025, 5:45 PM'
    },
    {
      id: 2,
      name: 'Roberto Sánchez',
      document: 'ID: 87654321',
      visitDate: '06 Nov 2025',
      visitTime: '3:00 PM',
      status: 'scheduled',
      type: 'delivery',
      vehicle: 'N/A',
      authorized: '04 Nov 2025, 2:30 PM'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      document: 'ID: 45678912',
      visitDate: '03 Nov 2025',
      visitTime: '4:30 PM',
      status: 'completed',
      type: 'guest',
      vehicle: 'XYZ-789',
      authorized: '03 Nov 2025, 4:15 PM',
      exitTime: '03 Nov 2025, 8:45 PM'
    },
    {
      id: 4,
      name: 'Servicio de Limpieza',
      document: 'ID: 98765432',
      visitDate: '02 Nov 2025',
      visitTime: '9:00 AM',
      status: 'completed',
      type: 'service',
      vehicle: 'N/A',
      authorized: '02 Nov 2025, 8:50 AM',
      exitTime: '02 Nov 2025, 1:00 PM'
    }
  ];

  const frequentVisitors = [
    { name: 'Carlos Rodríguez', relation: 'Familiar', visits: 15 },
    { name: 'Servicio de Limpieza Pro', relation: 'Servicio', visits: 12 },
    { name: 'Laura Pérez', relation: 'Amiga', visits: 8 }
  ];

  const stats = {
    active: visitors.filter(v => v.status === 'active').length,
    scheduled: visitors.filter(v => v.status === 'scheduled').length,
    today: 3,
    thisMonth: 24
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Activo</Badge>;
      case 'scheduled':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">Programado</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-muted-foreground/50 text-muted-foreground">Completado</Badge>;
      case 'denied':
        return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">Denegado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guest':
        return <Users className="w-6 h-6 text-primary" />;
      case 'delivery':
        return <Clock className="w-6 h-6 text-blue-400" />;
      case 'service':
        return <Shield className="w-6 h-6 text-purple-400" />;
      default:
        return <Users className="w-6 h-6 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'guest':
        return 'Invitado';
      case 'delivery':
        return 'Delivery';
      case 'service':
        return 'Servicio';
      default:
        return 'Otro';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Control de Visitantes</h1>
          <p className="text-muted-foreground">Registra y administra el acceso de tus visitantes</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <UserPlus className="w-5 h-5" />
          Registrar Visitante
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Visitantes Activos</p>
                <p className="text-foreground">{stats.active}</p>
              </div>
              <Users className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Programados</p>
                <p className="text-foreground">{stats.scheduled}</p>
              </div>
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hoy</p>
                <p className="text-foreground">{stats.today}</p>
              </div>
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Este Mes</p>
                <p className="text-foreground">{stats.thisMonth}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Registration Form */}
      {showForm && (
        <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
          <div className="p-6">
            {!submitted ? (
              <>
                <h2 className="text-foreground mb-4">Registrar Nuevo Visitante</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visitorName">Nombre Completo</Label>
                      <Input 
                        id="visitorName"
                        placeholder="Ej: Juan Pérez"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document">Documento de Identidad</Label>
                      <Input 
                        id="document"
                        placeholder="Ej: 12345678"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitType">Tipo de Visita</Label>
                      <Select>
                        <SelectTrigger id="visitType" className="bg-input-background border-border">
                          <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guest">Invitado Personal</SelectItem>
                          <SelectItem value="delivery">Delivery/Paquetería</SelectItem>
                          <SelectItem value="service">Servicio/Proveedor</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitDate">Fecha de Visita</Label>
                      <Input 
                        id="visitDate"
                        type="date"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitTime">Hora Estimada</Label>
                      <Input 
                        id="visitTime"
                        type="time"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Placa de Vehículo (Opcional)</Label>
                      <Input 
                        id="vehicle"
                        placeholder="Ej: ABC-123"
                        className="bg-input-background border-border"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary">
                      Autorizar Visitante
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { setShowForm(false); setSubmitted(false); }}
                      className="border-border hover:bg-muted"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <h2 className="text-foreground mb-2">¡Recibido!</h2>
                <Button 
                  onClick={() => { setShowForm(false); setSubmitted(false); }}
                  className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary mt-6"
                >
                  Cerrar
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Active & Scheduled Visitors */}
      <div>
        <h2 className="text-foreground mb-4">Visitantes Activos y Programados</h2>
        
        <div className="space-y-4">
          {visitors.filter(v => v.status === 'active' || v.status === 'scheduled').map((visitor) => (
            <Card 
              key={visitor.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    visitor.status === 'active'
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    {getTypeIcon(visitor.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-foreground mb-2">{visitor.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {getTypeLabel(visitor.type)}
                          </Badge>
                          {getStatusBadge(visitor.status)}
                          <span className="text-sm text-muted-foreground">{visitor.document}</span>
                        </div>
                      </div>
                      {visitor.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          Registrar Salida
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Visita:</span>
                        <span className="text-foreground">{visitor.visitDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Hora:</span>
                        <span className="text-foreground">{visitor.visitTime}</span>
                      </div>
                      {visitor.vehicle !== 'N/A' && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Vehículo:</span>
                          <span className="text-foreground">{visitor.vehicle}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Visitor History */}
      <div>
        <h2 className="text-foreground mb-4">Historial de Visitantes</h2>
        
        <div className="space-y-4">
          {visitors.filter(v => v.status === 'completed').map((visitor) => (
            <Card 
              key={visitor.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(visitor.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-foreground mb-2">{visitor.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {getTypeLabel(visitor.type)}
                          </Badge>
                          {getStatusBadge(visitor.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-muted-foreground">Entrada:</span>
                        <span className="text-foreground">{visitor.authorized}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-muted-foreground">Salida:</span>
                        <span className="text-foreground">{visitor.exitTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Frequent Visitors */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <div className="p-6">
          <h2 className="text-foreground mb-4">Visitantes Frecuentes</h2>
          
          <div className="space-y-3">
            {frequentVisitors.map((visitor, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground">{visitor.name}</p>
                    <p className="text-sm text-muted-foreground">{visitor.relation}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-primary/50">
                  {visitor.visits} visitas
                </Badge>
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4 border-primary/50 hover:bg-primary/10"
          >
            Ver Todos los Visitantes Frecuentes
          </Button>
        </div>
      </Card>

      {/* Security Info */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Información de Seguridad</h2>
          </div>
          
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• Todos los visitantes deben registrarse en la entrada con identificación oficial</p>
            <p>• Los residentes son responsables del comportamiento de sus visitantes</p>
            <p>• Las visitas nocturnas (después de las 10 PM) requieren autorización especial</p>
            <p>• Los vehículos de visitantes deben usar espacios designados</p>
            <p>• Por seguridad, se mantiene registro fotográfico de todos los visitantes</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
