import { useState, useCallback } from "react";

type useAlert = {
  isVisible: boolean;
  topic: string;
  message: string;
};

type Show = (topic: string, message: string) => void;
type Hide = () => void;

const useAlert = (): [useAlert, Show, Hide] => {
  const [alertState, setAlert] = useState<useAlert>({
    isVisible: false,
    topic: "",
    message: "",
  });

  const ShowAlert = useCallback(
    (topic: string, message: string) => {
      setAlert({ isVisible: true, topic, message });
    },
    [setAlert]
  );

  const HideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  }, [setAlert]);

  return [alertState, ShowAlert, HideAlert];
};

export default useAlert;
