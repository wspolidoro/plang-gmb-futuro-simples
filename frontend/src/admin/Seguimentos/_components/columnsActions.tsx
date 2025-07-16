import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Loader2, MoreHorizontal } from "lucide-react"
import { FormPlans } from "./form-plans"
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";



export default function ColumnsActions({plano}: { plano: any }) {
    const [isOpen, setIsOpen] = useState(false);
      const [load2, setLoad2] = useState(false);
    /*       fetch('https://prop.mktgohub.com.br/api/planos/edit', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              console.log('Success:', data);
              navigate('/dashboard');
            } else {
              toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.')
            }
          }) */


  function verProposta(e) {
    setLoad2(true);

    const proposalId = e.currentTarget.id;

    const novaAba = window.open('', '_blank');

    fetch('https://prop.mktgohub.com.br/api/pdf/' + proposalId)
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

    return (
         <Dialog>
                 <DialogTrigger asChild>
                    <Button id={plano.id} onClick={(e) => verProposta(e)}>
                       {load2 ? <Loader2 className="animate-spin" /> : <Eye className="h-4 w-4" />}
                       Gerar proposta
                      </Button>
                </DialogTrigger>
        </Dialog>
    )
}

function setLoad2(arg0: boolean) {
  throw new Error("Function not implemented.");
}
