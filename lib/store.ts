import { create } from "zustand";
import { fields, Model } from "@/types";

// 1. Define the store shape
type DataStore = {
  formData: Record<fields, string >; // flexible form fields
  UpdateFormData: (field: fields, value: string | Model) => void;
};


const useDataStore = create<DataStore>((set) => ({
  formData: {
    title:"",
    desc:"",
    palette:"",
    model:"",
    idea:"",
    prompt:"",
  },
  UpdateFormData: (field, value) =>set((state) => ({formData: {...state.formData,[field]: value,}})),
}));

export default useDataStore;
