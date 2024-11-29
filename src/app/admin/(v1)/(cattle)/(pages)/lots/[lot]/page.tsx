import { getCattle } from "@/services/bovine.service";
// import { columns } from "../../../components/columns";
import { DataTable } from "../../../components/data-table";
import { DataPagination } from "@/components/data-pagination";
import { ContainerCardChar } from "@/components/card-char";
import {
  DetailsCattle,
  DetailsCattleSheet,
} from "../../../components/details-bovine-sheet";
import { DataPageSize } from "@/components/data-page-size";
import { DataTableFilter } from "../../../components/data-table-filter";
import { DataTableOptionFilter } from "../../../components/data-table-option-filter";
import { DeleteSearchParams } from "@/components/delete-search-params";
import { PageWrapper } from "@/components/page-wrapper";
import { columns } from "../../../components/columns";

interface props {
  params: { lot: string };
  searchParams: {
    filter: string;
    breed: string;
    gender: string;
    page: string;
    size: string;
  };
}

const options = [
  {
    id: "Angus",
    text: "Angus",
  },
  {
    id: "Holstein",
    text: "Holstein",
  },
  {
    id: "Brangus",
    text: "Brangus",
  },
  {
    id: "Hereford",
    text: "Hereford",
  },
  {
    id: "Beefalo",
    text: "Beefalo",
  },
  {
    id: "Chianina",
    text: "Chianina",
  },
  {
    id: "Nelore",
    text: "Nelore",
  },
  {
    id: "Gelbvieh",
    text: "Gelbvieh",
  },
];

export default async function HomePage({
  params: { lot },
  searchParams,
}: props) {
  const filter = searchParams.filter || "";
  const breed = searchParams.breed;
  const gender = searchParams.gender || "";
  const page = searchParams.page || "0";
  const defaultSize = "10";
  const size =
    Number(searchParams.size || defaultSize) > 30
      ? defaultSize
      : searchParams.size || defaultSize;

  const { data } = await getCattle(lot, filter, breed, gender, size, page);

  return (
    <PageWrapper>
      <div className=" w-full space-y-2 gap-2">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          Lote 1A
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Aquí podrás ver una lista detallada de todos los bovinos guardados en
          nuestra base de datos.
        </p>
      </div>
      <ContainerCardChar />
      <section className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center gap-x-2">
          <DataTableFilter />
          <DataTableOptionFilter
            filter="breed"
            title="Raza"
            options={options}
            isMultiple
          />
          <DataTableOptionFilter
            filter="gender"
            title="Sexo"
            options={[
              { id: "COW", text: "Hembra" },
              { id: "BULL", text: "Macho" },
            ]}
          />
          <DeleteSearchParams />
        </div>

        <DetailsCattle>
          <DataTable columns={columns} data={data.content} />
          <DetailsCattleSheet />
        </DetailsCattle>
      </section>

      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-end space-x-4">
        <DataPageSize pageSize={size} />
        <DataPagination page={Number(page)} max_page={data?.totalPages} />
      </div>
    </PageWrapper>
  );
}
