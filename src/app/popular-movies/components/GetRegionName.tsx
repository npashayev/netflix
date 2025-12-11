"use client";
import { getRegionName } from "@/lib/utils/regionName";

export function GetRegionName({ code }: { code: string }) {
    return <>in {getRegionName(code)}</>;
}
