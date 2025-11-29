import { Bell, Pin, Calendar, AlertCircle, Info, Megaphone, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState, useEffect } from 'react';

// Interface que coincide con tu backend - ACTUALIZADA
interface BackendNotification {
  Id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

// Interface local para funcionalidades visuales
interface Notification extends BackendNotification {
  // Campos visuales que NO se guardan en BD
  priority: 'high' | 'normal';
  pinned: boolean;
  color: string;
  icon: any;
  category: string;
  isPublished: boolean;
  author: string;
}

type FilterType = 'all' | 'pinned' | 'priority' | 'week' | 'my-notifications';

interface NotificationsSectionProps {
  userEmail?: string | null;
  userName?: string;
  userId?: string;
  userToken?: string;
}

export default function NotificationsSection({ 
  userEmail, 
  userName = 'Administración',
  userId = '6929ef678e3fc5c451c0978b', // ID por defecto como en tu ejemplo
  userToken = localStorage.getItem('authToken') || ''
}: NotificationsSectionProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para mapear categoría a type del backend
  const categoryToType = (category: string): string => {
    const typeMap: Record<string, string> = {
      'Mantenimiento': 'MAINTENANCE',
      'Importante': 'IMPORTANT',
      'Servicios': 'SERVICE',
      'Seguridad': 'SECURITY',
      'Eventos': 'EVENT',
      'Social': 'SOCIAL',
      'Otros': 'OTHER',
      'Pagos': 'Payment' // Nuevo tipo para pagos
    };
    return typeMap[category] || 'OTHER';
  };

  // Función para type a categoría visual
  const typeToCategory = (type: string): string => {
    const categoryMap: Record<string, string> = {
      'MAINTENANCE': 'Mantenimiento',
      'IMPORTANT': 'Importante',
      'SERVICE': 'Servicios',
      'SECURITY': 'Seguridad',
      'EVENT': 'Eventos',
      'SOCIAL': 'Social',
      'OTHER': 'Otros',
      'Payment': 'Pagos' // Nuevo tipo para pagos
    };
    return categoryMap[type] || 'Otros';
  };

  // Datos iniciales - ACTUALIZADOS con la estructura correcta
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      Id: '1',
      userId: '6929ef678e3fc5c451c0978b',
      title: 'Pago recibido',
      message: 'Tu pago del mes fue procesado correctamente.',
      type: 'Payment',
      isRead: false,
      createdAt: '2025-11-05T00:00:00.000Z',
      priority: 'high',
      pinned: true,
      color: 'green',
      icon: AlertCircle,
      category: 'Pagos',
      isPublished: true,
      author: 'Sistema'
    },
    {
      Id: '2',
      userId: '6929ef678e3fc5c451c0978b',
      title: 'Asamblea General de Propietarios',
      message: 'Se convoca a todos los propietarios a la Asamblea General Ordinaria que se llevará a cabo el día 20 de noviembre.',
      type: 'IMPORTANT',
      isRead: false,
      createdAt: '2025-11-03T00:00:00.000Z',
      priority: 'high',
      pinned: true,
      color: 'red',
      icon: Megaphone,
      category: 'Importante',
      isPublished: true,
      author: 'Junta Directiva'
    },
    {
      Id: '3',
      userId: '6929ef678e3fc5c451c0978b',
      title: 'Mantenimiento Programado',
      message: 'El próximo lunes se realizará mantenimiento en las áreas comunes.',
      type: 'MAINTENANCE',
      isRead: false,
      createdAt: '2025-11-01T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      color: 'blue',
      icon: Info,
      category: 'Mantenimiento',
      isPublished: true,
      author: 'Administración'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Mantenimiento',
    priority: 'normal' as 'high' | 'normal',
    message: '',
    color: 'blue',
    isPublished: true
  });

  // Función para obtener notificaciones del backend - ACTUALIZADA
  const fetchNotificationsFromBackend = async (): Promise<BackendNotification[]> => {
    if (!userToken) {
      console.warn('No hay token de autenticación');
      return [];
    }

    try {
      const response = await fetch(`/api/Notification/by-user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener notificaciones');
      }
      
      const backendNotifications: BackendNotification[] = await response.json();
      
      // Convertir a formato local con datos visuales
      return backendNotifications.map(notif => ({
        ...notif,
        priority: 'normal',
        pinned: false,
        color: 'blue',
        icon: Info,
        category: typeToCategory(notif.type),
        isPublished: true,
        author: 'Sistema'
      }));
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      return [];
    }
  };

  // Función para crear notificación en el backend - ACTUALIZADA con estructura correcta
  const createNotificationInBackend = async (notificationData: any): Promise<BackendNotification> => {
    setIsLoading(true);
    
    // Estructura EXACTA que espera tu backend
    const backendData = {
      Id: "", // Vacío como en tu ejemplo
      userId: notificationData.userId,
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    if (!userToken) {
      console.warn('No hay token de autenticación, guardando localmente');
      // Simular respuesta si no hay token
      return {
        ...backendData,
        Id: Date.now().toString() // Generar ID local
      };
    }

    try {
      const response = await fetch('/api/Notification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      });
      
      if (!response.ok) {
        throw new Error(`Error al crear notificación: ${response.status}`);
      }
      
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      // En caso de error, simular respuesta
      return {
        ...backendData,
        Id: Date.now().toString()
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar notificación en el backend - ACTUALIZADA
  const deleteNotificationInBackend = async (id: string) => {
    if (!userToken) {
      console.warn('No hay token de autenticación, eliminando localmente');
      return;
    }

    try {
      const response = await fetch(`/api/Notification/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  // Cargar notificaciones del backend al montar el componente - CORREGIDO con useEffect
  useEffect(() => {
    const loadNotifications = async () => {
      if (userToken) {
        const backendNotifications = await fetchNotificationsFromBackend();
        if (backendNotifications.length > 0) {
          setNotifications(backendNotifications as Notification[]);
        }
      }
    };
    loadNotifications();
  }, [userToken]);

  const togglePin = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.Id === id ? { ...notif, pinned: !notif.pinned } : notif)
    );
  };

  const togglePublish = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.Id === id ? { ...notif, isPublished: !notif.isPublished } : notif)
    );
  };

  const deleteNotification = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
      // Eliminar del backend
      await deleteNotificationInBackend(id);
      
      // Eliminar localmente
      setNotifications(prev => prev.filter(notif => notif.Id !== id));
    }
  };

  const editNotification = (notification: Notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      category: notification.category,
      priority: notification.priority,
      message: notification.message,
      color: notification.color,
      isPublished: notification.isPublished
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingNotification) {
        // TODO: Implementar actualización en backend si es necesario
        setNotifications(prev =>
          prev.map(notif =>
            notif.Id === editingNotification.Id
              ? {
                  ...notif,
                  title: formData.title,
                  category: formData.category,
                  priority: formData.priority,
                  message: formData.message,
                  color: formData.color,
                  isPublished: formData.isPublished,
                  icon: formData.priority === 'high' ? AlertCircle : Info,
                  type: categoryToType(formData.category)
                }
              : notif
          )
        );
      } else {
        // Crear nueva notificación
        const backendData = {
          userId: userId,
          title: formData.title,
          message: formData.message,
          type: categoryToType(formData.category)
        };

        // Guardar en backend
        const newBackendNotification = await createNotificationInBackend(backendData);

        // Crear objeto local con datos visuales
        const newNotification: Notification = {
          ...newBackendNotification,
          priority: formData.priority,
          pinned: false,
          color: formData.color,
          icon: formData.priority === 'high' ? AlertCircle : Info,
          category: formData.category,
          isPublished: formData.isPublished,
          author: userName
        };

        setNotifications([newNotification, ...notifications]);
      }
      
      setShowDialog(false);
      setEditingNotification(null);
      setFormData({
        title: '',
        category: 'Mantenimiento',
        priority: 'normal',
        message: '',
        color: 'blue',
        isPublished: true
      });
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la notificación. Revisa la consola para más detalles.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter logic
  const isWithinThisWeek = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return date >= weekAgo && date <= today;
    } catch (error) {
      return false;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'pinned': return notification.pinned;
      case 'priority': return notification.priority === 'high';
      case 'week': return isWithinThisWeek(notification.createdAt);
      case 'my-notifications': return notification.userId === userId;
      default: return true;
    }
  });

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      red: 'bg-red-500/10 border-red-500/30 text-red-400',
      blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
      purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      green: 'bg-green-500/10 border-green-500/30 text-green-400'
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (notification: Notification) => {
    if (!notification.isPublished) {
      return <Badge variant="secondary" className="bg-gray-500/20 text-gray-400 border-gray-500/30">Borrador</Badge>;
    }
    if (notification.priority === 'high') {
      return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">Importante</Badge>;
    }
    return null;
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header con info de autenticación */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Notificaciones y Comunicados</h1>
          <p className="text-gray-600">Crea y comparte notificaciones con la comunidad del condominio</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
              Modo Comunitario
            </Badge>
            {userToken && (
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10">
                Autenticado
              </Badge>
            )}
          </div>
        </div>
        
        {/* Botón Nueva Notificación */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2 text-white">
              <Plus className="w-5 h-5" />
              Nueva Notificación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingNotification ? 'Editar Notificación' : 'Crear Nueva Notificación'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">Título</Label>
                <Input
                  id="title"
                  placeholder="Ej: Pago recibido"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full"
                  required
                />
              </div>

              {/* Fila: Categoría y Prioridad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="Importante">Importante</SelectItem>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Seguridad">Seguridad</SelectItem>
                      <SelectItem value="Eventos">Eventos</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Pagos">Pagos</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Prioridad</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: 'high' | 'normal') => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fila: Color y Estado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-sm font-medium text-gray-700">Color de Etiqueta</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => setFormData({ ...formData, color: value })}
                  >
                    <SelectTrigger id="color">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Azul</SelectItem>
                      <SelectItem value="green">Verde</SelectItem>
                      <SelectItem value="amber">Ámbar</SelectItem>
                      <SelectItem value="red">Rojo</SelectItem>
                      <SelectItem value="purple">Púrpura</SelectItem>
                      <SelectItem value="orange">Naranja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">Estado</Label>
                  <Select
                    value={formData.isPublished ? "published" : "draft"}
                    onValueChange={(value) => setFormData({ ...formData, isPublished: value === "published" })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contenido */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe el mensaje de la notificación..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? 'Guardando...' : (editingNotification ? 'Actualizar Notificación' : 'Crear Notificación')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowDialog(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card 
          onClick={() => setFilter('all')}
          className={`bg-white/50 backdrop-blur-sm border cursor-pointer transition-all hover:scale-105 ${
            filter === 'all' ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-gray-900 font-semibold">{notifications.length}</p>
              </div>
              <Bell className={`w-5 h-5 ${filter === 'all' ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
          </div>
        </Card>

        <Card 
          onClick={() => setFilter('pinned')}
          className={`bg-white/50 backdrop-blur-sm border cursor-pointer transition-all hover:scale-105 ${
            filter === 'pinned' ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Fijados</p>
                <p className="text-gray-900 font-semibold">{notifications.filter(n => n.pinned).length}</p>
              </div>
              <Pin className={`w-5 h-5 ${filter === 'pinned' ? 'text-blue-600' : 'text-amber-500'}`} />
            </div>
          </div>
        </Card>

        <Card 
          onClick={() => setFilter('priority')}
          className={`bg-white/50 backdrop-blur-sm border cursor-pointer transition-all hover:scale-105 ${
            filter === 'priority' ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Prioritarios</p>
                <p className="text-gray-900 font-semibold">{notifications.filter(n => n.priority === 'high').length}</p>
              </div>
              <AlertCircle className={`w-5 h-5 ${filter === 'priority' ? 'text-blue-600' : 'text-red-500'}`} />
            </div>
          </div>
        </Card>

        <Card 
          onClick={() => setFilter('week')}
          className={`bg-white/50 backdrop-blur-sm border cursor-pointer transition-all hover:scale-105 ${
            filter === 'week' ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Esta semana</p>
                <p className="text-gray-900 font-semibold">{notifications.filter(n => isWithinThisWeek(n.createdAt)).length}</p>
              </div>
              <Calendar className={`w-5 h-5 ${filter === 'week' ? 'text-blue-600' : 'text-blue-500'}`} />
            </div>
          </div>
        </Card>

        <Card 
          onClick={() => setFilter('my-notifications')}
          className={`bg-white/50 backdrop-blur-sm border cursor-pointer transition-all hover:scale-105 ${
            filter === 'my-notifications' ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Mis notificaciones</p>
                <p className="text-gray-900 font-semibold">{notifications.filter(n => n.author === userName).length}</p>
              </div>
              <Eye className={`w-5 h-5 ${filter === 'my-notifications' ? 'text-blue-600' : 'text-green-500'}`} />
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications List */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {filter === 'pinned' && 'Notificaciones Fijadas'}
            {filter === 'priority' && 'Notificaciones Prioritarias'}
            {filter === 'week' && 'Notificaciones de Esta Semana'}
            {filter === 'my-notifications' && 'Mis Notificaciones'}
            {filter === 'all' && 'Todas las Notificaciones'}
          </h2>
          <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-600">
            {filteredNotifications.length}
          </Badge>
        </div>
        
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay notificaciones en esta categoría</p>
                <Button 
                  onClick={() => setShowDialog(true)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Crear Primera Notificación
                </Button>
              </div>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.Id}
                className={`bg-white/50 backdrop-blur-sm ${
                  notification.pinned ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'
                } hover:border-blue-300 transition-colors shadow-sm`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColorClasses(notification.color)} border`}>
                      <notification.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                            {getStatusBadge(notification)}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-600">
                              {notification.category}
                            </Badge>
                            <span className="text-sm text-gray-500">{formatDate(notification.createdAt)}</span>
                            <span className="text-sm text-gray-400">• por {notification.author}</span>
                          </div>
                        </div>
                        
                        {/* ACCIONES */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePublish(notification.Id)}
                            title={notification.isPublished ? 'Despublicar' : 'Publicar'}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            {notification.isPublished ? 
                              <Eye className="w-4 h-4 text-green-600" /> : 
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            }
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(notification.Id)}
                            title={notification.pinned ? 'Desfijar' : 'Fijar'}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <Pin className={`w-4 h-4 ${notification.pinned ? 'text-blue-600 fill-blue-600' : 'text-gray-400'}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editNotification(notification)}
                            title="Editar"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.Id)}
                            title="Eliminar"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mt-3 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}