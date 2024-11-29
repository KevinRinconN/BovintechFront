import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ImagePreviewFile
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  file: File;
}

export const FileImagePreview = ({ file, ...props }: ImagePreviewFile) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setPreview(reader.result as string);
    };

    reader.onerror = () => {
      setLoading(false);
    };

    reader.readAsDataURL(file);

    return () => {
      setPreview(null);
      setLoading(true);
    };
  }, [file]);

  return (
    <>
      {loading && <LoaderCircle className="w-6 h-6 animate-spin" />}
      {preview && <img src={preview} {...props} />}
    </>
  );
};
