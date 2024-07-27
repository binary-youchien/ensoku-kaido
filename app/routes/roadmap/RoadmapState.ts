import {RoadmapRes} from "~/client/roadmapClient";
import {RoadmapUpdater} from "~/routes/roadmap/RoadmapUpdater";
import {useMemo, useState} from "react";

export interface RoadmapState {
  roadmapRes: RoadmapRes
  updater: RoadmapUpdater
}

export function useRoadmapState(def: RoadmapRes): RoadmapState {
  const [res, setRes] = useState(def)

  return useMemo(() => {
    return {
      roadmapRes: res,
      updater: new RoadmapUpdater(setRes)
    }
  }, [res]);
}