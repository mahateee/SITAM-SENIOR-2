import React from "react";

export default function Dashboard() {
  return (
    <section class="bg-white overflow-y-auto overflow-x-hidden flex justify-start items-center w-full md:inset-0 h-modal md:h-full ml-20">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <iframe
          title="Report Section"
          width="1400"
          height="750"
          src= "https://app.powerbi.com/view?r=eyJrIjoiZTJiYzFmODktZTRkMy00NzhlLWFkMDktZTFiNWYyYzI2YTA4IiwidCI6ImI0NTNkOTFiLTZhYzEtNGI2MS1iOGI4LTVlNjVlNDIyMjMzZiIsImMiOjl9&pageName=ReportSection07ace11da51e0c6b5d35"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </section>
  );
}
