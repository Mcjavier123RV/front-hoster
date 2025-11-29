import { Bell, Calendar, Wrench, Users, CheckCircle2, Clock, Eye, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState([
    {
      id: 'REP-001',
      type: 'maintenance',
      title: 'Solicitud de Mantenimiento',
      description: 'Fuga de agua en baño principal - Torre A-502',
      user: 'Juan Pérez',
      unit: 'Torre A-502',
      date: '18 Nov 2025, 10:30 AM',
      priority: 'high',
      status: 'unread',
      details: {
        category: 'Plomería',
        description: 'Se detectó una fuga de agua debajo del lavabo del baño principal'
      }
    },
    {
      id: 'RES-001',
      type: 'reservation',
      title: 'Nueva Reserva',
      description: 'Salón de Eventos - 25 Nov 2025',
      user: 'María González',
      unit: 'Torre B-301',
      date: '18 Nov 2025, 09:15 AM',
      priority: 'medium',
      status: 'unread',
      details: {
        area: 'Salón de Eventos',
        reservationDate: '25 Nov 2025',
        time: '18:00 - 22:00',
        guests: '50 personas'
      }
    },
    {
      id: 'VIS-001',
      type: 'visitor',
      title: 'Registro de Visitante',
      description: 'Carlos Ruiz - Entrada programada',
      user: 'Pedro Martínez',
      unit: 'Torre C-105',
      date: '18 Nov 2025, 08:45 AM',
      priority: 'low',
      status: 'read',
      details: {
        visitorName: 'Carlos Ruiz',
        visitDate: '20 Nov 2025',
        time: '15:00',
        purpose: 'Visita familiar'
      }
    },
    {
      id: 'REP-002',
      type: 'maintenance',
      title: 'Solicitud de Mantenimiento',
      description: 'Luz del pasillo no funciona - Torre A-502',
      user: 'Ana López',
      unit: 'Torre A-502',
      date: '17 Nov 2025, 16:20 PM',
      priority: 'medium',
      status: 'read',
      details: {
        category: 'Eléctrico',
        description: 'Las luces del pasillo del piso 5 no encienden desde ayer'
      }
    },
    {
      id: 'RES-002',
      type: 'reservation',
      title: 'Nueva Reserva',
      description: 'Gimnasio - 22 Nov 2025',
      user: 'Roberto Silva',
      unit: 'Torre B-405',
      date: '17 Nov 2025, 14:30 PM',
      priority: 'low',
      status: 'read',
      details: {
        area: 'Gimnasio',
        reservationDate: '22 Nov 2025',
        time: '06:00 - 07:00',
        guests: '1 persona'
      }
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Wrench className="w-5 h-5" />;
      case 'reservation':
        return <Calendar className="w-5 h-5" />;
      case 'visitor':
        return <Users className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">Mantenimiento</Badge>;
      case 'reservation':
        return <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">Reserva</Badge>;
      case 'visitor':
        return <Badge variant="secondary" className="bg-pink-500/20 text-pink-400 border-pink-500/30">Visitante</Badge>;
      default:
        return <Badge variant="outline">General</Badge>;
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

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => 
        notif.id === id ? { ...notif, status: 'read' } : notif
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const maintenanceCount = notifications.filter(n => n.type === 'maintenance').length;
  const reservationCount = notifications.filter(n => n.type === 'reservation').length;
  const visitorCount = notifications.filter(n => n.type === 'visitor').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Notificaciones y Solicitudes</h1>
        <p className="text-muted-foreground">Gestiona todas las solicitudes de los inquilinos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Sin leer</p>
                <p className="text-foreground">{unreadCount}</p>
              </div>
              <Bell className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mantenimiento</p>
                <p className="text-foreground">{maintenanceCount}</p>
              </div>
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reservas</p>
                <p className="text-foreground">{reservationCount}</p>
              </div>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Visitantes</p>
                <p className="text-foreground">{visitorCount}</p>
              </div>
              <Users className="w-5 h-5 text-pink-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-card/50 border border-border">
          <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Sin leer ({unreadCount})</TabsTrigger>
          <TabsTrigger value="maintenance">Mantenimiento ({maintenanceCount})</TabsTrigger>
          <TabsTrigger value="reservations">Reservas ({reservationCount})</TabsTrigger>
          <TabsTrigger value="visitors">Visitantes ({visitorCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {notifications.map((notif) => (
            <Card 
              key={notif.id}
              className={`bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors ${
                notif.status === 'unread' ? 'border-primary/50' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'maintenance' ? 'bg-amber-500/20 border border-amber-500/30' :
                    notif.type === 'reservation' ? 'bg-purple-500/20 border border-purple-500/30' :
                    'bg-pink-500/20 border border-pink-500/30'
                  }`}>
                    {getTypeIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-foreground">{notif.title}</h3>
                          {notif.status === 'unread' && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{notif.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {notif.id}
                          </Badge>
                          {getTypeBadge(notif.type)}
                          {getPriorityBadge(notif.priority)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                      <div>
                        <span className="text-muted-foreground">Inquilino:</span>{' '}
                        <span className="text-foreground">{notif.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unidad:</span>{' '}
                        <span className="text-foreground">{notif.unit}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Fecha:</span>{' '}
                        <span className="text-foreground">{notif.date}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Detalles:</p>
                      {Object.entries(notif.details).map(([key, value]) => (
                        <div key={key} className="text-sm mb-1">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>{' '}
                          <span className="text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {notif.status === 'unread' && (
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Marcar como leída
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(notif.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 mt-6">
          {notifications.filter(n => n.status === 'unread').map((notif) => (
            <Card 
              key={notif.id}
              className="bg-card/50 backdrop-blur-sm border-primary/50 hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'maintenance' ? 'bg-amber-500/20 border border-amber-500/30' :
                    notif.type === 'reservation' ? 'bg-purple-500/20 border border-purple-500/30' :
                    'bg-pink-500/20 border border-pink-500/30'
                  }`}>
                    {getTypeIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-foreground">{notif.title}</h3>
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <p className="text-muted-foreground mb-2">{notif.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {notif.id}
                          </Badge>
                          {getTypeBadge(notif.type)}
                          {getPriorityBadge(notif.priority)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                      <div>
                        <span className="text-muted-foreground">Inquilino:</span>{' '}
                        <span className="text-foreground">{notif.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unidad:</span>{' '}
                        <span className="text-foreground">{notif.unit}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Fecha:</span>{' '}
                        <span className="text-foreground">{notif.date}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="border-primary/50 text-primary hover:bg-primary/10"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Marcar como leída
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(notif.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4 mt-6">
          {notifications.filter(n => n.type === 'maintenance').map((notif) => (
            <Card 
              key={notif.id}
              className={`bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors ${
                notif.status === 'unread' ? 'border-primary/50' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-foreground">{notif.title}</h3>
                          {notif.status === 'unread' && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{notif.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {notif.id}
                          </Badge>
                          {getTypeBadge(notif.type)}
                          {getPriorityBadge(notif.priority)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                      <div>
                        <span className="text-muted-foreground">Inquilino:</span>{' '}
                        <span className="text-foreground">{notif.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unidad:</span>{' '}
                        <span className="text-foreground">{notif.unit}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Fecha:</span>{' '}
                        <span className="text-foreground">{notif.date}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Detalles:</p>
                      {Object.entries(notif.details).map(([key, value]) => (
                        <div key={key} className="text-sm mb-1">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>{' '}
                          <span className="text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {notif.status === 'unread' && (
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Marcar como leída
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(notif.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reservations" className="space-y-4 mt-6">
          {notifications.filter(n => n.type === 'reservation').map((notif) => (
            <Card 
              key={notif.id}
              className={`bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors ${
                notif.status === 'unread' ? 'border-primary/50' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-foreground">{notif.title}</h3>
                          {notif.status === 'unread' && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{notif.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {notif.id}
                          </Badge>
                          {getTypeBadge(notif.type)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                      <div>
                        <span className="text-muted-foreground">Inquilino:</span>{' '}
                        <span className="text-foreground">{notif.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unidad:</span>{' '}
                        <span className="text-foreground">{notif.unit}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Fecha:</span>{' '}
                        <span className="text-foreground">{notif.date}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Detalles:</p>
                      {Object.entries(notif.details).map(([key, value]) => (
                        <div key={key} className="text-sm mb-1">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>{' '}
                          <span className="text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {notif.status === 'unread' && (
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Marcar como leída
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(notif.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="visitors" className="space-y-4 mt-6">
          {notifications.filter(n => n.type === 'visitor').map((notif) => (
            <Card 
              key={notif.id}
              className={`bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors ${
                notif.status === 'unread' ? 'border-primary/50' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-foreground">{notif.title}</h3>
                          {notif.status === 'unread' && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{notif.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="border-primary/50">
                            {notif.id}
                          </Badge>
                          {getTypeBadge(notif.type)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                      <div>
                        <span className="text-muted-foreground">Inquilino:</span>{' '}
                        <span className="text-foreground">{notif.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unidad:</span>{' '}
                        <span className="text-foreground">{notif.unit}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Fecha:</span>{' '}
                        <span className="text-foreground">{notif.date}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Detalles:</p>
                      {Object.entries(notif.details).map(([key, value]) => (
                        <div key={key} className="text-sm mb-1">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>{' '}
                          <span className="text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {notif.status === 'unread' && (
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Marcar como leída
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(notif.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
