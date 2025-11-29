import { Users, UserPlus, Mail, Phone, Key, Shield, Info, CheckCircle2, Copy } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { useState } from 'react';
import { Badge } from './ui/badge';

const API_URL = "http://hosterlink.somee.com/api/Auth/RegisterByAdmin";

export default function UserRegistrationSection() {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lastRegisteredUser, setLastRegisteredUser] = useState<any>(null);
    const [showCredentials, setShowCredentials] = useState(false);
    const [tempCredentials, setTempCredentials] = useState({ email: '', password: '' });
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'Tenant',
        isActive: true
    });

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const adminToken = localStorage.getItem('token'); 

        if (!adminToken) {
            alert("Error: No se encontró el token de autenticación. Por favor, inicia sesión.");
            setIsLoading(false);
            return;
        }

        const dataToSend = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role,
            isActive: formData.isActive
        };

        try {
            console.log('📤 Registrando nuevo usuario:', dataToSend);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`, 
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('✅ Usuario creado exitosamente:', responseData);
                
                // Guardar credenciales temporales para mostrar
                setTempCredentials({
                    email: formData.email,
                    password: formData.password
                });
                setShowCredentials(true);
                
                // Guardar info del último usuario registrado
                setLastRegisteredUser({
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    timestamp: new Date().toLocaleString('es-ES')
                });
                
                // Limpiar formulario
                setFormData({ 
                    name: '', 
                    email: '', 
                    phone: '', 
                    password: '', 
                    role: 'Tenant',
                    isActive: true 
                });
                
                alert(`✅ Usuario registrado exitosamente\n\nGuarda las credenciales que se mostrarán a continuación.`);
                
            } else {
                const errorText = await response.text();
                let errorMessage = 'Error desconocido';
                
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.title || errorData.message || errorData.errors?.Role?.[0] || errorMessage;
                } catch {
                    errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
                }
                
                console.error('❌ Error del API:', errorMessage);
                alert(`❌ Error en el registro: ${errorMessage}`);
            }

        } catch (error) {
            console.error('💥 Error de red:', error);
            alert('❌ No se pudo conectar con el servidor. Verifica tu conexión.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('¡Copiado al portapapeles!');
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-3">Registro de Usuarios</h1>
                <p className="text-muted-foreground text-lg">
                    Crea nuevas cuentas y gestiona las credenciales de acceso
                </p>
            </div>

            {/* Tarjetas de Información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tarjeta de Instrucciones */}
                <Card className="bg-card/50 backdrop-blur-sm border-border p-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-500/10 p-3 rounded-lg">
                            <Info className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-3">Proceso de Registro</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Completa el formulario con los datos del usuario</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Guarda las credenciales que se generarán</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Proporciona las credenciales al usuario de forma segura</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>El usuario podrá acceder inmediatamente al sistema</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Tarjeta de Tipos de Usuario */}
                <Card className="bg-card/50 backdrop-blur-sm border-border p-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-500/10 p-3 rounded-lg">
                            <Shield className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-3">Tipos de Acceso</h3>
                            <div className="space-y-3">
                                <div>
                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-1">
                                        Administrador
                                    </Badge>
                                    <p className="text-sm text-muted-foreground">
                                        Acceso completo al sistema con todos los permisos.
                                    </p>
                                </div>
                                <div>
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-1">
                                        Inquilino
                                    </Badge>
                                    <p className="text-sm text-muted-foreground">
                                        Acceso para consultas y gestiones básicas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Botón Principal de Registro */}
            <div className="text-center">
                <Dialog open={showAddDialog} onOpenChange={(open) => {
                    setShowAddDialog(open);
                    if (!open) {
                        setShowCredentials(false);
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary gap-3 px-8 py-6 text-lg">
                            <UserPlus className="w-6 h-6" />
                            Crear Nueva Cuenta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-foreground flex items-center gap-2">
                                <UserPlus className="w-5 h-5" />
                                Registrar Nuevo Usuario
                            </DialogTitle>
                            <DialogDescription>
                                Complete los datos para crear una nueva cuenta de acceso.
                            </DialogDescription>
                        </DialogHeader>

                        {showCredentials ? (
                            <div className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-green-800 mb-3">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="font-semibold">¡Usuario Creado Exitosamente!</span>
                                    </div>
                                    <p className="text-sm text-green-700 mb-4">
                                        Guarda estas credenciales de forma segura y proporciona al usuario:
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <Label className="text-green-700">Correo Electrónico</Label>
                                            <div className="flex gap-2 mt-1">
                                                <Input
                                                    value={tempCredentials.email}
                                                    readOnly
                                                    className="bg-green-100 border-green-300"
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => copyToClipboard(tempCredentials.email)}
                                                    className="bg-green-500 hover:bg-green-600"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-green-700">Contraseña</Label>
                                            <div className="flex gap-2 mt-1">
                                                <Input
                                                    type="password"
                                                    value={tempCredentials.password}
                                                    readOnly
                                                    className="bg-green-100 border-green-300"
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => copyToClipboard(tempCredentials.password)}
                                                    className="bg-green-500 hover:bg-green-600"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => {
                                        setShowAddDialog(false);
                                        setShowCredentials(false);
                                    }}
                                    className="w-full"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="add-name">
                                        Nombre Completo *
                                    </Label>
                                    <Input
                                        id="add-name"
                                        placeholder="Juan Pérez García"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-input-background border-border"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="add-email">
                                        Correo Electrónico *
                                    </Label>
                                    <Input
                                        id="add-email"
                                        type="email"
                                        placeholder="usuario@ejemplo.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-input-background border-border"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="add-password">
                                        Contraseña Inicial *
                                    </Label>
                                    <Input
                                        id="add-password"
                                        type="password" 
                                        placeholder="Mínimo 6 caracteres"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="bg-input-background border-border"
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="add-phone">
                                        Teléfono *
                                    </Label>
                                    <Input
                                        id="add-phone"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-input-background border-border"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="add-role">Tipo de Usuario *</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger id="add-role" className="bg-input-background border-border">
                                            <SelectValue placeholder="Seleccionar tipo de usuario" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tenant">Inquilino</SelectItem>
                                            <SelectItem value="Admin">Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="add-status">Estado Inicial</Label>
                                    <Select
                                        value={formData.isActive ? "active" : "inactive"}
                                        onValueChange={(value) => setFormData({ ...formData, isActive: value === "active" })}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger id="add-status" className="bg-input-background border-border">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Activo (acceso inmediato)</SelectItem>
                                            <SelectItem value="inactive">Inactivo (sin acceso)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button 
                                        type="submit" 
                                        className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary flex-1"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Registrando...
                                            </div>
                                        ) : (
                                            'Crear Cuenta'
                                        )}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setShowAddDialog(false)} 
                                        className="flex-1"
                                        disabled={isLoading}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Información Adicional */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
                <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Gestión de Credenciales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                        <div className="space-y-2">
                            <h4 className="font-medium text-foreground">Después del Registro</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <Key className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>Las credenciales se mostrarán después de crear la cuenta</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Copy className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Usa el botón "Copiar" para guardar las credenciales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <span>Proporciona las credenciales al usuario de forma segura</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-foreground">Acceso al Sistema</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>El usuario puede acceder inmediatamente con las credenciales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span>Puede cambiar su contraseña después del primer acceso</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>El acceso estará disponible según el estado (Activo/Inactivo)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Último usuario registrado */}
            {lastRegisteredUser && (
                <Card className="bg-blue-50 border-blue-200">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <UserPlus className="w-6 h-6 text-blue-500" />
                            <h3 className="font-semibold text-blue-800">Último Usuario Registrado</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-blue-700 font-medium">Nombre</p>
                                <p className="text-blue-600">{lastRegisteredUser.name}</p>
                            </div>
                            <div>
                                <p className="text-blue-700 font-medium">Correo</p>
                                <p className="text-blue-600">{lastRegisteredUser.email}</p>
                            </div>
                            <div>
                                <p className="text-blue-700 font-medium">Rol</p>
                                <Badge className={
                                    lastRegisteredUser.role === 'Admin' 
                                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                }>
                                    {lastRegisteredUser.role === 'Admin' ? 'Administrador' : 'Inquilino'}
                                </Badge>
                            </div>
                        </div>
                        <p className="text-xs text-blue-600 mt-3">
                            Registrado el: {lastRegisteredUser.timestamp}
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}