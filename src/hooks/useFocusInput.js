import React from "react";

export default function useFocusInput() {
  const inputRef = React.useRef(null);

  React.useLayoutEffect(() => {
    (inputRef.current).focus();
  }, []);

  return inputRef;
}
