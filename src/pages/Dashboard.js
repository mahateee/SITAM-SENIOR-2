import React from "react";

export default function Dashboard() {
  return (
    <section class="bg-white overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <iframe
          title="Report Section"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/view?r=eyJrIjoiNjYzMjhjNDgtOTU3Yy00NzMxLWE0OWItOTgzZjNhODU1OTIyIiwidCI6ImI0NTNkOTFiLTZhYzEtNGI2MS1iOGI4LTVlNjVlNDIyMjMzZiIsImMiOjl9"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </section>
  );
}
