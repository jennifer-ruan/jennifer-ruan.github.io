import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const photos = [
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHdhJxdRDRXG3Wfs47bsZfoRzy3ySVylyA1QOAYEpPqKEDD_17DcN7ifZB03OKB6_2eJT4L3TVx4VW59_MEjXQDtZRL-rRyFSHD48cHDFxRMny7EhNvfXiiMJs2Fj7HTqK5GcPDpKCKu6DEvZJhR03TWQw=w970-h1456-s-no?authuser=0",
      "title": "Stuffed Bird at Pioneer Village"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHeUv7pY9ydYA761-Xpw2NebnrmcI_FPDqfOtJ3mVRbAE9YEiE0kQ6RkNhCqmJtd5vDnQmDOV10UhGPl-uy3zxyJKciBQrgAOry-TonFjFGxzR1ig8U-7tXYJw-7ETfsXPFVHNc48py-BHri7wjeTln6dQ=w1096-h1464-s-no?authuser=0",
      "title": "Farm in Innisfil, ON"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHeliu0kFfA8UdtVtdOtqN7HyJOT1WhabNXh7rhn7axj4SHnL6JWWDh75noWELa4bRJvFy433dQhEH146oksugP5HzzD5-WoY-n6tGw7y-hOeEqJxQU4-awZvcLoQ4pSSpCZzCxIgm6GBy23BjfzLc0AXg=w2196-h1456-s-no?authuser=0",
      "title": "Cat Statues at Pacific Mall"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHf-7cMi9lQnFFR3CqoLdPdVs3PZ28l7x3MwYnGoJsqnCDOZUYeL6KCCuMUGQ91sId4Urip72ZT8d-TKLdO3y_Qfpqi3bnbj8HktnwFN53F7PxaJCU5xyVnwEydE490xeQUXUyonNFVVPOU9lnNU2RHYQA=w1098-h1464-s-no?authuser=0",
      "title": "Trees at a temple in Japan"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHfx6yEMUx_nnvKJnWaDiQiHXY0HqR7kUgwDKd4fCgh8sEOMoSbCnuB93mu06D2s_PrCc6rpUNVSKVRgBD7kEGvOwfQhM_jR6tWwy70lX02-RzWr1r3kAS4lZYSnP_Lo2e_1Fiebfaoc7vTotBPxKULC4Q=w1440-h1439-s-no?authuser=0",
      "title": "Sunset at Prince Edward County"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHdh7VHnMmjqGoDwnw_wEhs-n8tXz6WjreTHL_4KCOnvRV2kVLibjH8JEo6O3pzsgKZQcud6zKrFYzufyV8b9_ELqfC5Mh3bRHljvIc1c_ZfNofDJslmUgGvfq74QLf1siE8DbhNOJzEHVlHK0HP-xwloQ=w976-h1464-s-no?authuser=0",
      "title": "My precious adorable darling cat"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHd6hn6wp91fcW0oofsJHQaVLRAntwtaxgORyZbwJ_1ZU0vXiGVsyKx_S8CFWUJ_q7c-qpGZGJXgjGDiYI5p0egIpTRyPoY8KUYoY9yzcexmFsLvWG0Ka0ROAJ8SRPO5Hs70X_evPLhHjKnjKWOogMLe7A=w2196-h1464-s-no?authuser=0",
      "title": "Some buildings in downtown Toronto"
    },
    {
      "image": "https://lh3.googleusercontent.com/pw/ADCreHfyPesZv_nAQuxIMaaUkX_GCMgH5fEQHMLdSakadWZEY1xzrrtnqMIYtwGPhUqCQOZavkRO3Zh8-eBZaioPFNfxfU3jjhWutPXiipuoIy85jbe6jpESAT9-cl4XQj9MPfXWISssO-s1GTdR7Wx1-YF7gQ=w1098-h1464-s-no?authuser=0",
      "title": "A seal at the Osaka Aquarium"
    },
  ];

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createBlog = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };
  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Blog</title>
        </Head>
        <link rel="stylesheet" href="styles.css"/>
        <div
          className={`container mx-auto mb-10 ${
            data.showCursor && "cursor-none"
          }`}
        >
          <Header isBlog={true}></Header>
          <div className="mt-10">
            <span
              ref={text}
            >
              in my spare time, i like to take photos with my <strong>Canon EOS 300</strong> or <strong>Fujifilm XT-5</strong>.
            </span>
              {photos && 
              <div class="row">
                <div class="column">
                  <img src={photos[0].image} alt={photos[0].title}/>
                  <img src={photos[4].image} alt={photos[4].title}/>
                </div>
                <div class="column">
                  <img src={photos[1].image} alt={photos[1].title}/>
                  <img src={photos[5].image} alt={photos[5].title}/>
                </div>
                <div class="column">
                <img src={photos[2].image} alt={photos[2].title}/>
                  <img src={photos[6].image} alt={photos[6].title}/>
                </div>
                <div class="column">
                <img src={photos[3].image} alt={photos[3].title}/>
                  <img src={photos[7].image} alt={photos[7].title}/>
                </div>
              </div>
              }
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createBlog} type={"primary"}>
              Add New Post +{" "}
            </Button>
          </div>
        )}
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ]);

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
