import { useState, useEffect } from "react";
import dayjs from "dayjs";
import API from "../api/apiconfig";

const ContributionGraph = ({ darkMode }) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await API.get("/api/entries/contributions");
        setActivity(res.data);
      } catch (err) {
        console.error("Failed to fetch activity:", err);
      }
    };
    fetchActivity();
  }, []);

  const activityMap = {};
  activity.forEach((a) => {
    activityMap[a.date] = a.count;
  });

  const today = dayjs();
  const daysArray = [];
  for (let i = 0; i < 365; i++) {
    const date = today.subtract(i, "day").format("YYYY-MM-DD");
    daysArray.push({
      date,
      count: activityMap[date] || 0,
    });
  }
  daysArray.reverse();

  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  const getColor = (count) => {
    if (count === 0) return darkMode ? "bg-gray-700" : "bg-gray-200";
    if (count <= 1) return "bg-green-200";
    if (count <= 3) return "bg-green-400";
    if (count <= 5) return "bg-green-600";
    return "bg-green-800";
  };

  return (
    <div className="mt-8 w-full">
      <h2
        className={`text-lg font-semibold mb-3 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Your Activity
      </h2>

      <div className="overflow-x-auto">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  title={`${day.date}: ${day.count} entries`}
                  className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-sm ${getColor(
                    day.count
                  )}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Each square represents a day. Darker = more entries.
      </p>
    </div>
  );
};

export default ContributionGraph;
