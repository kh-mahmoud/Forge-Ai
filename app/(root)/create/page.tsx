"use client";

import { useState } from "react";
import Stepper, { Step } from "@/components/Stepper";
import LogoTitle from "@/components/LogoTitle";
import LogoDesc from "@/components/LogoDesc";
import LogoPalettes from "@/components/LogoPalettes";
import LogoDesign from "@/components/LogoDesign";
import LogoIdea from "@/components/LogoIdea";
import useDataStore from "@/lib/store";
import { checkData } from "@/lib/utils";
import { toast } from "sonner";
import { LogoGenerator } from "@/lib/actions/ai.actions";

const Page = () => {
  const [step, setStep] = useState(1);
  const { formData } = useDataStore();

  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const handleSubmit = async () => {
    const response = checkData(formData);
    if (response && response.status === "error") {
      return toast.error(response.message);
    }

    setLoading(true);
    try {
      const result = await LogoGenerator(formData);
      if (result.status === "success" && result.image) {
        setLogoUrl(result?.image);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err: any) {
      toast.error("Error generating logo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        {!logoUrl && !loading && (
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10">
            <h1 className="text-2xl font-bold text-gray-800">
              AI Logo Generation Wizard
            </h1>
            <span className="text-sm font-medium text-gray-600">
              Step {step} of 5
            </span>
          </div>
        )}

        <div className="p-8">
          {/* Show Final Logo */}
          {logoUrl ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="p-4 bg-gray-50 border rounded-2xl shadow-inner">
                <img
                  src={logoUrl}
                  alt="Generated Logo"
                  className="w-72 h-72 object-contain rounded-xl"
                />
              </div>
              <a
                href={logoUrl}
                download="logo.png"
                className="px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-lg hover:bg-primary/90 transition-all"
              >
                Download Logo
              </a>
            </div>
          ) : loading ? (
            // Loader
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="relative">
                <div className="h-20 w-20 border-4 border-gray-200 rounded-full animate-spin border-t-primary"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">
                Generating your custom logo...
              </p>
              <p className="text-sm text-gray-400">
                This may take a few seconds 
              </p>
            </div>
          ) : (
            // Stepper
            <Stepper
              initialStep={step}
              //@ts-ignore
              onStepChange={(s) => setStep(s)}
              onFinalStepCompleted={handleSubmit}
              backButtonText="Previous"
              nextButtonText="Next"
            >
              <Step>
                <Suspense fallback={<div>Loading...</div>}>
                  <LogoTitle />
                </Suspense>
              </Step>
              <Step>
                <LogoDesc />
              </Step>
              <Step>
                <LogoPalettes />
              </Step>
              <Step>
                <LogoDesign />
              </Step>
              <Step>
                <LogoIdea />
              </Step>
            </Stepper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
