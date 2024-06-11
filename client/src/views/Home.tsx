import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { Heatmap } from "../components/Heatmap";
import { HeatmapType } from "../types/heatmap";

type fetchType = {
  id: number;
  data: string;
};

export function Home() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [heatmaps, setHeatmaps] = useState<HeatmapType[]>([]);

  function getHeatmaps() {
    fetch(`http://127.0.0.1:3000/api/heatmaps/${userContext?.user?.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userContext?.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data[0].heatmaps) {
          const array = heatmaps;
          (data[0].heatmaps as fetchType[]).forEach((item: fetchType) => {
            console.log(item);
            const map = JSON.parse(item.data) as unknown as HeatmapType;
            map.id = item.id;
            array.push(map);
          });

          setHeatmaps([]);
          setHeatmaps([...array]);
        }
      });
  }

  useEffect(() => {
    getHeatmaps();
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
    const formData = new FormData();
    formData.append("data", JSON.stringify(tmp_heatmaps[index]));
    formData.append("user_id", userContext?.user?.id as unknown as string);
    formData.append("name", tmp_heatmaps[index].title);

    fetch(`http://127.0.0.1:3000/api/heatmaps/${tmp_heatmaps[index].id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userContext?.user?.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setHeatmaps([]);
        setHeatmaps([...tmp_heatmaps]);
      } else {
        alert("server error");
      }
      return res.json();
    });
  }

  function createHeatmap(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("user_id", userContext?.user?.id as unknown as string);

    const new_heatmap: HeatmapType = {
      id: heatmaps.length + 1,
      title: formData.get("name") as string,
      data: [],
      last_updated: undefined,
    };

    for (let i = 0; i < 364; i++) {
      new_heatmap.data.push(false);
    }

    formData.append("data", JSON.stringify(new_heatmap));

    fetch("http://127.0.0.1:3000/api/heatmaps", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userContext?.user?.token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setHeatmaps([...heatmaps, new_heatmap]);
        } else if (res.status === 422) {
          alert("Validation Error");
        } else {
          alert("Server Error");
        }

        return res.json();
      })
      .then((data) => console.log(data));
  }

  function deleteHeatmap(heatmapData: HeatmapType) {
    fetch(`http://127.0.0.1:3000/api/heatmaps/${heatmapData.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userContext?.user?.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setHeatmaps(
          heatmaps.filter((heatmap) => heatmap.id !== heatmapData.id)
        );
      } else {
        alert("server error");
      }
    });
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center pt-24">
      {userContext?.user ? (
        <>
          {heatmaps.map((heatmap) => (
            <Heatmap
              key={heatmap.id}
              deleteFunc={deleteHeatmap}
              update={updateHeatmap}
              heatmap={heatmap}
            />
          ))}
          <form
            onSubmit={createHeatmap}
            className="flex items-center gap-4 justify-center mt-8"
          >
            <input
              type="text"
              placeholder="title"
              required
              name="name"
              className="p-2 text-white text-lg outline-none bg-transparent border-[1px] border-slate-200 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 pl-6 pr-6 hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Create Heatmap
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-white text-3xl">
            Log in or create account first ...
          </h1>
        </>
      )}
    </div>
  );
}
