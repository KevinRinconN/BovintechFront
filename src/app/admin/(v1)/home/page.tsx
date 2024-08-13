import { getCattle } from "@/services/bovine.service";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DataPagination } from "./components/data-pagination";

interface props {
  searchParams: {
    page: number;
    size: number;
  };
}

export default async function HomePage({ searchParams }: props) {
  const page = searchParams.page || 0;
  const size = searchParams.size || 2;

  // const { data } = await getCattle(size, page);

  return (
    <div className="md:p-10 h-full flex-1 flex-col space-y-8 p-8 md:flex max-w-6xl mx-auto">
      <div className=" w-full space-y-2 gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        {/* <p className="text-muted-foreground">
          Aquí podrás ver una lista detallada de todos los bovinos guardados en
          nuestra base de datos.
        </p> */}
      </div>
      {/* <DataTable columns={columns} data={data.content} />
      <div className="flex justify-end">
        <DataPagination page={page} per_page={data.totalPages} max_page={5} />
      </div> */}
    </div>
  );
}
