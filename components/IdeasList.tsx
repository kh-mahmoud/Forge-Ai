'use client'

import { useEffect, useState } from 'react';
import useDataStore from '@/lib/store';
import { Loader2 } from 'lucide-react';
import { fields } from '@/types';
import { IdeasGenerator } from '@/lib/actions/ai.actions';

const IdeasList = () => {
  const { formData,UpdateFormData } = useDataStore(); 
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(formData.idea || null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await IdeasGenerator(formData);

        // Clean up any markdown code fences
        let raw = response?.data?.trim();
        if (raw?.startsWith("```")) {
          raw = raw.replace(/```(?:json)?/g, "").trim();
        }

        const parsed = raw && JSON.parse(raw);
        setIdeas(parsed.logoIdeas);
        UpdateFormData(fields.PROMPT,parsed.logoGenerationPrompt);
      } catch (error) {
        console.error("Error generating ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);


  const handleSelect = (idea: string) => {
    setSelectedIdea(idea);
    UpdateFormData(fields.IDEA,idea);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center my-10">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Generating ideas...</span>
      </div>
    );
  }
   

  return (
    <div className="my-6">
      {ideas && ideas.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {ideas.map((idea:string) => (
            <button
              key={idea}
              onClick={()=>handleSelect(idea)}
              className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer shadow-sm transition-all duration-200
                ${selectedIdea === idea
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'}
              `}
            >
              {idea}
            </button>
          ))}

          <button
            onClick={() => handleSelect("Let AI Select the best idea")}
            className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer shadow-sm transition-all duration-200
              ${selectedIdea === "Let AI Select the best idea"
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'}
            `}
          >
            Let AI Select the best idea
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No ideas generated.</p>
      )}
    </div>
  );
};

export default IdeasList;
