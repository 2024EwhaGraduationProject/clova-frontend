import { postSearch } from "@api/postSearch";
import { useMutation } from "react-query";

export function usePostSearch() {
  return useMutation(postSearch, {
    onSuccess: (data) => {
      console.log("검색 성공", data);
    },
    onError: (error) => {
      console.log("검색 실패", error);
    },
  });
}
