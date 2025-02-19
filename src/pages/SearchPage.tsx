import SearchBar from "../components/SearchBar";
import SearchItem from "../components/search/SearchItem";
import { useSearch } from "../hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import { Button, Image } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { searchProducts } = useSearch();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || "",
  );
  const { data: searchResults } = useQuery({
    queryKey: ["searchResults", searchQuery, searchParams],
    queryFn: async () => {
      return await searchProducts(searchQuery || "");
    },
    enabled: !!searchQuery,
  });
  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);
  return (
    <div className="space-y-10">
      <div className="text-3xl font-bold tracking-wider">
        <Link to={"/"}>PRODUCTS</Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SearchBar />
        <div className="flex items-center justify-end gap-4">
          <Button
            href="/add-product"
            type="primary"
            size="large"
            className="!rounded-md">
            New Product
          </Button>
          <Button
            href="/favorites"
            type="default"
            size="large"
            className="!rounded-md">
            <Image preview={false} src="/starred.svg" />
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-ecommerce-gray text-xl font-medium">
          {searchResults && searchResults?.length > 0
            ? `${searchResults?.length} results found for "${searchQuery}"`
            : "No results found"}
        </h2>
        <div className="my-10 space-y-4">
          {searchResults?.map((product) => (
            <SearchItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
