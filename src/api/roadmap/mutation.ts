import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { createRoadmap, createRoadmapDetail } from "./api";

export const useCreateRoadmapMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ["create-roadmap"],
        mutationFn: createRoadmap,
        onSuccess: (data) => {
            router.push(`/roadmap-management/create?id=${data.data}`);
            return data;
        },
        onError: (error) => {
            return error;
        },
    });
};

export const useCreateRoadmapDetailMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ["create-roadmap-detail"],
        mutationFn: createRoadmapDetail,
        onSuccess: (data) => {
            router.push("/roadmap-management/roadmaps");

            return data;
        },
    });
};
