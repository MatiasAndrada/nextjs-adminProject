import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownChangeRole from "@/components/members/dropdown-change-role";
import { DeleteMember } from "@/components/members/buttons";
import { Role } from "@prisma/client";

interface Props {
  userOnProject:
    | {
        user: {
          id: string;
          email: string;
          name: string | null;
          image: string | null;
        };
        id: string;
        role: Role;
        project_id: string;
      }
    | {
        error: string;
      };
}

export default function EditRole({ userOnProject }: Props) {
  if ("error" in userOnProject) {
    return (
      <div className="w-full space-y-4 rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6">
        <h2 className="text-xl font-medium">Member</h2>
        <h3 className="text-red-500">{userOnProject.error}</h3>
      </div>
    );
  }
  return (
    <div className="w-full space-y-4 rounded-md bg-slate-300 dark:bg-slate-900 p-4 md:p-6">
      <h2 className="text-xl font-medium">Member</h2>
      <div className="flex wrap gap-4">
        <Avatar className="h-14 w-14">
          {userOnProject.user.image ? (
            <AvatarImage src={userOnProject.user.image} alt="Icon user" />
          ) : (
            <AvatarFallback>
              {userOnProject.user.name?.split(" ").map((n) => n[0])}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-xl font-medium">{userOnProject.user.name}</h2>
          <p className="text-gray-300">{userOnProject.user.email}</p>
        </div>
      </div>
      <h2 className="text-xl font-medium">Actions</h2>
      {userOnProject.role === Role.OWNER ? (
        <h3 className="text-red-500">
          You can&apos;t change the role of the owner.
        </h3>
      ) : (
        <div className="flex items-center justify-evenly">
          <div className="flex gap-4 items-center">
            <h3 className="text-lg font-medium">Change role:</h3>
            <DropdownChangeRole
              userProjectId={userOnProject.id}
              role={userOnProject.role}
            />
          </div>
          <h2>OR</h2>
          <div>
            <DeleteMember
              redirect="/dashboard/members"
              UserOnProjectId={userOnProject.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
