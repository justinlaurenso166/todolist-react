import { useEffect, useRef, useState } from "react";

export default function Header() {

    return (
        <div>
            <header className="bg-blue-500 lg:px-12 lg:py-8 px-5 py-6">
                <nav className="flex items-center justify-between">
                    <a href={"/todolist-react/"}>
                        <div className="text-white text-lg lg:text-2xl font-bold tracking-wider">Simple To Do List React</div>
                    </a>
                    <div className="flex gap-10 text-white font-semibold tracking-wide lg:text-lg text-md text-right">
                        <span>By Justin Laurenso</span>
                    </div>
                </nav>
            </header>
        </div>
    )
}