import { useQuery } from "@tanstack/react-query";
import type { ContactSubmission } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[bigint, ContactSubmission]>>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}
