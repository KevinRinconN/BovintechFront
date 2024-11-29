import {
  getCattle,
  getCattleById,
  getOffSpring,
} from "@/services/bovine.service";

import { DataPagination } from "@/components/data-pagination";
import { CardChar, ContainerCardChar } from "@/components/card-char";
import { DataTable } from "../../../../../components/data-table";
import { columns } from "../../../../../components/columns";
import {
  DetailsCattle,
  DetailsCattleSheet,
} from "../../../../../components/details-bovine-sheet";
import { formatDate, getSex } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { ImgAvatar } from "@/components/img-avatar";
import { RecordToCattle } from "../../../../../components/record-to-bovine";
import { ChartConfig } from "@/components/ui/chart";
import { WeightSection } from "./weight-section";
import { BirthSection } from "./birth-section";
import { PageWrapper } from "@/components/page-wrapper";

interface props {
  params: { id: string };
  searchParams: {
    page: number;
    size: number;
  };
}

export default async function HomePage({ params, searchParams }: props) {
  const page = searchParams.page || 0;
  const size = searchParams.size || 10;
  const { data: cattle } = await getCattleById(Number(params.id));
  const { data } = await getOffSpring(params.id, size, page);

  return (
    <PageWrapper>
      <section className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row gap-x-4">
        <article className="w-full max-w-lg">
          <div className=" w-full gap-2 px-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {cattle.brand}
            </h1>
            <p className="">{getSex(cattle?.gender as "BULL" | "COW")}</p>
            <p className="text-muted-foreground">{cattle.distinctiveTrait}</p>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            <Card className="flex border justify-between items-center px-6 py-2">
              <div>
                <p>Raza</p>
                <p className="text-sm text-muted-foreground">{cattle.breed}</p>
              </div>
              <IconWrapper icon="adn" strokeWidth="bold" />
            </Card>
            <Card className="flex border justify-between items-center px-6 py-2">
              <div>
                <p>Fecha de nacimiento</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(cattle.dateOfBirth)}
                </p>
              </div>
              <IconWrapper icon="calendar" strokeWidth="bold" />
            </Card>
            <Card className="flex border justify-between items-center px-6 py-2">
              <div>
                <p>Progreso</p>
                <p className="text-sm text-muted-foreground">{cattle.stage}</p>
              </div>
              <IconWrapper icon="flagGoal" strokeWidth="bold" />
            </Card>
            <Card className="flex border justify-between items-center px-6 py-2">
              <div>
                <p>Peso actual</p>
                <p className="text-sm text-muted-foreground">
                  {cattle.lastWeight
                    ? `${cattle.lastWeight} Kg`
                    : "No hay registro"}
                </p>
              </div>
              <IconWrapper icon="weight" strokeWidth="bold" />
            </Card>
          </div>
        </article>
        <article className="flex-1 grid grid-cols-2 gap-x-4">
          <Card className="flex border flex-col items-center justify-center space-y-4 p-4">
            <ImgAvatar
              className="w-20 h-20 md:w-24 md:h-24"
              lastWeightImage={cattle?.sire?.lastWeightImage}
            />
            <div className="text-center">
              <p className="text-xl">{cattle?.sire?.brand}</p>
              <p className="text-sm text-muted-foreground">Padre</p>
            </div>
          </Card>
          <Card className="flex  border flex-col items-center justify-center space-y-4">
            <ImgAvatar
              className="w-20 h-20 md:w-24 md:h-24"
              lastWeightImage={cattle?.dam?.lastWeightImage}
            />
            <div className="text-center">
              <p className="text-xl">{cattle?.dam?.brand}</p>
              <p className="text-sm text-muted-foreground">Madre</p>
            </div>
          </Card>
        </article>
      </section>
      {cattle.gender == "COW" && <BirthSection cattle={params.id} />}
      <WeightSection weight={cattle.lastWeight} cattle={params.id} />
      <section>
        <h3 className="flex gap-x-2 items-center text-muted-foreground mb-4">
          <IconWrapper icon="paw" strokeWidth="bold" />
          Descendencia
        </h3>
        <DetailsCattle>
          <DataTable columns={columns} data={data.content} />
          <DetailsCattleSheet />
        </DetailsCattle>
      </section>

      <div className="flex justify-end">
        <DataPagination page={page} max_page={data?.totalPages} />
      </div>
    </PageWrapper>
  );
}
