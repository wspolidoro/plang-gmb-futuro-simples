import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Download, Eye, Star, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Plan {
  id: string;
  name: string;
  setup: number;
  monthly: number;
  features: string[];
  highlighted?: boolean;
}

interface CommercialProposalProps {
  businessData: {
    businessName: string;
    averageTicket: number;
    monthlyVolume: number;
    niche: string;
  };
  proposalId: string;
}

export function CommercialProposal({ businessData, proposalId }: CommercialProposalProps) {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [data, setData] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const navigate = useNavigate();

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Plano Básico",
      setup: 0,
      monthly: 297,
      features: [
        "Otimização completa do perfil GMB",
        "Gestão de avaliações e respostas",
        "Posts semanais personalizados",
        "Relatório mensal de performance"
      ]
    },
    {
      id: "intermediate",
      name: "Plano Intermediário",
      setup: 0,
      monthly: 497,
      highlighted: true,
      features: [
        "Tudo do Plano Básico",
        "Gestão de múltiplas localizações",
        "Criação de conteúdo premium",
        "Análise da concorrência",
        "Suporte prioritário via WhatsApp"
      ]
    },
    {
      id: "advanced",
      name: "Plano Avançado",
      setup: 197,
      monthly: 797,
      features: [
        "Tudo do Plano Intermediário",
        "Estratégias de SEO local avançado",
        "Campanhas de review marketing",
        "Consultoria estratégica mensal",
        "Integração com redes sociais",
        "Dashboard executivo personalizado"
      ]
    }
  ];

  useEffect(() => {
    fetch('https://prop.mktgohub.com.br/planos')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setData(data.data);
        }
      })
    console.log('cegando: ', proposalId)
  }, [])

  useEffect(() => {
    if (proposalId) {
      // Aqui o ID já chegou — você pode fazer chamadas ou atualizar estado local
      console.log('Proposta carregada com ID:', proposalId);
    }
  }, [proposalId]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  const togglePlanSelection = (planId: string) => {
    setSelectedPlans(prev =>
      prev.includes(planId)
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  const handleEmailRequest = () => {
    setShowEmailForm(true);
  };

  const sendProposal = () => {
    // Aqui seria implementada a lógica de envio
    console.log("Enviando proposta para:", clientEmail);
    setShowEmailForm(false);
  };

  function verPdf() {
    fetch('https://prop.mktgohub.com.br/pdf/' + proposalId)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success) {

        }
      })

  }

  function baixarProposta() {
    setLoad(true)
    fetch('https://prop.mktgohub.com.br/pdf/' + proposalId)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setLoad(false);
      })
      .catch(err => console.error('Erro ao baixar PDF:', err));

  }

  function verProposta() {
    setLoad2(true);

    const novaAba = window.open('', '_blank');

    fetch('https://prop.mktgohub.com.br/pdf/' + proposalId)
      .then(response => response.blob())
      .then(blob => {
        setLoad2(false);
        const url = window.URL.createObjectURL(blob);
        if (novaAba) {
          novaAba.location.href = url;
        } else {
          alert('Não foi possível abrir a aba. Verifique o bloqueador de popups.');
        }
      })
      .catch(err => {
        console.error('Erro ao abrir PDF:', err);
        setLoad2(false);
      });
  }


  /*   function verProposta() {
      setLoad2(true)
      fetch('https://prop.mktgohub.com.br/pdf/' + proposalId)
        .then(response => response.blob())
        .then(blob => {
          setLoad2(false);
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        })
        .catch(err => console.error('Erro ao abrir PDF:', err));
    } */

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Proposta Comercial Personalizada
          </CardTitle>
          <p className="text-muted-foreground">
            Escolha o plano ideal para <span className="font-semibold text-primary">{businessData.businessName}</span> crescer no Google
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${selectedPlans.includes(plan.id)
                  ? 'border-primary bg-primary/5'
                  : plan.highlighted
                    ? 'border-primary bg-gradient-primary/5'
                    : 'border-border hover:border-primary/50'
                  }`}
                onClick={() => togglePlanSelection(plan.id)}
              >
                {plan.highlighted > 0 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Mais Popular
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-foreground">{plan.planName}</CardTitle>
                  <div className="space-y-1">
                    {plan.setup > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Setup: {formatCurrency(plan.setup)}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(plan.planValue)}
                      <span className="text-sm font-normal text-muted-foreground">/mês</span>
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {JSON.parse(plan.features).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}

                  {selectedPlans.includes(plan.id) && (
                    <div className="mt-4 p-3 bg-success-bg rounded-lg">
                      <p className="text-sm font-medium text-success">✓ Selecionado para proposta</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedPlans.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Planos selecionados:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedPlans.map(planId => {
                    const plan = plans.find(p => p.id === planId);
                    return (
                      <Badge key={planId} variant="secondary">
                        {plan?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {!showEmailForm ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {/*   <Button onClick={handleEmailRequest} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Solicitar Proposta por E-mail
                  </Button> */}
                  <Button variant="outline" className="flex items-center gap-2" onClick={baixarProposta}>
                    {load ? <Loader2 className="animate-spin" /> : <Download className="h-4 w-4" />}

                    Baixar Proposta em PDF
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={verProposta}>
                    {load2 ? <Loader2 className="animate-spin" /> : <Eye className="h-4 w-4" />}

                    Visualizar Proposta
                  </Button>
                </div>
              ) : (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientName">Nome completo</Label>
                        <Input
                          id="clientName"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientEmail">E-mail</Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={sendProposal}
                        disabled={!clientName || !clientEmail}
                        className="flex-1"
                      >
                        Enviar Proposta
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowEmailForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}