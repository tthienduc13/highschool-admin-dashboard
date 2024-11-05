"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const NewChapter = () => {
    const [chapterName, setChapterName] = useState("");
    const [chapterMaterial, setChapterMaterial] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chapterName.trim() === "") {
            setError("Chapter name is required");
            return;
        }
        console.log("Submitted:", { chapterName, chapterMaterial });
        setChapterName("");
        setChapterMaterial("");
        setError("");
    };

    return (
        <div className="w-full ">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded-lg border shadow px-4 py-3 space-y-4"
            >
                <h2 className="text-lg font-semibold">New chapter</h2>

                <div className="space-y-2">
                    <Label htmlFor="chapterName">Chapter name:</Label>
                    <Input
                        id="chapterName"
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                        required
                        aria-required="true"
                        aria-invalid={error ? "true" : "false"}
                    />
                    {error && (
                        <p className="text-sm text-red-500" role="alert">
                            {error}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="chapterMaterial">Chapter material:</Label>
                    <Textarea
                        id="chapterMaterial"
                        value={chapterMaterial}
                        onChange={(e) => setChapterMaterial(e.target.value)}
                        rows={2}
                    />
                </div>
                <div className="w-full flex justify-end">
                    <Button type="submit" className=" w-fit ">
                        Save change
                    </Button>
                </div>
            </form>
        </div>
    );
};
