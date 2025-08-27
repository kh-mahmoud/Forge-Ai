"use client";

import { useState } from "react";
import Heading from "./Heading";
import { palettes } from "@/Constants";
import { fields } from "@/types";
import useDataStore from "@/lib/store";

const LogoPalettes = () => {
  const selectedPalette = useDataStore((state) => state.formData.palette);
  const UpdateFormData = useDataStore((state) => state.UpdateFormData);

  const [selected, setSelected] = useState<string | null>(selectedPalette || null);

  return (
    <div className="step-wrapper ">
      {/* Modern Heading */}
      <Heading
        title="Choose Your Color Palette"
        description="Select a palette that best represents your brand’s style and identity. This will guide the overall mood of your logo design."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {palettes.map((palette) => (
          <div
            key={palette.name}
            onClick={() => {
              setSelected(palette.name);
              UpdateFormData(fields.PALETTE, palette.name);
            }}
            className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 p-4 shadow-sm
              ${
                selected === palette.name
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-200 hover:border-gray-400"
              }`}
          >
            {/* Palette name */}
            <p className="font-semibold text-gray-800 mb-3 text-center">
              {palette.name}
            </p>

            {/* Colors preview */}
            <div className="flex gap-2 justify-center">
              {palette.colors.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-md border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoPalettes;
