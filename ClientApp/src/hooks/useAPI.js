import { useEffect } from "react";

const useAPI = (promise, apply = (data) => data) => {
  useEffect(() => {
    promise
      // Get data from response
      .then((res) => {
        const data = res.data;
        apply(data);
      })
      // Catch error
      .catch((err) => alert(err.response.data.error));
    // Deps
  }, [apply, promise]);
};

export default useAPI;
