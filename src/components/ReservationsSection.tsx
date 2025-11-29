import { Calendar, MapPin, Clock, Users, CheckCircle2, XCircle, AlertCircle, Smile } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

export default function ReservationsSection() {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);

  const areas = [
    {
      id: 1,
      name: 'Salón de Eventos',
      description: 'Perfecto para celebraciones y reuniones',
      capacity: 80,
      price: '$150.00',
      available: true,
      image: 'https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbnQlMjBoYWxsfGVufDF8fHx8MTc2MjMyMDA0NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      name: 'Área de Piscina',
      description: 'Ideal para fiestas al aire libre',
      capacity: 50,
      price: '$100.00',
      available: true,
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800'
    },
    {
      id: 3,
      name: 'Cancha Deportiva',
      description: 'Fútbol, basketball y voleibol',
      capacity: 20,
      price: '$50.00',
      available: true,
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800'
    },
    {
      id: 4,
      name: 'Terraza BBQ',
      description: 'Parrillas y área de picnic',
      capacity: 30,
      price: '$80.00',
      available: false,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800'
    },
    {
      id: 5,
      name: 'Sala de Juegos',
      description: 'Pool, ping pong y juegos de mesa',
      capacity: 15,
      price: '$40.00',
      available: true,
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800'
    },
    {
      id: 6,
      name: 'Sala de Reuniones',
      description: 'Espacio profesional para juntas',
      capacity: 12,
      price: '$60.00',
      available: true,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    }
  ];

  const myReservations = [
    {
      id: 1,
      area: 'Salón de Eventos',
      date: '15 Nov 2025',
      time: '6:00 PM - 11:00 PM',
      status: 'confirmed',
      guests: 45,
      price: '$150.00'
    },
    {
      id: 2,
      area: 'Área de Piscina',
      date: '22 Nov 2025',
      time: '2:00 PM - 8:00 PM',
      status: 'confirmed',
      guests: 30,
      price: '$100.00'
    },
    {
      id: 3,
      area: 'Cancha Deportiva',
      date: '02 Nov 2025',
      time: '4:00 PM - 6:00 PM',
      status: 'completed',
      guests: 12,
      price: '$50.00'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Confirmada</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-blue-500/50 text-blue-400">Completada</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">Cancelada</Badge>;
      default:
        return <Badge variant="outline">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Reservas de Áreas Comunes</h1>
        <p className="text-muted-foreground">Reserva espacios para tus eventos y actividades</p>
      </div>

      {/* Reservation Form Modal */}
      {showReservationForm && selectedArea && (
        <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
          <div className="p-6">
            {!reservationSubmitted ? (
              <>
                <h2 className="text-foreground mb-4">Reservar {selectedArea.name}</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); setReservationSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resDate">Fecha del Evento</Label>
                      <Input 
                        id="resDate"
                        type="date"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resTime">Hora de Inicio</Label>
                      <Input 
                        id="resTime"
                        type="time"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resGuests">Número de Invitados</Label>
                      <Input 
                        id="resGuests"
                        type="number"
                        placeholder={`Máx: ${selectedArea.capacity}`}
                        max={selectedArea.capacity}
                        className="bg-input-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resPhone">Teléfono de Contacto</Label>
                      <Input 
                        id="resPhone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-input-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resNotes">Detalles del Evento (Opcional)</Label>
                    <Textarea 
                      id="resNotes"
                      placeholder="Describe el tipo de evento, requerimientos especiales, etc..."
                      className="bg-input-background border-border min-h-[100px]"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Costo de Reserva:</span>
                      <span className="text-primary">{selectedArea.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary">
                      Confirmar Reserva
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { setShowReservationForm(false); setReservationSubmitted(false); }}
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
                <p className="text-muted-foreground mb-6">Pronto nos contactaremos contigo</p>
                <Button 
                  onClick={() => { setShowReservationForm(false); setReservationSubmitted(false); }}
                  className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
                >
                  Cerrar
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Áreas Disponibles</p>
                <p className="text-foreground">{areas.filter(a => a.available).length}</p>
              </div>
              <MapPin className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mis Reservas</p>
                <p className="text-foreground">{myReservations.filter(r => r.status === 'confirmed').length}</p>
              </div>
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Próxima Reserva</p>
                <p className="text-foreground">15 Nov</p>
              </div>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Gastado</p>
                <p className="text-foreground">$300.00</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* My Reservations */}
      <div>
        <h2 className="text-foreground mb-4">Mis Reservas</h2>
        
        <div className="space-y-4">
          {myReservations.map((reservation) => (
            <Card 
              key={reservation.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-foreground mb-1">{reservation.area}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {reservation.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {reservation.time}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {reservation.guests} personas
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-foreground mb-1">{reservation.price}</p>
                      {getStatusBadge(reservation.status)}
                    </div>
                    {reservation.status === 'confirmed' && (
                      <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Areas */}
      <div>
        <h2 className="text-foreground mb-4">Áreas Disponibles para Reservar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Card 
              key={area.id}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <ImageWithFallback 
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!area.available && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                      No Disponible
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-foreground mb-2">{area.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Hasta {area.capacity} personas</span>
                  </div>
                  <span className="text-primary">{area.price}</span>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
                  disabled={!area.available}
                  onClick={() => {
                    if (area.available) {
                      setSelectedArea(area);
                      setShowReservationForm(true);
                      setReservationSubmitted(false);
                    }
                  }}
                >
                  {area.available ? 'Reservar Ahora' : 'No Disponible'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reservation Rules */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Políticas de Reserva</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">Las reservas deben hacerse con mínimo 48 horas de anticipación</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">El pago debe realizarse al momento de la reserva</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">Se permite un máximo de 2 reservas activas por unidad</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">Cancelaciones con menos de 24 horas no tienen reembolso</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">No se permite el uso de las áreas fuera del horario reservado</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">Las áreas deben dejarse limpias y en orden</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
