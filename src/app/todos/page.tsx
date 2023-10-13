import { z } from "zod";

type Context = {
  params: {};
  searchParams: {
    nof: number;
  };
};
const contextSchema = z.object({
  params: z.object({}),
  searchParams: z
    .object({
      nof: z.coerce.number().optional(),
    })
    .optional(),
});

export default async function Page(_context: unknown) {
  const { searchParams } = contextSchema.parse(_context);

  const nof = searchParams?.nof ?? 10;
  const promises = Array(nof)
    .fill(0)
    .map(async (_, i) => {
      return await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
    });

  const responses = await Promise.all(promises);
  const jsons = await Promise.all(
    responses.map(async (response) => await response.json()),
  );

  return (
    <div>
      {jsons.map((json) => {
        return <p>{json.title}</p>;
      })}
    </div>
  );
}
