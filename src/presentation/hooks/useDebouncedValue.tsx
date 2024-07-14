import { useEffect, useState } from "react";

interface Props {
  input: string;
  delay?: number;
}

export const useDebouncedValue = ({input, delay = 500}: Props) => {
  const [debouncedValue, setDebouncedValue] = useState(input);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
    
  }, [input]);
  return debouncedValue;
};