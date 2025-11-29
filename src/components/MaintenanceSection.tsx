import { Wrench, Plus, AlertTriangle, CheckCircle2, Clock, XCircle, Smile } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { useState } from 'react';

export default function MaintenanceSection() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');

  const requests = [
    {
      id: 1,
      reportNumber: 'REP-001',
      title: 'Fuga de agua en baño principal',
      category: 'Plomería',
      priority: 'high',
      status: 'in_progress',
      date: '03 Nov 2025',
      description: 'Se detectó una fuga de agua debajo del lavabo del baño principal',
      assignedTo: 'Juan Pérez - Plomero',
      estimatedDate: '06 Nov 2025'
    },
    {
      id: 2,
      reportNumber: 'REP-002',
      title: 'Luz del pasillo no funciona',
      category: 'Eléctrico',
      priority: 'medium',
      status: 'pending',
      date: '01 Nov 2025',
      description: 'Las luces del pasillo del piso 5 no encienden',
      assignedTo: 'Sin asignar',
      estimatedDate: 'Por definir'
    },
    {
      id: 3,
      reportNumber: 'REP-003',
      title: 'Puerta del balcón se atasca',
      category: 'Carpintería',
      priority: 'low',
      status: 'pending',
      date: '28 Oct 2025',
      description: 'La puerta corredera del balcón se atasca al abrirse',
      assignedTo: 'Sin asignar',
      estimatedDate: 'Por definir'
    },
    {
      id: 4,
      reportNumber: 'REP-004',
      title: 'Aire acondicionado hace ruido',
      category: 'HVAC',
      priority: 'medium',
      status: 'completed',
      date: '25 Oct 2025',
      description: 'El aire acondicionado de la sala hace un ruido extraño',
      assignedTo: 'Carlos Ruiz - Técnico HVAC',
      estimatedDate: '27 Oct 2025',
      completedDate: '26 Oct 2025'
    }
  ];

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    total: requests.length
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pendiente</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30">En Proceso</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Completado</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">Alta</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">Media</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500/50 text-green-400">Baja</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-amber-400" />;
      case 'in_progress':
        return <Wrench className="w-6 h-6 text-blue-400" />;
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-primary" />;
    }
  };

  const generateReportNumber = () => {
    // Generate next report number based on existing requests
    const nextNumber = String(requests.length + 1).padStart(3, '0');
    return `REP-${nextNumber}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReportNumber = generateReportNumber();
    setReportNumber(newReportNumber);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Mantenimiento y Reportes</h1>
          <p className="text-muted-foreground">Reporta incidencias y da seguimiento a tus solicitudes</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-5 h-5" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-foreground">{stats.total}</p>
              </div>
              <Wrench className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pendientes</p>
                <p className="text-foreground">{stats.pending}</p>
              </div>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">En Proceso</p>
                <p className="text-foreground">{stats.inProgress}</p>
              </div>
              <Wrench className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completados</p>
                <p className="text-foreground">{stats.completed}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* New Request Form */}
      {showForm && (
        <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
          <div className="p-6">
            {!submitted ? (
              <>
                <h2 className="text-foreground mb-4">Nueva Solicitud de Mantenimiento</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select>
                        <SelectTrigger id="category" className="bg-input-background border-border">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plumbing">Plomería</SelectItem>
                          <SelectItem value="electrical">Eléctrico</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
                          <SelectItem value="carpentry">Carpintería</SelectItem>
                          <SelectItem value="painting">Pintura</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select>
                        <SelectTrigger id="priority" className="bg-input-background border-border">
                          <SelectValue placeholder="Selecciona prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baja</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del Problema</Label>
                    <Textarea 
                      id="description"
                      placeholder="Describe detalladamente el problema..."
                      className="bg-input-background border-border min-h-[120px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary">
                      Enviar Solicitud
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
                    <Smile className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <h2 className="text-foreground mb-2">¡Recibido!</h2>
                <div className="mb-4">
                  <Badge variant="outline" className="border-primary/50 text-primary text-lg px-4 py-2">
                    {reportNumber}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  Tu solicitud ha sido registrada con el número <span className="text-primary">{reportNumber}</span>.
                  <br />
                  Pronto nos contactaremos contigo.
                </p>
                <Button 
                  onClick={() => { setShowForm(false); setSubmitted(false); setReportNumber(''); }}
                  className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
                >
                  Cerrar
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Active Requests */}
      <div>
        <h2 className="text-foreground mb-4">Solicitudes Activas</h2>
        
        <div className="space-y-4">
          {requests.filter(r => r.status !== 'completed').map((request) => (
            <Card 
              key={request.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    request.status === 'in_progress' 
                      ? 'bg-blue-500/20 border border-blue-500/30'
                      : 'bg-amber-500/20 border border-amber-500/30'
                  }`}>
                    {getStatusIcon(request.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-foreground mb-2">{request.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            {request.reportNumber}
                          </Badge>
                          <Badge variant="outline" className="border-primary/50">
                            {request.category}
                          </Badge>
                          {getPriorityBadge(request.priority)}
                          {getStatusBadge(request.status)}
                          <span className="text-sm text-muted-foreground">{request.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {request.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Asignado a:</span>
                        <span className="text-foreground">{request.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Fecha estimada:</span>
                        <span className="text-foreground">{request.estimatedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Requests */}
      <div>
        <h2 className="text-foreground mb-4">Solicitudes Completadas</h2>
        
        <div className="space-y-4">
          {requests.filter(r => r.status === 'completed').map((request) => (
            <Card 
              key={request.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    {getStatusIcon(request.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-foreground mb-2">{request.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {request.category}
                          </Badge>
                          {getStatusBadge(request.status)}
                          <span className="text-sm text-muted-foreground">Completado: {request.completedDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {request.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Atendido por:</span>
                      <span className="text-foreground">{request.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-card/50 backdrop-blur-sm border-red-500/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-foreground">Contacto de Emergencia</h2>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Para emergencias que requieran atención inmediata (fugas graves, fallas eléctricas peligrosas, etc.), 
            contacta directamente al equipo de mantenimiento:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Teléfono de Emergencia</p>
              <p className="text-primary">+1 (555) 123-4567</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Disponible</p>
              <p className="text-foreground">24/7 - Todo el año</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}