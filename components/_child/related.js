import Link from "next/link";
import Image from "next/image";
import Author from "./author";
import Spinner from "./spinner";
import Error from "./error";
import fetcher from "../../lib/fetcher";

export default function related() {
    const { data, isLoading, isError } = fetcher("/api/posts");

    if (isLoading) {
      return <Spinner></Spinner>;
    }

    if (isError) {
      return <Error></Error>;
    }

  return (
    <div className="pt-20">
      <h1 className="font-bold text-3xl py-12">Related</h1>
   
      <div className="flex flex-col gap-10">
        {data.map((value, index) => (
          <Post key={'related-'+index} data={value}></Post>
        ))}
      </div>
   </div>
  );
}

function Post({data}) {
  const { id, title, description, category, img, published, author } = data;

  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={"/"}>
          <a>
            <Image
              src={img || "/"}
              className="rounded"
              width={300}
              height={200}
            />
          </a>
        </Link>
      </div>

      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className="text-gray-600 hover:text-gray-800">
              - {published || "Unknown"}
            </a>
          </Link>
        </div>

        <div className="title">
          <Link href={`/posts/${id}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>

        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}