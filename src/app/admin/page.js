import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  } else {
    if (!session.user.isAdmin) {
      return redirect("/");
    }
  }

  const posts = await Post.find({ approved: false });
  return (
    <div className="w-screen flex items-center justify-center gap-20 flex-col mt-12">
      <h1 className="text-7xl font-extrabold">
        Posts to Approve: {posts.length}
      </h1>
      {posts.map((item) => (
        <Link
          key={item.title}
          href={"/approve/post/" + item._id}
          className="border-4 rounded-md border-primary py-2 px-6"
        >
          <h2 className="text-5xl font-extrabold">{item.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default page;
