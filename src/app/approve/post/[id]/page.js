import { approvePost } from "@/actions/postAction";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.isAdmin) {
    return redirect("/");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  const post = await Post.findById(params.id);
  if (post.approved) {
    return redirect("/admin");
  }

  return (
    <div className="relative">
      <div className="h-[calc(100vh-5rem)] w-screen overflow-x-hidden pt-12">
        <div className="px-4 md:px-10 lg:px-24">
          <h1 className="text-7xl font-extrabold mb-8">{post.title}</h1>
          <div className="relative w-full h-[30rem] aspect-square rounded-lg overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <p className="absolute bottom-3 right-5 bg-text text-background py-2 px-6 rounded-md font-extralight">
              @<span className="font-extrabold">{post.user}</span>
            </p>
          </div>
          <p className="text-lg mb-12">{post.body}</p>
        </div>
      </div>

      <div className="absolute top-10 right-10 bg-background p-1 rounded-full">
        <form action={approvePost}>
          <input
            type="text"
            name="id"
            hidden
            className="hidden"
            value={post._id}
            readOnly
          />
          <button>
            <FaCheckCircle className="text-6xl text-accent" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
