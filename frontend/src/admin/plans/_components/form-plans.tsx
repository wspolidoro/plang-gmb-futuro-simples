import { Button } from "@/components/ui/button"
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/sonner"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    nome: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    valor: z.string().trim().min(1, { message: "Valor é obrigatório" }),
})

export function FormPlans({ plano }: { plano: any }) {
     const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: plano?.planName || "",
            valor: plano?.planValue || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

         fetch('https://prop.mktgohub.com.br/api/planos/' + plano.id, {
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
                  window.location.reload();
                } else {
                  toast.error('Erro ao fazer alteração. Verifique suas credenciais e tente novamente.')
                }
              })

        console.log("Submitted", plano, values);
        // Aqui pode fazer o fetch para atualizar
    }

    return (
        <Form {...form}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <DialogHeader>
                        <DialogTitle>Editar dados</DialogTitle>
                        <DialogDescription>
                            Você pode editar os dados do plano aqui.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Plano</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do plano" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="valor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor do Plano</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Valor do plano" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                             {form.formState.isSubmitting ? (<Loader2 className="mr2 h-4 w-4 animate-spin" />) : ("Salvar")}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Form>
    )
}
