import { useQuery, useQueryClient } from '@tanstack/react-query';

// the obvious way to implement accordion - use context, but in this case, on every update, all children will be re-rendered.
// main benefit of useQuery - we can use the select function, and you can see that only affected children are re-rendered

export function useAccordion(id) {
  const key = ['accordion']; // key could be passed via prop, and we can easily make reusable component
  const client = useQueryClient();
  const { data } = useQuery(key, () => ({}), {
    enabled: false,
    initialData: {},
    staleTime: Infinity,
    select: (data) => data[id],
  });
  const multi = false; // we could create option object and pass key and multi as options props, which also would be helpful for reusable component
  const toggleActiveAccordion = (id) => {
    client.setQueryData(['accordion'], (_data) => {
      return multi
        ? { ..._data, ...{ [id]: !_data[id] } }
        : { [id]: !_data[id] };
    });
  };
  return { isActiveAccordion: data, toggleActiveAccordion };
}
