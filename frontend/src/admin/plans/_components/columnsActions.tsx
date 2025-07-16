import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { FormPlans } from "./form-plans"
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";



export default function ColumnsActions({plano}: { plano: any }) {
    const [isOpen, setIsOpen] = useState(false);
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




    return (
         <Dialog>
                 <DialogTrigger asChild>
                    <Button>Editar</Button>
                </DialogTrigger>

               <FormPlans plano={plano}/>
       {/*  <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
   
                <DropdownMenuItem>Editar</DropdownMenuItem>
            </DropdownMenuContent>
           
                <DialogTrigger asChild>
                    <Button>Abrir Dialog</Button>
                </DialogTrigger>

               <FormPlans />
            
            
        </DropdownMenu> */}
        </Dialog>
    )
}