import { BookOpen } from "lucide-react";

export default function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-700 text-white">
        <BookOpen aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-[#173b78]">
        learning<span className="text-brand-600">Edge</span>
      </span>
    </span>
  );
}
