import Link from "next/link";

import { Category } from "@/payload-types"

import { CustomCategory } from "../types";

interface Props {
    category: CustomCategory;
    isOpen: boolean;
    position: {
        top: number;
        left: number
    };
}

export const SubcategoryMenu = ({
    category,
    isOpen,
    position
}: Props) => {

    if (!isOpen || !category.subcategories || category.subcategories.length === 0)
        return null;

    const backgroundColor = category.color || "#F5F5F5";

    return (
        <div
            className="fixed z-10"
            style={{
                top: position.top,
                left: position.left
            }}
        >
            {/* Invisible Bridge to maintain hover */}
            <div className="h-3 w-60" />
            <div
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
                style={{ backgroundColor }}
            >
                <div className="">
                    {category.subcategories.map((sub: Category) => (
                        <Link
                            key={sub.slug}
                            href={`/${category.slug}/${sub.slug}`}
                            className="w-full text-left p-4 hover:bg-[rgba(100,0,0,1)] hover:text-white flex justify-between items-center font-medium"
                        >
                            {sub.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}