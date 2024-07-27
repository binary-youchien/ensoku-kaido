export async function getNodes(roadmapId: string) {
  console.log(`Fetching nodes for roadmapId---------------------------------: ${roadmapId}`);
  return new FetchBuilder(`/roadmap/${roadmapId}/node`)
    .method(HTTPMethod.GET)
    .fetch<PostNodeBody[]>();
}