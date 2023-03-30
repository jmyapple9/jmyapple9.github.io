import { Fragment, useEffect, useState } from 'react';
import { ga, skeleton } from '../../helpers/utils';
import LazyImage from '../lazy-image';
import PropTypes from 'prop-types';
import { AiOutlineContainer } from 'react-icons/ai';
import { getDevPost, getMediumPost } from '@arifszn/blog-js';
import { formatDistance } from 'date-fns';

const displaySection = (blog) => {
  if (blog?.source && blog?.username) {
    return true;
  } else {
    return false;
  }
};

const Blog = ({ loading, blog, googleAnalytics }) => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    if (displaySection(blog)) {
      if (blog.source === 'medium') {
        getMediumPost({
          user: blog.username,
        }).then((res) => {
          setArticles(res);
        });
      } else if (blog.source === 'dev') {
        getDevPost({
          user: blog.username,
        }).then((res) => {
          setArticles(res);
        });
      }
    }
  }, []);

  const renderSkeleton = () => {
    let array = [];
    for (let index = 0; index < blog.limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col md:flex-row">
              <div className="avatar mb-5 md:mb-0">
                <div className="w-24 h-24 mask mask-squircle">
                  {skeleton({
                    width: 'w-full',
                    height: 'h-full',
                    shape: '',
                  })}
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        width: 'w-full',
                        height: 'h-8',
                        className: 'mb-2 mx-auto md:mx-0',
                      })}
                    </h2>
                    {skeleton({
                      width: 'w-24',
                      height: 'h-3',
                      className: 'mx-auto md:mx-0',
                    })}
                    <div className="mt-3">
                      {skeleton({
                        width: 'w-full',
                        height: 'h-4',
                        className: 'mx-auto md:mx-0',
                      })}
                    </div>
                    <div className="mt-4 flex items-center flex-wrap justify-center md:justify-start">
                      {skeleton({
                        width: 'w-32',
                        height: 'h-4',
                        className: 'md:mr-2 mx-auto md:mx-0',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return array;
  };

  const renderArticles = () => {
    // console.log(articles)
    return       [
      {
        title: '離散數學 Discrete Mathematics',
        link: 'https://hackmd.io/@hsu-chi/Discrete_mathematics',
        thumbnail: 'https://www.cheenta.com/wp-content/uploads/2021/01/Pigeonhole-Principle.png',//'https://e7.pngegg.com/pngimages/867/829/png-clipart-graph-coloring-graph-theory-vertex-mathematics-mathematics-angle-triangle.png',
        publishedAt: Date.parse('2022-07-01'),
        categories: ['graph','tree','recursion','number theory'],
        description: '考研時自己整理的Hackmd筆記。完成度: 高',
      },
      {
        title: '線性代數 Linear Algebra',
        link: 'https://hackmd.io/@hsu-chi/Linear_algebra',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Matrix_zh-hant.png',
        publishedAt: Date.parse('2022-07-01'),
        categories: ['vector space','matrix', 'Diagonalization', 'SVD'],
        description: '考研時自己整理的Hackmd筆記。完成度: 高',
      },
      {
        title: '資料結構 Data Structure',
        link: 'https://hackmd.io/@hsu-chi/Data_structure',
        thumbnail: 'https://cs.lmu.edu/~ray/images/redblacktree.png',
        publishedAt: Date.parse('2022-07-01'),
        categories: ['tree', 'linked list', 'array', 'stack', 'queue'],
        description: '考研時自己整理的Hackmd筆記。完成度: 高',
      },
      {
        title: '演算法 Algorithm',
        link: 'https://hackmd.io/@hsu-chi/Algorithm',
        thumbnail: 'https://www.crio.do/blog/content/images/2022/02/Insertion-sort-example.png',
        publishedAt: Date.parse('2022-07-01'),
        categories: ['sorting', 'minimum spanning tree', 'shortest path', 'NP complete'],
        description: '考研時自己整理的Hackmd筆記。完成度: 高',
      },
      {
        title: '作業系統 Operating System',
        link: 'https://hackmd.io/@hsu-chi/Operating_system',
        thumbnail: 'https://runestone.academy/ns/books/published/welcomecs/_images/operating-system-logos.jpg',
        publishedAt: Date.parse('2022-07-01'),
        categories: ['scheduling', 'Synchronization', 'deadlock', 'file system'],
        description: '考研時自己整理的Hackmd筆記。完成度: 中',
      },
      {
        title: '計算機結構與組織 Computer Architecture',
        link: 'https://hackmd.io/@hsu-chi/Computer_architecture',
        thumbnail: 'https://i.imgur.com/3Hcykql.png',
        publishedAt: Date.parse('2022-07-01'),
        categories: ['ALU', 'Memory', 'cache', 'pipeline'],
        description: '考研時自己整理的Hackmd筆記。完成度: 中',
      },
    ].slice(0, blog.limit).map((article, index) => (
      <a
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        key={index}
        href={article.link}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalytics?.id) {
              ga.event({
                action: 'Click Blog Post',
                params: {
                  post: article.title,
                },
              });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(article.link, '_blank');
        }}
      >
        <div className="p-8 h-full w-full">
          <div className="flex items-center flex-col md:flex-row">
            <div className="avatar mb-5 md:mb-0 opacity-90">
              <div className="w-24 h-24 mask mask-squircle">
                <LazyImage
                  src={article.thumbnail}
                  alt={'thumbnail'}
                  placeholder={skeleton({
                    width: 'w-full',
                    height: 'h-full',
                    shape: '',
                  })}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-start px-4">
                <div className="text-center md:text-left w-full">
                  <h2 className="font-semibold text-base-content opacity-60">
                    {article.title}
                  </h2>
                  <p className="text-base-content opacity-50 text-xs">
                    {formatDistance(article.publishedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="mt-3 text-base-content text-opacity-60 text-sm">
                    {article.description}
                  </p>
                  <div className="mt-4 flex items-center flex-wrap justify-center md:justify-start">
                    {article.categories.map((category, index2) => (
                      <div
                        className="py-2 px-4 text-xs leading-3 rounded-full bg-base-300 mr-1 mb-1 opacity-50 text-base-content"
                        key={index2}
                      >
                        #{category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    ))
    // return articles && articles.length ? (
    //   articles.slice(0, blog.limit).map((article, index) => (
    //     <a
    //       className="card shadow-lg compact bg-base-100 cursor-pointer"
    //       key={index}
    //       href={article.link}
    //       onClick={(e) => {
    //         e.preventDefault();

    //         try {
    //           if (googleAnalytics?.id) {
    //             ga.event({
    //               action: 'Click Blog Post',
    //               params: {
    //                 post: article.title,
    //               },
    //             });
    //           }
    //         } catch (error) {
    //           console.error(error);
    //         }

    //         window?.open(article.link, '_blank');
    //       }}
    //     >
    //       <div className="p-8 h-full w-full">
    //         <div className="flex items-center flex-col md:flex-row">
    //           <div className="avatar mb-5 md:mb-0 opacity-90">
    //             <div className="w-24 h-24 mask mask-squircle">
    //               <LazyImage
    //                 src={article.thumbnail}
    //                 alt={'thumbnail'}
    //                 placeholder={skeleton({
    //                   width: 'w-full',
    //                   height: 'h-full',
    //                   shape: '',
    //                 })}
    //               />
    //             </div>
    //           </div>
    //           <div className="w-full">
    //             <div className="flex items-start px-4">
    //               <div className="text-center md:text-left w-full">
    //                 <h2 className="font-semibold text-base-content opacity-60">
    //                   {article.title}
    //                 </h2>
    //                 <p className="text-base-content opacity-50 text-xs">
    //                   {formatDistance(article.publishedAt, new Date(), {
    //                     addSuffix: true,
    //                   })}
    //                 </p>
    //                 <p className="mt-3 text-base-content text-opacity-60 text-sm">
    //                   {article.description}
    //                 </p>
    //                 <div className="mt-4 flex items-center flex-wrap justify-center md:justify-start">
    //                   {article.categories.map((category, index2) => (
    //                     <div
    //                       className="py-2 px-4 text-xs leading-3 rounded-full bg-base-300 mr-1 mb-1 opacity-50 text-base-content"
    //                       key={index2}
    //                     >
    //                       #{category}
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </a>
    //   ))
    // ) : (
    //   <div className="text-center mb-6">
    //     <AiOutlineContainer className="mx-auto h-12 w-12 opacity-30" />
    //     <p className="mt-1 text-sm opacity-50 text-base-content">
    //       No recent post
    //     </p>
    //   </div>
    // );
  };

  return (
    <Fragment>
      {displaySection(blog) && (
        <div className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <div
                className={`card compact bg-base-100 ${
                  loading || (articles && articles.length)
                    ? 'card compact shadow bg-opacity-40'
                    : 'shadow-lg'
                }`}
              >
                <div className="card-body">
                  {/* <div className="mx-3 mb-2"> */}
                <div className="mx-3 flex items-center justify-between mb-2">

                    <h5 className="card-title">
                      {loading ? (
                        skeleton({ width: 'w-28', height: 'h-8' })
                      ) : (
                        <span className="text-base-content opacity-70">
                          Recent Notes
                        </span>
                      )}
                    </h5>
                    {/* <a
                      href={`https://hackmd.io/@hsu-chi`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base-content opacity-50"
                    >
                      See All
                    </a> */}
                    {loading ? (
                    skeleton({ width: 'w-10', height: 'h-5' })
                  ) : (
                    <a
                      href={`https://hackmd.io/@hsu-chi`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base-content opacity-50"
                    >
                      See All
                    </a>
                  )}
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-6">
                      {loading || !articles
                        ? renderSkeleton()
                        : renderArticles()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Blog.propTypes = {
  loading: PropTypes.bool.isRequired,
  blog: PropTypes.object.isRequired,
  googleAnalytics: PropTypes.object.isRequired,
};

export default Blog;
