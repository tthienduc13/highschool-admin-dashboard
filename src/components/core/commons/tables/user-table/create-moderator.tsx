import { useUserTableContext } from "@/stores/use-user-table-store";
import { IconRepeat, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generatePassword } from "@/utils/password";
import { useToast } from "@/hooks/use-toast";
import { useCreateUserMutation } from "@/api/user/query";
import { useUploadImageToCloudinary } from "@/api/external/cloudinary/upload-image.query";

export const CreateModerator = () => {
    const onCloseCreateModer = useUserTableContext((s) => s.onCloseCreateModer);
    const { toast } = useToast();
    const { mutate: createUser, isPending: isCreating } = useCreateUserMutation();
    const { mutateAsync: uploadImage } = useUploadImageToCloudinary();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

    const handleOnChangeSelectImage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = async (buffer: ArrayBuffer) => {
        const file = new File([new Blob([buffer])], "avatar.png", {
            type: "image/png",
        });

        try {
            return await uploadImage({ file });
        } catch (error) {
            console.error("Upload failed:", error);
            return "";
        }
    };

    const validationFields = () => {
        if (!username || !email || !password || !fullName) {
            return "Please fill all required fields"
        }

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            return "Invalid email format";
        }

        if (username.length < 3) {
            return "Username must be at least 3 characters";
        }

        if (fullName.length < 3) {
            return "Full name must be at least 3 characters";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
        }

        return "";
    }

    const handleCreateModerator = async () => {
        const error = validationFields();
        if (error !== "") {
            toast({
                title: "Some errors occurred",
                description: error,
                variant: "destructive",
            });
            return;
        }

        const urlImage = await handleUploadImage(
            thumbnailPreview as unknown as ArrayBuffer
        );

        createUser({
            user: {
                username,
                email,
                bio,
                fullName,
                password,
                profilePicture: urlImage
            }
        });

    }

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 450, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full w-[450px]  flex flex-col gap-4 "
        >
            <div className="bg-background rounded-lg p-4 flex justify-between flex-row items-center ">
                <h2 className=" font-bold">Add new moderator</h2>
                <div className="flex">
                    <Button
                        onClick={handleCreateModerator}
                        disabled={isCreating}
                    >
                        Save
                    </Button>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={onCloseCreateModer}
                    >
                        <IconX />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 rounded-lg p-4 bg-background overflow-y-auto">
                <div>
                    <Label className="text-sm font-semibold">
                        Username
                        {" "}
                        <span className="text-primary">
                            (required)
                        </span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="text-sm font-semibold">
                        Email
                        {" "}
                        <span className="text-primary">
                            (required)
                        </span>
                    </Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="text-sm font-semibold flex justify-between">
                        <div>
                            Password
                            {" "}
                            <span className="text-primary">
                                (required)
                            </span>
                        </div>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IconRepeat
                                        size={14} className="mr-2 cursor-pointer"
                                        onClick={() => setPassword(generatePassword())}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Generate Password</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="text-sm font-semibold">
                        Full name
                        {" "}
                        <span className="text-primary">
                            (required)
                        </span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="text-sm font-semibold">
                        Bio
                    </Label>
                    <Textarea
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="text-sm font-semibold">
                        Avatar
                    </Label>
                    <Input
                        type="file"
                        onChange={handleOnChangeSelectImage}
                        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {thumbnailPreview && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="mt-2 max-w-full h-auto"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
};
