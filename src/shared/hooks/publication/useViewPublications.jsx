import { useEffect, useState } from "react";
import { viewPublication } from "../../../services";

export const useViewPublications = () => {
  const [publications, setPublications] = useState([]);

  const getPublications = async () => {
    const response = await viewPublication();
    if (!response.error) {
      setPublications(response.data.publications);
    }
  };

  return { publications, getPublications };
};
