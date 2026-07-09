"use client"
import dynamic from "next/dynamic";

const Rfcanvas = dynamic(()=> import("@/components/reactflow/chat-canvas"),{
    ssr:false,
    loading:()=> <div className="h-dvh w-full bg-background">Loading</div>
})

export default function ChatCanvas () {
    return(
        <div className="h-dvh w-full">
            <Rfcanvas/>
        </div>
    )
}
