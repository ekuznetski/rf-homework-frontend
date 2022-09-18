import { getTestSuitsRequest } from '../services/request';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const key = ['test-suits'];

export function useTestSuitsQuery() {
  return useQuery(key, () => getTestSuitsRequest().then((e) => e), {
    staleTime: Infinity,
  });
}

export function useTestSuitsMutation() {
  const client = useQueryClient();

  function mutation(data) {
    client.setQueryData(key, (oldData) =>
      oldData.map((e) => {
        if (e.id === data.id) {
          return data;
        }
        return e;
      })
    );
  }

  return { mutation }; // here i mock useMutation hook which return mutateFn
}
