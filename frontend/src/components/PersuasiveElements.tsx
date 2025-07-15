import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Navigation, Globe, Clock, CheckCircle, TrendingUp } from "lucide-react";

export function PersuasiveElements() {
  const rankingData = [
    { position: "1º lugar", ctr: "35%", color: "text-success" },
    { position: "2º lugar", ctr: "18%", color: "text-warning" },
    { position: "3º lugar", ctr: "12%", color: "text-warning" },
    { position: "4º lugar", ctr: "8%", color: "text-destructive" },
    { position: "5º lugar", ctr: "5%", color: "text-destructive" }
  ];

  const clientActions = [
    { action: "Cliques no botão 'Ligar'", increase: "+85%", icon: <Phone className="h-5 w-5" /> },
    { action: "Solicitações de rotas", increase: "+60%", icon: <Navigation className="h-5 w-5" /> },
    { action: "Visitas ao site", increase: "+70%", icon: <Globe className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Ranking Local Simulation */}
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Simulação de Ranking Local
          </CardTitle>
          <p className="text-muted-foreground">
            Veja a diferença entre aparecer no topo vs. mais abaixo no Google Maps
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-success-bg to-warning-bg rounded-lg p-6">
            <h4 className="font-semibold text-center mb-4 text-foreground">
              Taxa de Cliques por Posição no Google Maps
            </h4>
            <div className="space-y-3">
              {rankingData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                  <span className="font-medium">{item.position}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-2 rounded-full bg-gray-200`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-success' : index <= 2 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: item.ctr }}
                      />
                    </div>
                    <span className={`font-bold ${item.color}`}>{item.ctr}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-success-bg rounded-lg text-center">
              <p className="text-sm font-semibold text-success">
                🎯 Negócios no topo recebem até 70% mais cliques que os concorrentes!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Impact */}
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-warning" />
            Impacto das Avaliações Online
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-warning-bg to-success-bg rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-warning fill-warning" />
              ))}
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">
              Negócios com mais de 4,5 estrelas recebem 30% mais contatos
            </h4>
            <p className="text-muted-foreground mb-4">
              Com a Plang, ajudamos você a aumentar sua reputação online através de:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/70 rounded p-3">
                <CheckCircle className="h-5 w-5 text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Gestão de avaliações</p>
              </div>
              <div className="bg-white/70 rounded p-3">
                <CheckCircle className="h-5 w-5 text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Respostas profissionais</p>
              </div>
              <div className="bg-white/70 rounded p-3">
                <CheckCircle className="h-5 w-5 text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Estratégias de melhoria</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Actions Impact */}
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-success" />
            Impacto nas Ações do Cliente
          </CardTitle>
          <p className="text-muted-foreground">
            Dados baseados em insights reais do Google Meu Negócio
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clientActions.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-success-bg to-success/5 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-success/20 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{item.action}</h4>
                <p className="text-2xl font-bold text-success">{item.increase}</p>
                <p className="text-xs text-muted-foreground mt-2">aumento médio</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GMB Before/After Mockup */}
      <Card className="bg-gradient-card shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground">
            Transformação Visual: Antes vs. Depois
          </CardTitle>
          <p className="text-muted-foreground">
            Veja a diferença entre um perfil comum e um perfil otimizado pela Plang
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="space-y-3">
              <h4 className="font-semibold text-center text-destructive">❌ Perfil Comum</h4>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  <div>
                    <p className="font-medium text-sm">Meu Negócio</p>
                    <div className="flex gap-1">
                      <Star className="h-3 w-3 text-gray-400" />
                      <Star className="h-3 w-3 text-gray-400" />
                      <Star className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Descrição incompleta...</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>❌ Sem fotos de qualidade</p>
                  <p>❌ Horários desatualizados</p>
                  <p>❌ Sem posts regulares</p>
                  <p>❌ Avaliações sem resposta</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="space-y-3">
              <h4 className="font-semibold text-center text-success">✅ Perfil Otimizado Plang</h4>
              <div className="bg-white rounded-lg p-4 space-y-2 border border-success/20">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-primary rounded flex items-center justify-center text-white text-xs">
                    LOGO
                  </div>
                  <div>
                    <p className="font-medium text-sm">Meu Negócio Otimizado</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-warning fill-warning" />
                      ))}
                      <span className="text-xs ml-1">4.8 (127)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground">Descrição completa e otimizada com palavras-chave...</p>
                <div className="text-xs text-success space-y-1">
                  <p>✅ Fotos profissionais HD</p>
                  <p>✅ Informações sempre atualizadas</p>
                  <p>✅ Posts semanais estratégicos</p>
                  <p>✅ Respostas rápidas e profissionais</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final CTA */}
      <Card className="bg-gradient-primary text-white shadow-lg border-0">
        <CardContent className="text-center py-8">
          <Clock className="h-12 w-12 mx-auto mb-4 text-white/90" />
          <h3 className="text-2xl font-bold mb-4">
            Você está deixando dinheiro na mesa todos os meses!
          </h3>
          <p className="text-lg mb-6 text-white/90">
            Com o Google Meu Negócio bem gerenciado, sua empresa pode vender mais sem depender de anúncios pagos.
          </p>
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-3 shadow-lg"
            >
              📞 Agende um Diagnóstico Gratuito
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 font-semibold"
            >
              💬 Falar com Especialista no WhatsApp
            </Button>
          </div>
          <p className="text-sm text-white/80 mt-4">
            ⏰ Oferta limitada - Não perca mais tempo e dinheiro!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}