"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "./QueryParmas";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Props {
    searchKey?: string;
    filterKey?: string;
    sortKey?: string;
    filterOptions?: { label: string; value: string }[];
}

const TableQueryController = ({
    searchKey,
    filterKey,
    sortKey,
    filterOptions = [],
}: Props) => {
    const { searchParams, updateParams } = useQueryParams();

    return (
        <Card className="p-2">
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
                                onValueChange={(value) => updateParams(filterKey, value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
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
                                onValueChange={(value) => updateParams(sortKey, value)}
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
                </div>
            </div>
        </Card>
    );
};

export default TableQueryController;