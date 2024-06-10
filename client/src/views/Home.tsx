import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { Heatmap } from "../components/Heatmap";
import { HeatmapType } from "../types/heatmap";

export function Home() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [heatmaps, setHeatmaps] = useState<HeatmapType[]>([]);

  const test_heatmap: HeatmapType = {
    id: 0,
    title: "",
    data: [],
    last_updated: undefined,
  };

  useEffect(() => {
    if (!userContext?.user) {
      navigate("/login");
    }

    for (let i = 0; i < 364; i++) {
      test_heatmap.data.push(false);
    }

    setHeatmaps([...heatmaps, test_heatmap]);
  }, [userContext?.user]);

  function updateHeatmap(heatmapData: HeatmapType) {
    const index = heatmaps.findIndex(
      (heatmap) => heatmap.id === heatmapData.id
    );

    const tmp_heatmaps = heatmaps;
    const mil_to_day = 1000 * 60 * 60 * 24;

    if (index !== -1) {
      if (tmp_heatmaps[index].last_updated === undefined) {
        tmp_heatmaps[index].last_updated = new Date();
        tmp_heatmaps[index].data[0] = true;
      } else {
        if (
          tmp_heatmaps[index].last_updated?.getDate() !==
            new Date().getDate() ||
          tmp_heatmaps[index].last_updated?.getMonth() !== new Date().getMonth()
        ) {
          const day_jump = Math.floor(
            new Date().getTime() / mil_to_day -
              //@ts-ignore
              tmp_heatmaps[index].last_updated?.getTime() / mil_to_day
          );

          let last_checked = 0;

          for (let i = 0; i < tmp_heatmaps[index].data.length - 1; i++) {
            if (tmp_heatmaps[index].data[i] === true) {
              last_checked = i;
            }
          }

          if (last_checked + 1 + day_jump >= tmp_heatmaps[index].data.length) {
            const new_weeks = Math.ceil(
              (last_checked + 1 + day_jump - 364) / 7
            );
            console.log(new_weeks);
            for (let i = 0; i < new_weeks * 7; i++) {
              tmp_heatmaps[index].data.push(false);
            }
          }

          last_checked = 0;

          for (let i = 0; i < tmp_heatmaps[index].data.length - 1; i++) {
            if (tmp_heatmaps[index].data[i] === true) {
              last_checked = i;
            }
          }

          tmp_heatmaps[index].data[last_checked + day_jump] = true;
          tmp_heatmaps[index].last_updated = new Date();
        }
      }
    }
    setHeatmaps([]);
    setHeatmaps([...tmp_heatmaps]);
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center pt-24">
      {heatmaps.map((heatmap) => (
        <Heatmap update={updateHeatmap} heatmap={heatmap} />
      ))}
      <form className="flex items-center gap-4 justify-center mt-8">
        <input
          type="text"
          placeholder="title"
          required
          className="p-2 text-white text-lg outline-none bg-transparent border-[1px] border-slate-200 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 pl-6 pr-6 hover:bg-blue-500 transition-colors cursor-pointer"
        >
          Create Heatmap
        </button>
      </form>
    </div>
  );
}
