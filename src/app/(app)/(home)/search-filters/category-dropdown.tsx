"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoriesGetManyOutput } from "@/modules/types";

import { useDropdownPsoition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
    category: CategoriesGetManyOutput[1];
    isActive?: boolean;
    isNavigationHover?: boolean;
}

export const CategoryDropdown = ({
    category,
    isActive,
    isNavigationHover
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { getDropdownPosition } = useDropdownPsoition(dropdownRef);
    const dropdownPosition = getDropdownPosition();

    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true);
        }
    }

    const onMouseLeave = () => setIsOpen(false);

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="relative">
                <Button
                    variant="elevated"
                    className={cn(
                        "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActive && !isNavigationHover && "bg-white border-primary",
                        isOpen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    )}
                >
                    <Link
                        href={`/${category.slug === "all" ? "" : category.slug}`}
                    >
                        {category.name}
                    </Link>
                </Button>
                {category.subcategories && category.subcategories.length > 0 && (
                    <div className={cn(
                        "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                        isOpen && "opacity-100"
                    )}
                    />
                )}
            </div>

            <SubcategoryMenu
                category={category}
                isOpen={isOpen}
                position={dropdownPosition}
            />
        </div>
    )
}