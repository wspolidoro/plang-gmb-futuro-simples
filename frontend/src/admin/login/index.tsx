import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().trim().min(1, { message: "Email é obrigatório" }).email({ message: "Email inválido" }),
  password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    fetch('https://prop.mktgohub.com.br/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
           localStorage.setItem('admin_token', data.token); // Salva um token simples
          console.log('Success:', data);
          navigate('/dashboard');
        } else {
          toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.')
        }
      })

  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="account">
          {/*    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList> */}
          <TabsContent value="account">
            <Card>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Faça login para acessar a sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite sua senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? (<Loader2 className="mr2 h-4 w-4 animate-spin" />) : ("Entrar")}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}