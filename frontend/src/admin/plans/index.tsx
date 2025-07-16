import { useEffect, useState } from "react"
import { columns, Payment } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

export default function plans() {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        document.title = "Planos - Plang";

        fetch('https://prop.mktgohub.com.br/planos')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setData(data.data);
                }
            })

    }, [])

    return (
        <div className="w-full flex justify-start">
            <PageContainer>
                <PageHeader>
                    <PageHeaderContent>
                        <PageTitle>Detalhes dos Planos</PageTitle>
                        <PageDescription>
                            Gerencie os planos disponíveis para os usuários, incluindo preços e nome do plano.
                        </PageDescription>
                    </PageHeaderContent>
                    {/*   <PageActions>
          <AddAppointmentButton patients={patients} doctors={doctors} />
        </PageActions> */}
                </PageHeader>
                <PageContent>
                    <DataTable columns={columns} data={data} />
                </PageContent>
            </PageContainer>

        </div>
    )
}