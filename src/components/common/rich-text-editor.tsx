"use client";
import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  suspense: true,
  loading: () => (
    <div className="text-cyber-blue animate-pulse p-4">加载编辑器中...</div>
  ),
});

export const RichTextEditor = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const quillRef = React.useRef<any>(null);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // ts-ignore
    import("react-quill-new/dist/quill.snow.css");
  }, []);

  return (
    <div className={`${className} bg-dark-input`}>
      {!isMounted ? (
        <div className="text-cyber-blue animate-pulse p-4">加载编辑器中...</div>
      ) : (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          className="text-white"
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
          ]}
        />
      )}
      {typeof window !== "undefined" && (
        <style jsx global>{`
          .ql-toolbar {
            border-color: rgba(0, 231, 255, 0.3) !important;
            background: #1a1a2e;
          }
          .ql-container {
            border-color: rgba(0, 231, 255, 0.3) !important;
            background: rgba(22, 33, 62, 0.4);
          }
          .ql-editor {
            min-height: 300px;
            color: white;
          }
          .ql-snow .ql-stroke {
            stroke: #00e7ff;
          }
          .ql-snow .ql-fill {
            fill: #00e7ff;
          }
        `}</style>
      )}
    </div>
  );
};
