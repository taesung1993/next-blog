import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import Author from './_child/author';
import fetcher from "../lib/fetcher";
import Spinner from "./_child/spinner";
import Error from "./_child/error";

export default function section3() {
  const { data, isLoading, isError } = fetcher("/api/popular");

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isError) {
    return <Error></Error>;
  }

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      {/* swiper */}
      <Swiper slidesPerView={2}>
        {data.map((value, index) => (
          <SwiperSlide key={"swiper-slide-" + index}>
            <Post data={value}></Post>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

function Post({data}) {
  const { id, title, description, category, img, published, author } = data;

  return (
    <div className="grid">
      <div className="images">
        <Link href={"/"}>
          <a>
            <Image
              src={img || "/"}
              className="rounded"
              width={600}
              height={400}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={"/"}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={"/"}>
            <a className="text-gray-600 hover:text-gray-800">
              - {published || "Unknown"}
            </a>
          </Link>
        </div>

        <div className="title">
          <Link href={"/"}>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>

        <p className="text-gray-500 py-3">{description || "Unknown"}</p>
        {author ? <Author /> : <></>}
      </div>
    </div>
  );
}