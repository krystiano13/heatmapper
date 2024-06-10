import { HeatmapType } from "../types/heatmap";

interface Props {
  heatmap: HeatmapType;
  update: (heatmapData: HeatmapType) => void;
}

export const Heatmap: React.FC<Props> = ({ heatmap, update }) => {
  return (
    <section
      id={heatmap.id.toString()}
      className="heatmap max-w-[95%] bg-slate-950 bg-opacity-25 p-5 rounded-md"
    >
      <h2 className="text-white text-lg font-semibold">{heatmap.title}</h2>
      <div className="heatmap-grid gap-0.5 md:gap-1 mt-2">
        {heatmap.data.map((el) => (
          <div
            className={`w-1 md:w-3 h-1 md:h-3 ${
              el === true ? "bg-blue-500" : "bg-blue-950"
            }`}
          ></div>
        ))}
      </div>
      <button
        onClick={() => update(heatmap)}
        className="mt-4 bg-blue-600 text-white p-2 pl-6 pr-6 hover:bg-blue-500 transition-colors cursor-pointer"
      >
        Update Heatmap
      </button>
    </section>
  );
};
