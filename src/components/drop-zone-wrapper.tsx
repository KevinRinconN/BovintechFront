import { FileDropZone } from "./file-drop-zone";
import { Cross, FileCheck, FileCheck2, ImageUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useControllableState } from "@/hooks/useControllableState";

import { IconWrapper } from "./icon/icon-wrapper";
import { FileImagePreview } from "./image-preview-file";

interface DropZoneWrapperProps {
  fileValues?: File[];
  setFileValues?: (files: File[]) => void;
  type?: "img" | "xlsx";
  multiple?: boolean;
}

export const DropZoneWrapper = ({
  fileValues,
  setFileValues,
  multiple = false,
  type,
}: DropZoneWrapperProps) => {
  const [files, setFiles] = useControllableState({
    prop: fileValues,
    defaultProp: [],
    onChange: setFileValues,
  });

  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files?.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setDragActive(false);
  };

  const handleAddFile = (newFiles: File[]) => {
    setFiles((prevFiles) => [...(prevFiles || []), ...newFiles]);
  };

  return (
    <>
      {(!(files && files.length > 0) || multiple) && (
        <FileDropZone
          value={files}
          onChangeValue={handleAddFile}
          multiple={multiple}
          onDragActiveChange={setDragActive}
          className={cn(
            "aspect-video border-2 border-border border-dashed rounded-lg transition text-sm text-muted-foreground/50",
            dragActive && "bg-muted text-muted-foreground"
          )}
        >
          <div className="relative w-full h-full flex flex-col space-y-6 items-center justify-center">
            {type == "img" ? (
              <IconWrapper icon="img" size="lg" />
            ) : (
              <IconWrapper icon="img" size="lg" className="text-primary" />
            )}
            <div className="flex flex-col items-center">
              <p className="text-foreground">
                Arrastra y suelta los archivos o
                <span className="font-semibold text-primary"> Busca</span>
              </p>
              <span className="text-xs font-normal">
                Máximo 10MB por archivo
              </span>
            </div>
          </div>
        </FileDropZone>
      )}
      {files &&
        files.length > 0 &&
        files.map((file, index) => (
          <div
            key={index}
            className="relative mt-4 w-full flex rounded-md overflow-hidden"
          >
            <div className="flex items-center">
              {file.type.startsWith("image/") ? (
                <FileImagePreview
                  file={file}
                  alt={file.name}
                  className="w-full"
                />
              ) : (
                <div className="flex items-center  justify-center p-4 bg-muted rounded-full">
                  <FileCheck className="w-5 h-5" />
                </div>
              )}
             
            </div>
            <Button
              className="absolute bottom-5 right-5 text-muted-foreground rounded-full gap-x-2"
              variant="secondary"
              type="button"
              onClick={() => handleRemoveFile(index)}
            >
              <IconWrapper icon="close" />
              Quitar
            </Button>
          </div>
        ))}
    </>
  );
};
