"use client";

import { useSearchParams } from "next/navigation";
import Heading from "./Heading";
import { useEffect } from "react";
import CustomInput from "./CustomInput";
import { fields } from "@/types";
import useDataStore from "@/lib/store";

const LogoTitle = () => {
  const searchParams = useSearchParams();
  const title = useDataStore((state) => state.formData.title);
  const UpdateFormData = useDataStore((state) => state.UpdateFormData);

  useEffect(() => {
    if (!title) {
      const initial = searchParams.get("title") || "";
      UpdateFormData(fields.TITLE, initial);
    }
    // ✅ only depend on `title`, `searchParams`, and `UpdateFormData`
  }, [title, searchParams, UpdateFormData]);

  return (
    <div className="step-wrapper ">
      <Heading
        title="Your Brand Name"
        description="This will be the foundation of your logo. Keep it short and memorable."
      />

      <div className="max-w-xl">
        <CustomInput
          classes="h-12"
          placeholder="e.g. NovaTech"
          value={title || ""}
          setValue={(val: string) => UpdateFormData(fields.TITLE, val)}
        />
      </div>
    </div>
  );
};

export default LogoTitle;
