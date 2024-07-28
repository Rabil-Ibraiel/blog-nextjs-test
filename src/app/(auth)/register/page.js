import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/forms/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async() => {
    const session = await getServerSession(authOptions)

    if (session){
        return redirect('/')
    }
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
