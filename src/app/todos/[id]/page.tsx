import { z } from "zod";

const contextSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

const todoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export default async function Page(_context: unknown) {
  const { params } = contextSchema.parse(_context);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.id}`,
  );
  const json = (await response.json()) as unknown;
  const todo = todoSchema.parse(json);

  return <div>{todo.title}</div>;
}
