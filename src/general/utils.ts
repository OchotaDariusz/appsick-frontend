import { VisitObject } from "./type";

// visit helpers
export const isToday = (visit: VisitObject): boolean => {
  const visitDate =
    visit.date instanceof Date ? visit.date : new Date(visit.date as string);
  const now = new Date();

  return (
    visitDate.getFullYear() === now.getFullYear() &&
    visitDate.getMonth() === now.getMonth() &&
    visitDate.getDate() === now.getDate()
  );
};

export const formatVisitDate = (visit: VisitObject): VisitObject => {
  if (!(visit.date instanceof Date) && Array.isArray(visit.date)) {
    visit.date = [
      new Date((visit.date as string[])[0]).toLocaleDateString("pl-PL"),
      new Date((visit.date as string[])[1]).toLocaleTimeString("pl-PL"),
    ];
  }
  return visit;
};
