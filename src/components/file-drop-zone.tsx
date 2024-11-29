import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useControllableState } from "@/hooks/useControllableState";
import { cn } from "@/lib/utils";

import React, {
  type DragEvent,
  ChangeEvent,
  forwardRef,
  useCallback,
} from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

interface FileDropZoneProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  value?: File[];
  onChangeValue?: (files: File[]) => void;
  dragActive?: boolean;
  onDragActiveChange?: (isActive: boolean) => void;
  multiple?: boolean;
}

const FileDropZone = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FileDropZoneProps
>(
  (
    {
      value,
      onChangeValue,
      dragActive: controlledDragActive,
      onDragActiveChange,
      multiple = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [file, setFile] = useControllableState({
      prop: value,
      onChange: onChangeValue,
    });

    const [dragActive, setDragActive] = useControllableState<boolean>({
      prop: controlledDragActive,
      onChange: onDragActiveChange,
      defaultProp: false,
    });

    const handleDrag = useCallback(
      (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      },
      [setDragActive]
    );

    const handleDrop = useCallback(
      async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const files = Array.from(e.dataTransfer.files);
          setFile(files);
        }
       

        e.dataTransfer.clearData();
      },
      [setFile, setDragActive]
    );

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files);
        setFile(filesArray);
      }
    };

    return (
      <Label
        ref={ref}
        htmlFor="dropzone-file"
        className={cn("relative h-full flex w-full ", className)}
        {...props}
      >
        {children}
        <div
          className="absolute inset-0 cursor-pointer"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          role="button"
          aria-label="Arrastra y suelta archivos aquí"
        />
        <Input
          onChange={handleChange}
          multiple={multiple}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </Label>
    );
  }
);

FileDropZone.displayName = "FileDropZone";
export { FileDropZone };
