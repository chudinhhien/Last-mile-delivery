import { useState } from "react";

export function useNotificationState() {
  const [state, setState] = useState({
    open: false,
    notifications: undefined,
    numUnRead: 0,
    hasMore: false,
  });

  return [state, setState];
}
