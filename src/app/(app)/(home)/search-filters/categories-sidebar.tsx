"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CustomCategory } from "../types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]; // TODO: Remove This Later
}

export const CategoriesSidebar = ({
    onOpenChange,
    open,
    data
}: Props) => {
    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    }

    // If we have parent category , show those, otherwise show root categories
    const currentCategories = parentCategories ?? data ?? [];

    const handleCategoryClick = (category: CustomCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CustomCategory[]);
            setSelectedCategory(category);
        } else {
            // This is a leaf category (no subcategories)
            if (parentCategories && selectedCategory)
                // This is a subcategory -> navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            else {
                // This is a main category
                if (category.slug == "all")
                    router.push("/");
                else
                    router.push(`/${category.slug}`)
            }
            handleOpenChange(false);
        }
    }

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    return (
        <Sheet
            open={open}
            onOpenChange={handleOpenChange}
        >
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                        >
                            <ChevronLeft className="size-4 mr-2" />
                            Back
                        </button>
                    )}
                    {currentCategories.map(cat => (
                        <button
                            key={cat.slug}
                            onClick={() => handleCategoryClick(cat)}
                            className="w-full text-left p-4 hover:bg-[rgba(100,0,0,1)] hover:text-white flex items-center text-base font-medium cursor-pointer justify-between"
                        >
                            {cat.name}
                            {cat.subcategories && cat.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4 mr-2" />
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}