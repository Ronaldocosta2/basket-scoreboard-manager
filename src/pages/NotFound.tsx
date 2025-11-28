import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex items-center justify-center relative">
      {/* Hero Section Background Effect */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-background to-blue-500/10 pointer-events-none" />

      <div className="text-center relative z-10 px-4">
        <h1 className="text-9xl font-black mb-4 tracking-tighter bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent animate-pulse">404</h1>
        <p className="mb-8 text-2xl font-bold text-muted-foreground">Oops! Página não encontrada</p>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          Parece que você tentou fazer uma jogada fora da quadra. A página que você está procurando não existe.
        </p>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20 gap-2">
          <a href="/">
            <Home className="h-4 w-4" />
            Voltar para o Início
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
