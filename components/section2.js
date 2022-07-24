import Link from "next/link"
import Image from "next/image"
import Author from "./_child/author"
import fetcher from "../lib/fetcher";
import Spinner from "./_child/spinner";
import Error from "./_child/error";

export default function section1() {
  const { data, isLoading, isError } = fetcher('/api/posts');

  if (isLoading) {
    return (
      <Spinner></Spinner>
    )
  }

  if (isError) {
    return <Error></Error>;
  }

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {Array.isArray(data) &&
          data.map((value, index) => (
            <Post data={value} key={"section2-post-" + index}></Post>
          ))}
      </div>
    </section>
  );
}

function Post({data}) {
  const {id, title, description, category, img, published, author} = data;

  return (
    <div className="item">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <a>
            <Image
              src={img || "/"}
              className="rounded"
              width={500}
              height={350}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
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

        <p className="text-gray-500 py-3">{description || "Unknown"}</p>
        {author ? <Author {...author}/> : <></>}
      </div>
    </div>
  );
}