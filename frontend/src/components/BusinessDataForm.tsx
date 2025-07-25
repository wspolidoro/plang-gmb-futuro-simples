import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessData {
  businessName: string;
  averageTicket: number;
  monthlyVolume: number;
  niche: string;
}

interface BusinessDataFormProps {
  onSubmit: (data: BusinessData) => void;
}

const niches = [
  { value: "clinica-medica", label: "Clínica Médica" },
  { value: "pet-shop", label: "Pet Shop" },
  { value: "restaurante", label: "Restaurante" },
  { value: "salao-beleza", label: "Salão de Beleza" },
  { value: "academia", label: "Academia" },
  { value: "oficina-mecanica", label: "Oficina Mecânica" },
  { value: "dentista", label: "Consultório Odontológico" },
  { value: "advocacia", label: "Escritório de Advocacia" },
  { value: "imobiliaria", label: "Imobiliária" },
  { value: "contabilidade", label: "Escritório Contábil" },
  { value: "fisioterapia", label: "Clínica de Fisioterapia" },
  { value: "farmacia", label: "Farmácia" },
  { value: "loja-roupas", label: "Loja de Roupas" },
  { value: "padaria", label: "Padaria/Confeitaria" },
  { value: "outro", label: "Outro Segmento" }
];

export function BusinessDataForm({ onSubmit }: BusinessDataFormProps) {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "",
    averageTicket: 0,
    monthlyVolume: 0,
    niche: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.averageTicket > 0 && formData.monthlyVolume > 0 && formData.niche) {
      onSubmit(formData);
    }
  };

  const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
};

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData(prev => ({
      ...prev,
      averageTicket: Number(value) / 100
    }));
  };

  const isFormValid = formData.averageTicket > 0 && formData.monthlyVolume > 0 && formData.niche;

  return (
    <Card className="bg-gradient-card shadow-lg border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-foreground">
          Dados do Seu Negócio
        </CardTitle>
        <p className="text-muted-foreground">
          Preencha as informações abaixo para gerar sua simulação personalizada
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium">
              Nome do Negócio (opcional)
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="Ex: Clínica São João"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="averageTicket" className="text-sm font-medium">
              Ticket Médio (valor médio por venda) *
            </Label>
            <Input
              id="averageTicket"
              type="text"
              placeholder="R$ 0,00"
              value={formData.averageTicket > 0 ? formatCurrency(formData.averageTicket) : ""}
              onChange={handleTicketChange}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyVolume" className="text-sm font-medium">
              Vendas/Atendimentos por Mês *
            </Label>
            <Input
              id="monthlyVolume"
              type="number"
              placeholder="Ex: 50"
              min="1"
              value={formData.monthlyVolume || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyVolume: Number(e.target.value) }))}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="niche" className="text-sm font-medium">
              Nicho de Atuação *
            </Label>
            <Select
              value={formData.niche}
              onValueChange={(value) => setFormData(prev => ({ ...prev, niche: value }))}
              required
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione seu segmento" />
              </SelectTrigger>
              <SelectContent>
                {niches.map((niche) => (
                  <SelectItem key={niche.value} value={niche.value}>
                    {niche.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full h-12 bg-gradient-primary hover:shadow-primary text-lg font-semibold transition-all duration-300 disabled:opacity-50"
          >
            Gerar Simulação de Crescimento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}