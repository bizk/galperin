import type { SearchTaskStatus } from "@galperin/shared";
import type { ReactNode } from "react";

type StatusBadgeProperties = {
  readonly status: SearchTaskStatus;
};

export function StatusBadge(properties: StatusBadgeProperties): ReactNode {
  return <span className={`status status-${properties.status}`}>{properties.status}</span>;
}
