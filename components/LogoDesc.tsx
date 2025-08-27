"use client";

import Heading from "./Heading";
import CustomInput from "./CustomInput";
import { fields, handleChange } from "@/types";
import useDataStore from "@/lib/store";

const LogoDesc = () => {

const desc = useDataStore((state) => state.formData.desc);
const UpdateFormData = useDataStore((state) => state.UpdateFormData);

  return (
    <div className="step-wrapper">
      {/* Heading */}
      <Heading
        title="Describe Your Logo Vision"
        description="Describe your brand’s vision, vibe, or key message. This helps craft a logo that truly reflects your identity."
      />

      {/* Input Field */}
      <div className="max-w-xl">
        <CustomInput
          classes="!h-12"
          value={desc || ""}
          setValue={(val: string) => UpdateFormData(fields.DESC, val)}
          placeholder="e.g. A sleek tech logo with futuristic vibes"
        />
      </div>
    </div>
  );
};

export default LogoDesc;
