import { useSearch } from "../../hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export default function SearchBar() {
  const { getSearchSuggestions } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>();
  const { data: suggestions } = useQuery({
    queryKey: ["searchSuggestions", searchQuery],
    queryFn: () => getSearchSuggestions(searchQuery || ""),
    enabled: !!searchQuery,
  });
  const viewProduct = (id: string) => {
    if (searchQuery) {
      navigate(`/view-product/${id}`);
    }
  };
  const handleSearch = () => {
    if (!searchQuery) return;
    searchParams.set("query", searchQuery);
    setSearchParams(searchParams);
    if (!location.pathname.startsWith("/search")) {
      navigate(`/search/?query=${searchQuery}`);
    }
  };
  return (
    <div className="flex w-full items-center gap-4">
      <div className="relative w-full">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          className="!border-none"
          onPressEnter={() => handleSearch()}
          placeholder="Search for products"
          autoComplete={suggestions?.length ? "on" : "off"}
        />
        {suggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-50"
                onClick={() => {
                  viewProduct(suggestion._id);
                }}>
                <div className="text-sm text-gray-900">{suggestion.name}</div>
                <div className="text-xs text-gray-500">
                  SKU: {suggestion.sku}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Button
          icon={<Search size={16} />}
          type="primary"
          className="!rounded-full">
          Search
        </Button>
      </div>
    </div>
  );
}
