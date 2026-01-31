
import { getUserSession } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import CustomAvatar from "../ui/customAvatar";
import CustomAvatarSkeleton from "@/skeletons/customAvatarSkeleton";
interface SessionData {
  user: {
    name: string;
    email: string;
    image: string;
  };
} 
export default function AuthUserButton() {
  // use query to get the user session
  
  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["session"],
    queryFn: () => getUserSession(),
  });
  if (isLoading) return <div><CustomAvatarSkeleton/></div>;
  if (isError) return <div>Error: {isError}</div>;
  return <>
  <div>
    <CustomAvatar data={session as SessionData}/>
  </div>
  </>
}