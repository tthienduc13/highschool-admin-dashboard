"use server";

import constants from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    (await cookies()).delete(constants.ACCESS_TOKEN);

    redirect("/sign-in");
}
