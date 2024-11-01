import { UserStatus } from "@/api/user/type";

interface StatusActionProps {
    status: UserStatus;
}

export const StatusAction = ({ status }: StatusActionProps) => {
    return <div>{StatusRender(status)}</div>;
};

const StatusRender = (status: UserStatus) => {
    switch (status) {
        case UserStatus.Active:
            return (
                <div className="px-3 py-1.5 font-medium w-fit rounded-md bg-emerald-500/10 text-emerald-500">
                    {status}
                </div>
            );

        case UserStatus.Pending:
            return (
                <div className="px-3 py-1.5 font-medium w-fit rounded-md bg-yellow-500/10 text-yellow-500">
                    {status}
                </div>
            );

        case UserStatus.Blocked:
            return (
                <div className="px-3 py-1.5 font-medium w-fit rounded-md bg-red-500/10 text-red-500">
                    {status}
                </div>
            );

        case UserStatus.Deleted:
            return (
                <div className="px-3 py-1.5 font-medium w-fit rounded-md bg-gray-500/10 text-gray-500">
                    {status}
                </div>
            );

        default:
            return null;
    }
};
