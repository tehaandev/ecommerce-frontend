import constructImageUrl from "./constructImageUrl";

export default function getThumbnailUrl(
  image: { _id: string; imageUri: string }[],
  thumbnailId: string,
) {
  const thumbnail = image.find((img) => img._id === thumbnailId);
  if (!thumbnail) {
    return `placeholder.jpg`;
  }
  return constructImageUrl(thumbnail.imageUri);
}
