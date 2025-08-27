"use client";

import { useState } from "react";
import Heading from "./Heading";
import Image from "next/image";
import { fields } from "@/types";
import { LogoModels } from "@/Constants";
import useDataStore from "@/lib/store";

const LogoDesign = () => {
  const model = useDataStore((state) => state.formData.model);
  const UpdateFormData = useDataStore((state) => state.UpdateFormData);
  const [selectedModel, setSelectedModel] = useState<string>(model);

  return (
    <div className="step-wrapper">
      {/* Section Heading */}
      <Heading
        title="Choose Your Logo Style"
        description="Pick the design style that matches your brand identity to generate your unique logo."
      />

      {/* Models Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {LogoModels.map((model) => (
          <div
            key={model.title}
            onClick={() => {
              setSelectedModel(model.title);
              UpdateFormData(fields.MODEL, model.title);
            }}
            className={`cursor-pointer rounded-2xl border overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col ${
              selectedModel === model.title
                ? "border-primary border-2 "
                : "border-gray-200"
            }`}
          >
            {/* Image container */}
            <div className="relative w-full aspect-square">
              <Image
                src={model.image}
                alt={model.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <div
              className={`text-center py-3 text-sm font-medium ${
                selectedModel === model.title
                  ? "text-primary"
                  : "text-gray-700 group-hover:text-gray-900"
              }`}
            >
              {model.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDesign;
