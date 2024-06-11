import { HeatmapType } from "../types/heatmap";
import { useRef } from "react";

interface Props {
  heatmap: HeatmapType;
  update: (heatmapData: HeatmapType) => void;
  deleteFunc: (heatmapData: HeatmapType) => void;
}

export const Heatmap: React.FC<Props> = ({ heatmap, update, deleteFunc }) => {
  const heatmapRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id={heatmap.id.toString()}
      className="heatmap max-w-[95%] bg-slate-950 bg-opacity-25 p-5 rounded-md"
    >
      <h2 className="text-white text-lg font-semibold">{heatmap.title}</h2>
      <div
        ref={heatmapRef}
        className="md:max-w-[42rem] lg:md:max-w-[56rem] overflow-x-auto heatmap-grid gap-0.5 md:gap-1 mt-2"
      >
        {heatmap.data.map((el) => (
          <div
            className={`w-1 md:w-3 h-1 md:h-3 ${
              el === true ? "bg-blue-500" : "bg-blue-950"
            }`}
          ></div>
        ))}
      </div>
      <button
        onClick={() => {
          update(heatmap);
          heatmapRef.current?.scrollTo(heatmapRef.current.scrollWidth, 0);
        }}
        className="mt-4 text-xs md:text-base bg-blue-600 text-white p-2 pl-6 pr-6 hover:bg-blue-500 transition-colors cursor-pointer"
      >
        Update Heatmap
      </button>
      <button
        onClick={() => {
          deleteFunc(heatmap);
        }}
        className="mt-4 ml-2 md:ml-4 text-xs md:text-base bg-red-600 text-white p-2 pl-6 pr-6 hover:bg-red-500 transition-colors cursor-pointer"
      >
        Delete Heatmap
      </button>
    </section>
  );
};
