import {
  RectangleStackIcon,
  FolderIcon,
  BookmarkIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export interface Route {
  path: string;
  icon: React.ElementType;
  name: string;
}

const adminPrefix = "/admin";

const routesAdmin: Route[] = [
  {
    path: `${adminPrefix}/home`,
    icon: RectangleStackIcon,
    name: "Inicio",
  },
  {
    path: `${adminPrefix}/create`,
    icon: AcademicCapIcon,
    name: "Certificar",
  },
  {
    path: `${adminPrefix}/students`,
    icon: FolderIcon,
    name: "Estudiantes",
  },
  {
    path: `${adminPrefix}/courses`,
    icon: BookmarkIcon,
    name: "Cursos",
  },
];

export default routesAdmin;
