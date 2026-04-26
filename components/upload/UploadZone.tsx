"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export type UploadStatus = "queued" | "uploading" | "done" | "error";

export type UploadFile = {
  id: string;
  file: File;
  size: string;
  /** preview src for image files */
  preview?: string;
  /** which month/period this stub belongs to, e.g. "2026-03" */
  period?: string;
  status: UploadStatus;
  /** 0..100 */
  progress: number;
  errorMessage?: string;
};

const ACCEPTED = ".pdf,.png,.jpg,.jpeg,.heic";
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB

export function UploadZone({
  periodOptions,
  defaultPeriod,
  onSubmit,
}: {
  /** options like [{ value: "2026-03", label: "March 2026" }] */
  periodOptions: { value: string; label: string }[];
  defaultPeriod?: string;
  /** called when user clicks "Submit to landlord" — receives only successfully uploaded files. */
  onSubmit?: (files: UploadFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const next: UploadFile[] = arr.map((file) => {
        const tooBig = file.size > MAX_BYTES;
        return {
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
          file,
          size: humanSize(file.size),
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
          period: defaultPeriod,
          status: tooBig ? "error" : "queued",
          progress: 0,
          errorMessage: tooBig ? "File exceeds 12 MB limit." : undefined,
        };
      });
      setItems((prev) => [...prev, ...next]);
      // start simulated upload for valid items
      next
        .filter((n) => n.status === "queued")
        .forEach((n) => simulateUpload(n.id));
    },
    [defaultPeriod] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const simulateUpload = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: "uploading" } : it))
    );
    const tick = () => {
      setItems((prev) => {
        const it = prev.find((p) => p.id === id);
        if (!it || it.status !== "uploading") return prev;
        const inc = 6 + Math.random() * 14;
        const next = Math.min(100, it.progress + inc);
        const done = next >= 100;
        return prev.map((p) =>
          p.id === id
            ? {
                ...p,
                progress: next,
                status: done ? "done" : "uploading",
              }
            : p
        );
      });
    };
    const interval = window.setInterval(() => {
      setItems((prev) => {
        const it = prev.find((p) => p.id === id);
        if (!it || it.status === "done" || it.status === "error") {
          window.clearInterval(interval);
          return prev;
        }
        return prev;
      });
      tick();
    }, 220);
  }, []);

  // Cleanup object URLs on unmount.
  useEffect(() => {
    return () => {
      items.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function onPick(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  }

  function remove(id: string) {
    setItems((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  function retry(id: string) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "queued", progress: 0, errorMessage: undefined }
          : p
      )
    );
    simulateUpload(id);
  }

  function setPeriod(id: string, period: string) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, period } : p))
    );
  }

  const completedCount = items.filter((i) => i.status === "done").length;
  const uploadingCount = items.filter((i) => i.status === "uploading").length;
  const errorCount = items.filter((i) => i.status === "error").length;
  const allGood = items.length > 0 && completedCount === items.length;

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition",
          dragOver
            ? "border-brand-blue bg-brand-gradient-soft ring-4 ring-brand-blue/15"
            : "border-slate-300 bg-slate-50/60 hover:border-brand-blue/50 hover:bg-brand-gradient-soft/50 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-cyan-400/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          onChange={onPick}
          className="sr-only"
        />
        <span
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow transition",
            dragOver && "scale-110"
          )}
        >
          <Upload className="h-6 w-6" />
        </span>
        <div className="mt-4 text-base font-bold tracking-tight">
          Drag & drop pay stubs, bank statements, or proof of rent
        </div>
        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          or{" "}
          <span className="font-semibold text-brand-blue underline-offset-2 group-hover:underline">
            browse files
          </span>{" "}
          from your device · PDF, PNG, JPG · up to 12 MB each
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <Badge tone="brand">Encrypted at rest</Badge>
          <Badge tone="neutral">Reused across applications</Badge>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="rounded-2xl border border-slate-200/70 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <div>
              <div className="text-sm font-bold">
                {items.length} file{items.length === 1 ? "" : "s"}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {uploadingCount > 0
                  ? `${uploadingCount} uploading · ${completedCount} ready`
                  : errorCount > 0
                  ? `${errorCount} need attention · ${completedCount} ready`
                  : `${completedCount} ready to submit`}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                items.forEach(
                  (it) => it.preview && URL.revokeObjectURL(it.preview)
                );
                setItems([]);
              }}
            >
              Clear all
            </Button>
          </div>

          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((it) => (
              <FileRow
                key={it.id}
                item={it}
                periodOptions={periodOptions}
                onRemove={() => remove(it.id)}
                onRetry={() => retry(it.id)}
                onPeriodChange={(p) => setPeriod(it.id, p)}
              />
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
            <div className="mr-auto text-xs text-slate-500 dark:text-slate-400">
              Files are saved to your Documents library when uploaded.
            </div>
            <Button
              disabled={!allGood}
              onClick={() => onSubmit?.(items.filter((i) => i.status === "done"))}
            >
              <CheckCircle2 className="h-4 w-4" />
              {allGood
                ? `Submit ${completedCount} file${
                    completedCount === 1 ? "" : "s"
                  }`
                : uploadingCount > 0
                ? "Uploading…"
                : "Resolve errors to submit"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FileRow({
  item,
  periodOptions,
  onRemove,
  onRetry,
  onPeriodChange,
}: {
  item: UploadFile;
  periodOptions: { value: string; label: string }[];
  onRemove: () => void;
  onRetry: () => void;
  onPeriodChange: (period: string) => void;
}) {
  const isImage = !!item.preview;

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : item.file.type.startsWith("image/") ? (
          <ImageIcon className="h-5 w-5 text-slate-500" />
        ) : (
          <FileText className="h-5 w-5 text-brand-blue" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate text-sm font-semibold">{item.file.name}</div>
          <StatusChip status={item.status} />
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span>{item.size}</span>
          <span aria-hidden>·</span>
          <label className="inline-flex items-center gap-1.5">
            <span className="font-semibold uppercase tracking-wider">
              Tag
            </span>
            <select
              value={item.period ?? ""}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-slate-700 focus:border-brand-blue focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="">Untagged</option>
              {periodOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          {item.errorMessage ? (
            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="h-3 w-3" />
              {item.errorMessage}
            </span>
          ) : null}
        </div>

        {item.status === "uploading" || item.status === "queued" ? (
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full bg-brand-gradient transition-[width] duration-200"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {item.status === "error" ? (
          <button
            type="button"
            onClick={onRetry}
            aria-label="Retry"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove file"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
        >
          {item.status === "done" ? (
            <X className="h-4 w-4" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </li>
  );
}

function StatusChip({ status }: { status: UploadStatus }) {
  if (status === "uploading" || status === "queued")
    return (
      <Badge tone="info" className="normal-case">
        <Loader2 className="h-3 w-3 animate-spin" />
        Uploading
      </Badge>
    );
  if (status === "done")
    return (
      <Badge tone="success">
        <CheckCircle2 className="h-3 w-3" />
        Ready
      </Badge>
    );
  return (
    <Badge tone="danger">
      <AlertTriangle className="h-3 w-3" />
      Error
    </Badge>
  );
}

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
