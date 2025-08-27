"use client";

import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        <span className="text-primary">{title}</span>
      </h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default Heading;
