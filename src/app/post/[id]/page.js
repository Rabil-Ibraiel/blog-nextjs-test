import Post from "@/models/Post";
import mongoose from "mongoose";
import Image from "next/image";

const page = async ({ params }) => {
  await mongoose.connect(process.env.MONGODB_URI);
  const post = await Post.findById(params.id);
  return (
    <div className="h-[calc(100vh-5rem)] w-screen overflow-x-hidden pt-12">
      <div className="px-4 md:px-10 lg:px-24">
        <h1 className="lg:text-7xl md:text-6xl text-5xl font-extrabold mb-8">
          {post.title}
        </h1>
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
          <div className="w-fit flex gap-4 flex-col items-stretch justify-stretch md:flex-row md:items-center mt-auto absolute bottom-3 left-5">
            {post.category.map(
              (itemm, indexx) =>
                itemm && (
                  <p
                    key={itemm}
                    className={`bg-secondary font-extrabold text-center py-1 px-6 rounded-md text-text/90`}
                  >
                    {itemm}
                  </p>
                )
            )}
          </div>
        </div>
        <p className="text-lg mb-12">{post.body}</p>
      </div>
    </div>
  );
};

export default page;
