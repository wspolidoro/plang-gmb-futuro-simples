import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Info, TrendingUp, Globe, Camera, Search } from "lucide-react";

interface UpsellService {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  impact: number;
  icon: React.ReactNode;
  benefits: string[];
}

interface UpsellServicesProps {
  onServiceToggle: (serviceId: string, impact: number) => void;
  selectedServices: string[];
}

export function UpsellServices({ onServiceToggle, selectedServices }: UpsellServicesProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services: UpsellService[] = [
    {
      id: "analysis",
      name: "Análise Completa + Relatório de Otimização Self",
      description: "Ajuda o cliente a começar sozinho com instruções detalhadas",
      price: 230,
      impact: 5,
      icon: <Search className="h-5 w-5" />,
      benefits: [
        "Auditoria completa do perfil atual",
        "Relatório detalhado com pontos de melhoria",
        "Guia passo a passo para implementação",
        "Checklist de otimização personalizado"
      ]
    },
    {
      id: "tour360",
      name: "Tour Virtual 360° com Publicação no Google Maps",
      description: "Fotos imersivas ajudam a aumentar o tempo de permanência e ranqueamento",
      price: 390,
      originalPrice: 590,
      impact: 8,
      icon: <Camera className="h-5 w-5" />,
      benefits: [
        "Tour virtual profissional do estabelecimento",
        "Publicação direta no Google Maps",
        "Aumento do tempo de permanência na ficha",
        "Diferencial competitivo visual"
      ]
    },
    {
      id: "website",
      name: "Criação de Site Local com SEO Básico",
      description: "Site profissional otimizado para busca local",
      price: 690,
      impact: 12,
      icon: <Globe className="h-5 w-5" />,
      benefits: [
        "Site responsivo otimizado para mobile",
        "SEO local básico implementado",
        "Integração com Google Meu Negócio",
        "Formulário de contato e WhatsApp"
      ]
    },
    {
      id: "seo-advanced",
      name: "Serviço Avançado de SEO para Sites Existentes",
      description: "Diagnóstico + otimização técnica e de conteúdo",
      price: 0, // Valor sob consulta
      impact: 15,
      icon: <TrendingUp className="h-5 w-5" />,
      benefits: [
        "Auditoria técnica completa do site",
        "Otimização de velocidade e performance",
        "Estratégia de conteúdo local",
        "Link building regional"
      ]
    }
  ];

  const formatCurrency = (value: number) => {
    if (value === 0) return "Sob consulta";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  const handleServiceToggle = (service: UpsellService) => {
    onServiceToggle(service.id, service.impact);
  };

  const toggleExpanded = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const getTotalAdditionalImpact = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.impact, 0);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground flex items-center justify-center gap-2">
            <Plus className="h-6 w-6 text-success" />
            Potencialize Seus Resultados
          </CardTitle>
          <p className="text-muted-foreground">
            Adicione serviços complementares e veja o impacto que eles podem gerar
          </p>
          {selectedServices.length > 0 && (
            <Badge className="mx-auto bg-success text-success-foreground">
              Impacto adicional estimado: +{getTotalAdditionalImpact()}%
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              const isExpanded = expandedService === service.id;
              
              return (
                <Card 
                  key={service.id}
                  className={`transition-all duration-300 hover:shadow-md cursor-pointer ${
                    isSelected 
                      ? 'border-success bg-success/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {service.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatCurrency(service.originalPrice)}
                          </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                          {formatCurrency(service.price)}
                        </span>
                        {service.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            Promocional
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{service.impact}% impacto
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {isExpanded && (
                      <div className="space-y-2 bg-muted/30 rounded-lg p-3">
                        <p className="text-sm font-medium text-foreground">Inclui:</p>
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleServiceToggle(service)}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                      >
                        {isSelected ? "✓ Adicionado" : "Adicionar à proposta"}
                      </Button>
                      <Button
                        onClick={() => toggleExpanded(service.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {isSelected && (
                      <div className="text-center">
                        <Button variant="link" size="sm" className="text-primary">
                          Simular com esse serviço incluso
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {selectedServices.length > 0 && (
            <div className="mt-6 p-4 bg-success-bg rounded-lg text-center">
              <p className="text-success font-medium">
                🚀 Com os serviços selecionados, você pode aumentar seus resultados em até +{getTotalAdditionalImpact()}% adicional!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Veja o Google trabalhando ainda mais a seu favor
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}