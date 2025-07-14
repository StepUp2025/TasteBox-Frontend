export function paginate<T>(
  data: T[],
  request: Request,
  defaultLimit = 20,
): { contents: T[]; page: number; totalPages: number } {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? defaultLimit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const contents = data.slice(start, end);
  const totalPages = Math.ceil(data.length / limit);

  return {
    contents,
    page,
    totalPages,
  };
}
