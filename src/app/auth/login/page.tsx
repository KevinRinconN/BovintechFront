import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthLoginForm } from "./partials/auth-login-form";

export default function LoginPage() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Bienvenido a Bovintech</CardTitle>
        <CardDescription>Inicia sesion para poder ingresar</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthLoginForm />
      </CardContent>
      <CardFooter className="grid">
        <p className="px-5 text-center text-sm text-muted-foreground">
          ¿Necesitas ayuda para ingresar?
          <a
            className="ml-2 text-secondary hover:underline underline-offset-4 hover:text-primary-accent"
            href={"https://cursos.devtalles.com/pages/contactanos"}
            target="_blank"
          >
            Contáctanos
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
