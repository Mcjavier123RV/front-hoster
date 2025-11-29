import { useState } from 'react';
import { Building2, Mail, Lock, User, Phone, Home, Crown, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface RegisterProps {
  onBack: () => void;
}

export default function Register({ onBack }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'tenant' | 'admin' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    unit: '',
    password: '',
    confirmPassword: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRoleSelection = (selectedRole: 'tenant' | 'admin') => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a1a24] to-[#0a0a0f] flex items-center justify-center p-4">
      {/* Decorative golden circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-2xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-lg shadow-primary/20">
            <Crown className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-primary mb-2">HosterLink</h1>
          <p className="text-muted-foreground">Gestión de lujo a tu alcance</p>
        </div>

        {/* Registration Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={step === 1 ? onBack : () => setStep(1)}
              className="text-primary hover:text-accent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-foreground text-3xl">
              {step === 1 ? 'Solicitar Acceso' : submitted ? 'Solicitud Enviada' : 'Completa tu Registro'}
            </h2>
          </div>

          {!submitted ? (
            <>
              {/* Step 1: Role Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-8">
                    Selecciona el tipo de cuenta que necesitas
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tenant Card */}
                    <Card
                      onClick={() => handleRoleSelection('tenant')}
                      className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary group-hover:to-accent transition-all duration-300 mb-4">
                          <Home className="w-8 h-8 text-primary group-hover:text-background transition-colors duration-300" />
                        </div>
                        <h3 className="text-foreground mb-2">Inquilino</h3>
                        <p className="text-sm text-muted-foreground">
                          Accede a pagos, reservas, mantenimiento y más
                        </p>
                      </div>
                    </Card>

                    {/* Admin Card */}
                    <Card
                      onClick={() => handleRoleSelection('admin')}
                      className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary group-hover:to-accent transition-all duration-300 mb-4">
                          <Crown className="w-8 h-8 text-primary group-hover:text-background transition-colors duration-300" />
                        </div>
                        <h3 className="text-foreground mb-2">Administrador</h3>
                        <p className="text-sm text-muted-foreground">
                          Gestión completa del condominio y usuarios
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 2: Registration Form */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                    <p className="text-sm text-foreground text-center">
                      Registro como <span className="text-primary">{role === 'tenant' ? 'Inquilino' : 'Administrador'}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Juan Pérez"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={role === 'admin' ? 'admin@hosterlink.com' : 'usuario@ejemplo.com'}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {role === 'tenant' && (
                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-foreground">Unidad</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="unit"
                          type="text"
                          placeholder="Torre A-502"
                          value={formData.unit}
                          onChange={(e) => handleInputChange('unit', e.target.value)}
                          className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    Enviar Solicitud
                  </Button>
                </form>
              )}
            </>
          ) : (
            // Success Message
            <div className="text-center py-8">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <Crown className="w-12 h-12 text-green-400" />
                </div>
              </div>
              <h3 className="text-foreground mb-4 text-2xl">¡Solicitud Recibida!</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Tu solicitud de acceso ha sido enviada correctamente. 
                El equipo de administración la revisará y te contactará pronto para activar tu cuenta.
              </p>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <p className="text-sm text-foreground">
                  <span className="text-muted-foreground">Tipo de cuenta:</span>{' '}
                  <span className="text-primary">{role === 'tenant' ? 'Inquilino' : 'Administrador'}</span>
                </p>
                <p className="text-sm text-foreground mt-2">
                  <span className="text-muted-foreground">Correo:</span>{' '}
                  <span className="text-primary">{formData.email}</span>
                </p>
              </div>
              <Button 
                onClick={onBack}
                className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
              >
                Volver al Inicio de Sesión
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          © 2025 HosterLink. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
