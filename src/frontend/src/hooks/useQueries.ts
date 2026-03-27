import { useQuery } from "@tanstack/react-query";
import type { BookTestSubmission, ContactSubmission } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllBookTestSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[bigint, BookTestSubmission]>>({
    queryKey: ["bookTests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookTestSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

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
