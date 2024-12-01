import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { useVersionList } from "../../hooks/useVersionList";
import useUploadFile from "../../hooks/useUploadFile";
import { useDeleteFile } from "../../hooks/useDeleteFile";
import { useDownloadFile } from "../../hooks/useDownloadFile";
import useSelectVersion from "../../hooks/useSelectVersion";

type FileItem = {
  fileName: string;
  sizeSuffix: string;
  versionName: string;
  persianTime: string;
};

const Updown: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const packageName = "markazi.dehkade.ir";
  const { data, isLoading, isError } = useVersionList(packageName, isAuthenticated);
  const { mutate, isPending: isUploading } = useUploadFile();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(
    localStorage.getItem("selectedVersion")
  );
  const { mutate: deleteFile } = useDeleteFile();
  const { mutate: selectVersion } = useSelectVersion(); // Use the custom hook

  const handleDelete = (fileName: string, versionName: string) => {
    const requestData = {
      fileName,
      versionName,
      appPackageName: "markazi.dehkade.ir",
      filePath: "",
    };

    deleteFile(requestData, {
      onSuccess: () => {
        setFileList((prev) => prev.filter((file) => file.fileName !== fileName));
      },
    });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const { mutate: downloadFile } = useDownloadFile();

  useEffect(() => {
    if (data) {
      setFileList(data);
    }
  }, [data]);

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast.error("لطفاً یک فایل انتخاب کنید.");
      return;
    }

    mutate(
      { file: selectedFile, packageName },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: { resualt: any; }) => {
          if (response?.resualt) {
            toast.success("فایل با موفقیت آپلود شد!");
            const newFile: FileItem = {
              fileName: selectedFile.name,
              sizeSuffix: `${(selectedFile.size / 1024).toFixed(2)} KB`,
              versionName: "جدید",
              persianTime: new Date().toLocaleDateString("fa-IR"),
            };
            setFileList((prev) => [...prev, newFile]);
            setSelectedFile(null);
          } else {
            toast.error("آپلود فایل ناموفق بود.");
          }
        },
        onError: () => {
          toast.error("خطا در آپلود فایل.");
        },
      }
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      toast.error("فایل نامعتبر است.");
    }
  };

  const handleCheckboxChange = (fileName: string, versionName: string) => {
    const newSelectedVersion = selectedVersion === fileName ? null : fileName;
    setSelectedVersion(newSelectedVersion);
  
    if (newSelectedVersion) {
      localStorage.setItem("selectedVersion", newSelectedVersion);
  
      const filePath = "" 
      const requestData = {
        fileName,
        versionName,
        appPackageName: "markazi.dehkade.ir",
        filePath,
      };
  
      console.log("Request data:", requestData);
      selectVersion(requestData);
    } else {
      localStorage.removeItem("selectedVersion");
    }
  };
  
  

  const handleDownload = (fileName: string) => {
    const requestData = {
      fileName,
      package: "markazi.dehkade.ir",
    };

    downloadFile(requestData, {
      onSuccess: (data: Blob | MediaSource) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Set file name dynamically
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        toast.success(`دانلود فایل ${fileName} شروع شد.`);
      },
      onError: () => {
        toast.error("خطا در دانلود فایل.");
      },
    });
  };

  if (isLoading || isUploading ) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>خطا در بارگذاری نسخه‌ها</div>;

  return (
    <>
      <ToastContainer />
      <div className="flex items-center gap-4 justify-start" dir="rtl">
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
        <button
          onClick={handleFileUpload}
          disabled={!selectedFile}
          className={`btn ${selectedFile ? "btn-success" : "btn-disabled"}`}
        >
          آپلود فایل
        </button>
      </div>
      <table className="table-auto w-full bg-white text-right shadow-sm mt-4" dir="rtl">
        <thead>
          <tr>
            <th className="px-4 py-2">انتخاب</th>
            <th className="px-4 py-2">نام فایل</th>
            <th className="px-4 py-2">سایز</th>
            <th className="px-4 py-2">ورژن</th>
            <th className="px-4 py-2">تاریخ</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {fileList.map((file) => (
            <tr
              key={file.fileName}
              className={selectedVersion === file.fileName ? "bg-green-100" : ""}
            >
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedVersion === file.fileName}
                  onChange={() => handleCheckboxChange(file.fileName, file.versionName)}
                  className="checkbox checkbox-primary"
                  disabled={selectedVersion !== null && selectedVersion !== file.fileName}
                />
              </td>
              <td className="px-4 py-2">{file.fileName}</td>
              <td className="px-4 py-2">{file.sizeSuffix}</td>
              <td className="px-4 py-2">{file.versionName}</td>
              <td className="px-4 py-2">{file.persianTime}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDownload(file.fileName)}
                  className="btn btn-sm btn-primary mx-1"
                >
                  دانلود
                </button>
                <button
                  onClick={() => handleDelete(file.fileName, file.versionName)}
                  className="btn btn-sm btn-ghost mx-1"
                >
                  <FaTrash className="text-2xl text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Updown;
