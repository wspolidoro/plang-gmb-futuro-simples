import { Card } from "@/components/ui/card";

interface SimulatorHeaderProps {
  businessName?: string;
}

export function SimulatorHeader({ businessName }: SimulatorHeaderProps) {
  return (
    <div className="bg-gradient-hero text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Simulador de ROI - Google Meu Negócio
          </h1>
          <p className="text-lg opacity-90">
            Descubra quanto seu negócio pode crescer com otimização local profissional
          </p>
        </div>
        
        {businessName && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 inline-block">
            <p className="text-sm opacity-90">Simulação para:</p>
            <p className="text-xl font-semibold">{businessName}</p>
          </Card>
        )}
        
        <div className="mt-8 text-sm opacity-80">
          <p>Powered by <span className="font-semibold">Plang</span> - Posicionamento Local Avançado no Google</p>
        </div>
      </div>
    </div>
  );
}