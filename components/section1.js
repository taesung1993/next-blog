import Image from "next/image";
import Link from "next/link";
import Author from "./_child/author";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import 'swiper/css';


export default function section1() {
  const bg = {
    background: "url('/images/bg_banner.png') no-repeat",
    backgroundPosition: "right",
    backgroundSize: "contain"
  }

  SwiperCore.use([Autoplay]);
    
  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>
          <Swiper
            slidesPerView={1}
            // loop={true}
            // autoplay={{
            //   duration: 2000
            // }}
          >
            <SwiperSlide>
              {Slide()}
            </SwiperSlide>
            <SwiperSlide>
              {Slide()}
            </SwiperSlide>
            <SwiperSlide>
              {Slide()}
            </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

function Slide() {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={"/"}>
          <a>
            <Image src={"/images/banner_img_01.jpg"} width={600} height={600}/>
          </a>
        </Link>
      </div>
      <div className="info flex flex-col justify-center">
        <div className="cat">
          <Link href={"/"}>
            <a className="text-orange-600 hover:text-orange-800">Business, Travel</a>
          </Link>
          <Link href={"/"}>
            <a className="text-gray-600 hover:text-gray-800">- July, 2022</a>
          </Link>
        </div>

        <div className="title">
          <Link href={"/"}>
            <a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
              Your most unhappy customers are your greatest source of learning
            </a>
          </Link>
        </div>
        
        <p className="text-gray-500 py-3">
          Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem lpsum decided to leave for the far World of Grammer.
        </p>
        <Author/>
      </div>
    </div>
  );
}