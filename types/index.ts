

export type handleChange = (value: string) => void 

export type CustomInputProps = {
  placeholder: string;
  classes?: string;
  value: string;
  setValue: (value: string) => void,
}

export type Model = {
  title:string,
  image:string,
  prompt:string
}

export enum fields  {
  TITLE = "title",
  DESC = "desc",
  PALETTE='palette',
  MODEL = 'model',
  IDEA = 'idea',
  PROMPT = 'prompt',
}

export type FormData =Record<fields, string >; 


