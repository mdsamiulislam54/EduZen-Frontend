"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "./QueryParmas";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";


interface Props {
    searchKey?: string;
    filterKey?: string;
    sortKey?: string;
    sortField?: string;
    filterOptions?: { label: string; value: string }[];
}

const TableQueryController = ({
    searchKey,
    filterKey,
    sortKey,
    sortField,
    filterOptions = [],
}: Props) => {
    const { searchParams, updateParams } = useQueryParams();
    const router = useRouter()
    const clearParams = () => {
        const url = new URL(window.location.href);
        url.search = "";
        window.history.pushState({}, "", url.toString());
        router.push(url.pathname)
    };

    const hasQuery = searchParams.toString().length > 0;

    return (
        <Card className="p-2 mb-4">
            <div className="sm:flex justify-between items-center sm:space-y-0 space-y-4">

                <div>
                    {searchKey && (
                        <Input
                            placeholder="Search..."
                            defaultValue={searchParams.get(searchKey) ?? ""}
                            onChange={(e) => updateParams(searchKey, e.target.value)}
                        />
                    )}
                </div>

                <div className="flex gap-4 max-sm:justify-between">
                    {filterKey && filterOptions.length > 0 && (
                        <div className="flex items-center gap-2">

                            {/* icon */}
                            <Filter className="w-4 h-4 text-muted-foreground" />

                            <Select
                                defaultValue={searchParams.get(filterKey) ?? ""}
                                onValueChange={(value) => {

                                    if (value === "all") {
                                        updateParams("filter", "")
                                    } else {
                                        updateParams("filter", `${filterKey}:${value}`)
                                    }
                                }}

                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {filterOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {sortKey && (
                        <div className="flex items-center gap-2">

                            {/* icon */}
                            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />

                            <Select
                                defaultValue={searchParams.get(sortKey) ?? ""}
                                onValueChange={(value) => {
                                    updateParams(sortKey, value)
                                }}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="asc">Ascending</SelectItem>
                                    <SelectItem value="desc">Descending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {hasQuery && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={clearParams}
                            className="flex items-center gap-1"
                        >
                            <X size={14} />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </Card >
    );
};

export default TableQueryController;