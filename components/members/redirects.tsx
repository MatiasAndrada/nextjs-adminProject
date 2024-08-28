import Link from "next/link";
import { Button } from "../ui/button";
import {
  PencilIcon,
  UserPlusIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export function EditMember({
  user_id,
  project_id,
  children,
}: {
  user_id: string;
  project_id: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href={`/dashboard/members/edit/${user_id}/${project_id}`}>
      <Button variant="icon">
        <PencilIcon className="h-5 w-5" />
        {children}
      </Button>
    </Link>
  );
}
export function AddMember() {
  return (
    <Link href="/dashboard/members/add">
      <Button>
        <UserPlusIcon className="h-5 mr-2" />
        <span>Add member</span>
      </Button>
    </Link>
  );
}

export function InformationRole() {
  return (
    <Link href="/dashboard/members/info">
      <Button variant="info">
        <InformationCircleIcon className="h-5 mr-2" />
        <span className="hidden md:block">About permissions in roles</span>{" "}
      </Button>
    </Link>
  );
}
