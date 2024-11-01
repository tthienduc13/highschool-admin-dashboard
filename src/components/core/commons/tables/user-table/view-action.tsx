import { useUserTableContext } from "@/stores/use-user-table-store";
import { IconInfoCircle } from "@tabler/icons-react";

interface ViewActionProps {
    email: string;
}

export const ViewAction = ({ email }: ViewActionProps) => {
    const onOpenUserInfo = useUserTableContext((s) => s.onOpenUserInfo);
    const setSelectedUser = useUserTableContext((s) => s.setSelectedUser);
    const onCloseUserInfo = useUserTableContext((s) => s.onCloseUserInfo);
    const selectedUser = useUserTableContext((s) => s.selectedUser);
    return (
        <IconInfoCircle
            size={18}
            onClick={() => {
                if (selectedUser === email) {
                    onCloseUserInfo();
                } else {
                    setSelectedUser(email);
                    onOpenUserInfo();
                }
            }}
        />
    );
};
