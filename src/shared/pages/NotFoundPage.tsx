import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404 - Página não encontrada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <p className="text-muted-foreground">
              O endereço que você tentou acessar não existe ou foi removido.
            </p>
            <Button className="w-full" onClick={() => navigate('/dashboard', { replace: true })}>
              Voltar para o Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
