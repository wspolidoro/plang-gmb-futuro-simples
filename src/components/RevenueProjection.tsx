import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, DollarSign, Calendar, Target } from "lucide-react";

interface BusinessData {
  businessName: string;
  averageTicket: number;
  monthlyVolume: number;
  niche: string;
}

interface RevenueProjectionProps {
  businessData: BusinessData;
  additionalImpact?: number;
}

interface Scenario {
  name: string;
  growth: number;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

export function RevenueProjection({ businessData, additionalImpact = 0 }: RevenueProjectionProps) {
  const [customGrowth, setCustomGrowth] = useState(100);

  const currentRevenue = businessData.averageTicket * businessData.monthlyVolume;

  const scenarios: Scenario[] = [
    {
      name: "Cenário Pessimista",
      growth: 30 + additionalImpact,
      color: "text-warning",
      bgColor: "bg-warning-bg",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      name: "Cenário Médio",
      growth: 50 + additionalImpact,
      color: "text-primary",
      bgColor: "bg-primary/10",
      icon: <Target className="h-5 w-5" />
    },
    {
      name: "Cenário Otimista",
      growth: 75 + additionalImpact,
      color: "text-success",
      bgColor: "bg-success-bg",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      name: "Cenário Personalizado",
      growth: customGrowth + additionalImpact,
      color: "text-primary-dark",
      bgColor: "bg-gradient-to-r from-primary/5 to-success/5",
      icon: <DollarSign className="h-5 w-5" />
    }
  ];

  const calculateProjection = (growthPercent: number) => {
    const newVolume = Math.round(businessData.monthlyVolume * (1 + growthPercent / 100));
    const newRevenue = businessData.averageTicket * newVolume;
    const extraRevenue = newRevenue - currentRevenue;
    const yearlyExtra = extraRevenue * 12;

    return {
      newVolume,
      newRevenue,
      extraRevenue,
      yearlyExtra
    };
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-success" />
            Projeções de Crescimento
          </CardTitle>
          <p className="text-muted-foreground">
            Veja o que sua empresa pode faturar a mais com o Google trabalhando a seu favor
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Situação Atual</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(currentRevenue)}/mês</p>
            <p className="text-sm text-muted-foreground">
              {businessData.monthlyVolume} vendas × {formatCurrency(businessData.averageTicket)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario, index) => {
              const projection = calculateProjection(scenario.growth);
              
              return (
                <Card key={scenario.name} className={`${scenario.bgColor} border-0 shadow-md hover:shadow-lg transition-all duration-300`}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-lg flex items-center gap-2 ${scenario.color}`}>
                      {scenario.icon}
                      {scenario.name}
                    </CardTitle>
                    {scenario.name === "Cenário Personalizado" && (
                      <div className="space-y-2">
                        <Label htmlFor="customGrowth" className="text-sm font-medium">
                          Crescimento personalizado (%)
                        </Label>
                        <Input
                          id="customGrowth"
                          type="number"
                          min="1"
                          max="500"
                          value={customGrowth}
                          onChange={(e) => setCustomGrowth(Number(e.target.value))}
                          className="h-10"
                        />
                        {additionalImpact > 0 && (
                          <p className="text-xs text-success">
                            +{additionalImpact}% de serviços adicionais incluído
                          </p>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className={`text-center p-3 rounded-lg bg-white/50`}>
                      <p className="text-2xl font-bold text-foreground">
                        +{scenario.growth}%
                        {additionalImpact > 0 && (
                          <span className="text-sm text-success ml-1">
                            (+{additionalImpact}% extra)
                          </span>
                        )}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Novo volume mensal:</span>
                        <span className="font-semibold">{projection.newVolume} vendas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nova receita mensal:</span>
                        <span className="font-semibold">{formatCurrency(projection.newRevenue)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-muted-foreground">Receita extra/mês:</span>
                        <span className="font-bold text-success">{formatCurrency(projection.extraRevenue)}</span>
                      </div>
                      <div className="flex justify-between bg-success-bg rounded p-2">
                        <span className="font-medium flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Extra em 12 meses:
                        </span>
                        <span className="font-bold text-success">{formatCurrency(projection.yearlyExtra)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}