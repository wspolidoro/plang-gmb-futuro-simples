import { useState } from "react";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { BusinessDataForm } from "@/components/BusinessDataForm";
import { RevenueProjection } from "@/components/RevenueProjection";
import { PersuasiveElements } from "@/components/PersuasiveElements";

interface BusinessData {
  businessName: string;
  averageTicket: number;
  monthlyVolume: number;
  niche: string;
}

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: BusinessData) => {
    setBusinessData(data);
    setShowResults(true);
    // Scroll to results smoothly
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleNewSimulation = () => {
    setBusinessData(null);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SimulatorHeader businessName={businessData?.businessName} />
      
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {!showResults ? (
          <BusinessDataForm onSubmit={handleFormSubmit} />
        ) : (
          <div id="results" className="space-y-8">
            {businessData && (
              <>
                <div className="text-center">
                  <button
                    onClick={handleNewSimulation}
                    className="text-primary hover:text-primary-dark underline font-medium"
                  >
                    ← Fazer nova simulação
                  </button>
                </div>
                
                <RevenueProjection businessData={businessData} />
                <PersuasiveElements />
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2024 <span className="font-semibold text-primary">Plang</span> - Posicionamento Local Avançado no Google
          </p>
          <p className="mt-1">
            Simulador desenvolvido para demonstrar o potencial de crescimento com otimização GMB profissional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;