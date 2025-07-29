import { useEffect, useState } from "react";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { BusinessDataForm } from "@/components/BusinessDataForm";
import { RevenueProjection } from "@/components/RevenueProjection";
import { PersuasiveElements } from "@/components/PersuasiveElements";
import { UpsellServices } from "@/components/UpsellServices";
import { CommercialProposal } from "@/components/CommercialProposal";


import html2canvas from 'html2canvas';
import axios from 'axios';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import path from "path";

const personalPdf = {
  method: 'open',
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    format: 'A4',
    // default is 'portrait'
    orientation: 'portrait'
  }
};

const targetRef = () => document.getElementById('pdf-content');

interface BusinessData {
  businessName: string;
  averageTicket: number;
  monthlyVolume: number;
  niche: string;
}

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [additionalImpact, setAdditionalImpact] = useState(0);
  const [isConsultantMode] = useState(false); // Future: toggle between client/consultant mode
  const [calculatedData, setCalculatedData] = useState({});
  const [proposalId, setProposalId] = useState(null);

  useEffect(() => {
    if (Object.keys(calculatedData).length < 1) return;
    fetch('https://prop.mktgohub.com.br/api/proposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(calculatedData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          console.log(data)
          setProposalId(data.proposal);
        }
      })
  }, [calculatedData])

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
    setSelectedUpsells([]);
    setAdditionalImpact(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpsellToggle = (serviceId: string, impact: number) => {
    setSelectedUpsells(prev => {
      if (prev.includes(serviceId)) {
        setAdditionalImpact(prev => prev - impact);
        return prev.filter(id => id !== serviceId);
      } else {
        setAdditionalImpact(prev => prev + impact);
        return [...prev, serviceId];
      }
    });
  };

  const tirarPrint = async () => {
    const elemento = document.body; // Ou use um div específico com ref

    const canvas = await html2canvas(elemento);
    const imagemBase64 = canvas.toDataURL('image/png'); // Formato base64 da imagem

    // Enviar para o backend
    const blob = await (await fetch(imagemBase64)).blob();
    const formData = new FormData();
    formData.append('screenshot', blob, 'print.png');

    axios.post('https://n8.z4u.com.br/webhook-test/f1e1c46f-bcc7-439b-b815-f7303e3c3e02', formData)
      .then(res => console.log('Enviado com sucesso', res.data))
      .catch(err => console.error('Erro ao enviar', err));
  };

  const enviarRelatorio = () => {
    /*  const html = document.getElementById('pdf-content').innerHTML;
   
     axios.post('https://prop.mktgohub.com.br/api/gerar-pdf', { html })
       .then((res) => {
         console.log("Relatório gerado com sucesso", res.data);
         console.log("Relatório enviado")
       })
       .catch(console.error); */
    const html = document.getElementById('pdf-content').innerHTML;

    fetch('https://prop.mktgohub.com.br/api/gerar-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html })
    })
      .then(response => response.blob())
      .then(blob => {
        // Baixar o PDF diretamente no front
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.pdf';
        a.click();
      })
      .catch(console.error);
  };

 

  return (
    <div className="min-h-screen bg-background" id="pdf-content">
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

                <RevenueProjection
                  businessData={businessData}
                  additionalImpact={additionalImpact}
                  setCalculatedData={setCalculatedData}
                />
                <PersuasiveElements />
                <UpsellServices
                  onServiceToggle={handleUpsellToggle}
                  selectedServices={selectedUpsells}
                />
             {/*    {proposalId && (
                  <CommercialProposal
                    businessData={businessData}
                    proposalId={proposalId}
                  />
                )} */}
                <CommercialProposal businessData={businessData} proposalId={proposalId}/>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-6 mt-12">

        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2025 <span className="font-semibold text-primary">Plang</span> - Posicionamento Local Avançado no Google
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

/*       <button onClick={tirarPrint}>Capturar Tela</button>
        <button onClick={() => enviarRelatorio()}>puppeter</button>
        <button onClick={() => generatePDF(targetRef, {
          method: "open",
          page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: 10,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'portrait'
          }
        })}>Download PDF</button> */