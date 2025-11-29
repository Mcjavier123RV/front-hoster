import { Home, Users, DollarSign, FileText, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export default function MyUnitSection() {
  const unitInfo = {
    number: 'A-502',
    tower: 'Torre A',
    floor: '5',
    type: 'Apartamento',
    area: '120 m²',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    storage: 1,
    owner: 'Juan Carlos Rodríguez',
    occupancy: 'Propietario',
    moveInDate: '15 Enero 2020',
    contractExpiry: 'N/A'
  };

  const financialSummary = {
    monthlyFee: '$450.00',
    lastPayment: '$450.00',
    lastPaymentDate: '05 Nov 2025',
    yearlyTotal: '$5,400.00',
    balance: '$0.00',
    nextDueDate: '05 Dic 2025'
  };

  const documents = [
    { name: 'Escritura de Propiedad', type: 'PDF', date: '15 Ene 2020', size: '2.4 MB' },
    { name: 'Reglamento Interno 2025', type: 'PDF', date: '01 Ene 2025', size: '1.8 MB' },
    { name: 'Póliza de Seguro', type: 'PDF', date: '01 Jun 2025', size: '890 KB' },
    { name: 'Estados de Cuenta 2025', type: 'ZIP', date: '01 Nov 2025', size: '3.2 MB' }
  ];

  const amenities = [
    { name: 'Piscina', status: 'available', hours: '6:00 AM - 10:00 PM' },
    { name: 'Gimnasio', status: 'available', hours: '5:00 AM - 11:00 PM' },
    { name: 'Salón de Eventos', status: 'reserved', hours: 'Previa reserva' },
    { name: 'Área de Juegos', status: 'available', hours: '24/7' },
    { name: 'Cancha Deportiva', status: 'available', hours: '6:00 AM - 10:00 PM' },
    { name: 'BBQ/Terraza', status: 'maintenance', hours: 'En mantenimiento' }
  ];

  const residents = [
    { name: 'Juan Carlos Rodríguez', relation: 'Propietario', age: '42' },
    { name: 'María Elena Rodríguez', relation: 'Cónyuge', age: '40' },
    { name: 'Carlos Rodríguez Jr.', relation: 'Hijo', age: '15' },
    { name: 'Sofía Rodríguez', relation: 'Hija', age: '12' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'reserved':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maintenance':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'reserved':
        return 'Reservado';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Mi Unidad</h1>
        <p className="text-muted-foreground">Información completa de tu propiedad</p>
      </div>

      {/* Unit Overview Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Home className="w-8 h-8 text-background" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-foreground mb-1">Unidad {unitInfo.number}</h2>
                  <p className="text-muted-foreground">{unitInfo.tower} - Piso {unitInfo.floor}</p>
                </div>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Al día
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Área Total</p>
                  <p className="text-foreground">{unitInfo.area}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Habitaciones</p>
                  <p className="text-foreground">{unitInfo.bedrooms} hab / {unitInfo.bathrooms} baños</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estacionamientos</p>
                  <p className="text-foreground">{unitInfo.parking} espacios</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Depósito</p>
                  <p className="text-foreground">{unitInfo.storage} unidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Property & Financial Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Details */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-foreground">Detalles de Propiedad</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Propietario</span>
                <span className="text-foreground">{unitInfo.owner}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Tipo de Ocupación</span>
                <Badge variant="outline" className="border-primary/50">{unitInfo.occupancy}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Fecha de Ingreso</span>
                <span className="text-foreground">{unitInfo.moveInDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Tipo de Unidad</span>
                <span className="text-foreground">{unitInfo.type}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Financial Summary */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h2 className="text-foreground">Resumen Financiero</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Cuota Mensual</span>
                <span className="text-foreground">{financialSummary.monthlyFee}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Último Pago</span>
                <span className="text-foreground">{financialSummary.lastPayment}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Fecha Último Pago</span>
                <span className="text-foreground">{financialSummary.lastPaymentDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Balance</span>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  {financialSummary.balance}
                </Badge>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Año 2025</span>
                <span className="text-primary">{financialSummary.yearlyTotal}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Residents */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-foreground">Residentes Registrados</h2>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              Agregar Residente
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residents.map((resident, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate">{resident.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{resident.relation}</p>
                    <span className="text-sm text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{resident.age} años</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Amenities Status */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Estado de Amenidades</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-foreground">{amenity.name}</h3>
                  <Badge variant="secondary" className={getStatusColor(amenity.status)}>
                    {getStatusLabel(amenity.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{amenity.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Documents */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Documentos de la Unidad</h2>
          </div>
          
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors">{doc.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Descargar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Payment Progress */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Progreso de Pagos 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">11 de 12 cuotas pagadas</span>
              <span className="text-primary">92%</span>
            </div>
            <Progress value={92} className="h-3" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Próximo pago: {financialSummary.nextDueDate}</span>
              <span className="text-primary">{financialSummary.monthlyFee}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
