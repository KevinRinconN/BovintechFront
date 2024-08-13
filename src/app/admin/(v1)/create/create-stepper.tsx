import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ProgressDescription,
  ProgressIcon,
  Stepper,
  StepperContent,
  StepperProgress,
  StepperProgressItem,
} from "@/components/ui//stepper";
import { AsignParentsStep } from "./components/stepper/asign-parents/asign-parents-step";
import { DetailsStep } from "./components/stepper/details/details-step";

export const CreateStepper = () => {
  return (
    <Stepper className="mt-4 w-full">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="lg:max-w-xs w-full">
          <ProgressStepper />
        </div>
        <div className="flex-1 lg:max-w-3xl space-y-6">
          <StepperContent>
            <AsignParentsStep />
            <DetailsStep />
          </StepperContent>
        </div>
      </div>
    </Stepper>
  );
};

const ProgressStepper = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registra un bovino</CardTitle>
        <CardDescription>Realiza los siguientes pasos</CardDescription>
      </CardHeader>
      <CardContent>
        <StepperProgress>
          <StepperProgressItem step={0}>
            <ProgressIcon>
              <UserIcon />
            </ProgressIcon>
            <ProgressDescription>
              Selecciona sus progenitores
            </ProgressDescription>
          </StepperProgressItem>
          <StepperProgressItem step={1}>
            <ProgressIcon>
              <BriefcaseIcon />
            </ProgressIcon>
            <ProgressDescription>Detalles del bovino</ProgressDescription>
          </StepperProgressItem>
        </StepperProgress>
      </CardContent>
    </Card>
  );
};
