export default function constructImageUrl(url: string) {
  return `${import.meta.env.VITE_API_URL_STATIC}/${url}`;
}
