import Image from "next/image";
import Link from "next/link";
import Author from "./_child/author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/spinner";
import Error from "./_child/error";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import 'swiper/css';


export default function section1() {
  const { data, isLoading, isError } = fetcher("/api/trending");

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isError) {
    return <Error></Error>;
  }
  
  SwiperCore.use([Autoplay]);
    
  return (
    <section className="py-16">
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              duration: 2000
            }}
          >
            {
              data.map((value, index) => (
                <SwiperSlide key={'swiper-slide-'+index}>
                  <Slide data={value}></Slide>
                </SwiperSlide>
              ))
            }
        </Swiper>
      </div>
    </section>
  );
}

function Slide({data}) {
  const { id, title, description, category, img, published, author } = data;
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <a>
            <Image src={img || "/"} width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info flex flex-col justify-center">
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
            <a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>

        <p className="text-gray-500 py-3">{description || "description"}</p>
        {author ? <Author {...author}/> : <></>}
      </div>
    </div>
  );
}