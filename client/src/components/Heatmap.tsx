interface Props {
  heatmap: boolean[][];
}

export const Heatmap: React.FC<Props> = ({ heatmap }) => {
  return (
    <section className="heatmap max-w-[95%] bg-slate-950 bg-opacity-25 p-5 rounded-md">
      <h2 className="text-white text-lg font-semibold">Heatmap Title</h2>
      <div className="flex items-center gap-0.5 md:gap-1 mt-2">
        {heatmap.map((item) => (
          <div className="flex flex-col gap-0.5 md:gap-1">
            {item.map((el) => (
              <div
                className={`w-1 md:w-3 h-1 md:h-3 ${
                  el ? "bg-blue-500" : "bg-blue-950"
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
