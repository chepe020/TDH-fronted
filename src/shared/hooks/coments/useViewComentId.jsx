import { useEffect, useState } from "react";
import { viewCommentidpublication } from "../../../services";

export const useViewComentId = (id) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const getComments = async () => {
    setLoadingComments(true);
    const res = await viewCommentidpublication(id);

    if (!res?.error && res?.data?.success) {
      setComments(res.data.comments || []);
    } else {
      setComments([]);
    }

    setLoadingComments(false);
  };

  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [id]);

  return { comments, loadingComments };
}
