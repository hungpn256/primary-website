/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosClient } from "@/services/axios-client";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Loader2, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface OptimizedImage {
  id: string;
  name: string;
  originalSize: number;
  optimizedSize: number;
  optimizationPercentage: number;
  optimizedBlob: Blob;
}

export default function ImageOptimizer() {
  const [optimizedImages, setOptimizedImages] = useState<OptimizedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const accepted = [".png", ".jpg", ".jpeg", ".webp"];
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": accepted,
    },
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        toast.error("❌ Vui lòng chỉ sử dụng định dạng " + accepted.join(", "));
        return;
      }
      if (acceptedFiles.length > 20) {
        toast.error("❌ Tối đa chỉ được 20 ảnh 1 lúc!!");
        return;
      }
      try {
        setIsProcessing(true);
        const optimizedResults = await Promise.all(
          acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("image", new Blob([file]), "image.jpg");

            const response = await axiosClient.post(
              "/optimized-image",
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
              }
            );

            const blob = response.data;
            const optimizedSize = blob.size;
            const originalSize = file.size;

            return {
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              originalSize,
              optimizedSize,
              optimizationPercentage:
                ((originalSize - optimizedSize) / originalSize) * 100,
              optimizedBlob: blob,
            } as OptimizedImage;
          })
        );
        setOptimizedImages(optimizedResults);
        toast.success("🎉 Ảnh tối ưu hóa thành công!");
      } catch {
        toast.error("❌ Lỗi khi tối ưu hóa ảnh!");
      } finally {
        setIsProcessing(false);
      }
    },
  });

  const handleDelete = (id: string) => {
    setOptimizedImages((images) => images.filter((img) => img.id !== id));
  };

  const handleDownload = (image: OptimizedImage) => {
    const url = URL.createObjectURL(image.optimizedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `toi-uu-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAll = () => {
    setOptimizedImages([]);
  };

  const handleDownloadAll = () => {
    optimizedImages.forEach(handleDownload);
  };

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/20 hover:border-muted-foreground/50"
        }`}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            Kéo và thả hình ảnh vào đây, hoặc click để chọn hình ảnh
          </p>
        </motion.div>
      </div>

      {isProcessing && (
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Đang xử lý...</span>
        </motion.div>
      )}

      <AnimatePresence>
        {optimizedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Hình Ảnh Đã Tối Ưu
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên file</TableHead>
                  <TableHead>Kích thước gốc</TableHead>
                  <TableHead>Kích thước sau tối ưu</TableHead>
                  <TableHead>Phần trăm tối ưu</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optimizedImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>{image.name}</TableCell>
                    <TableCell>{formatBytes(image.originalSize)}</TableCell>
                    <TableCell>{formatBytes(image.optimizedSize)}</TableCell>
                    <TableCell>
                      {image.optimizationPercentage.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(image)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex space-x-4">
              <Button variant="destructive" onClick={handleDeleteAll}>
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa Tất Cả
              </Button>
              <Button variant="outline" onClick={handleDownloadAll}>
                <Download className="mr-2 h-4 w-4" />
                Tải Xuống Tất Cả
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
}
