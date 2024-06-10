import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { Heatmap } from "../components/Heatmap";

export function Home() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [heatmap, setHeatmap] = useState<boolean[][]>([]);

  const test_heatmap: boolean[][] = [];

  useEffect(() => {
    if (!userContext?.user) {
      navigate("/login");
    }

    for (let i = 0; i < 52; i++) {
      const week_heatmap = [];
      for (let j = 0; j < 7; j++) {
        week_heatmap.push(false);
      }

      test_heatmap.push(week_heatmap);
    }

    console.log(test_heatmap);

    setHeatmap(test_heatmap);
  }, [userContext?.user]);

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center pt-24">
      <Heatmap heatmap={heatmap} />
      <button className="mt-4">Create Heatmap</button>
    </div>
  );
}
