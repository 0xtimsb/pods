import { intersectionBy, unionBy } from "lodash";

interface paginatedData {
  result: any[];
  hasMore: boolean;
}

export const pagination = (
  existing: paginatedData,
  incoming: paginatedData
) => {
  if (!existing) {
    return incoming;
  } else {
    return {
      result: [...incoming.result, ...existing.result],
      hasMore: incoming.hasMore,
    };
  }
};
