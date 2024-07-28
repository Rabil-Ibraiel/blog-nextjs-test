import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/forms/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async() => {
    const session = await getServerSession(authOptions)

    if (session) {
        return redirect('/')
    }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
