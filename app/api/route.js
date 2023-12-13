export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get("searchQuery");
  const page = searchParams.get("page");

  let res = null;

  if (searchQuery) {
    res = await fetch(
      `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=16&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.API_KEY,
        },
      }
    );
  } else {
    res = await fetch(
      `https://api.pexels.com/v1/curated?per_page=16&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.API_KEY,
        },
      }
    );
  }

  const data = await res.json();

  return Response.json(data);
}

// https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}&page=${page}
