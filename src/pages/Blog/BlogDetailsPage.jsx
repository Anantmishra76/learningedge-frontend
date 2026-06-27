import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../../components/common/Footer";
import { blogPosts, blogPostsById } from "../../../data/BlogData";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const post = blogPostsById[blogId];
  const relatedPosts = post
    ? blogPosts.filter((item) => item.id !== post.id).slice(0, 3)
    : [];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main id="main-content">
        <section className="bg-blue-500 text-white">
          <div className="mx-auto w-11/12 max-w-maxContent py-16 sm:py-20 lg:py-24">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-blue-200/60" />
                <span>{post.publishedAt}</span>
                <span className="h-1 w-1 rounded-full bg-blue-200/60" />
                <span>{post.readTime}</span>
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {post.description}
              </p>

              <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-blue-100">
                Written by {post.author}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-11/12 max-w-maxContent">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  className="h-72 w-full object-cover sm:h-96"
                />

                <div className="p-6 sm:p-8 lg:p-10">
                  <p className="text-lg leading-8 text-slate-700">
                    {post.intro}
                  </p>

                  <div className="mt-10 space-y-10">
                    {post.sections.map((section) => (
                      <section key={section.heading}>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                          {section.heading}
                        </h2>

                        <div className="mt-4 space-y-5 text-base leading-8 text-slate-600">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>

                        {section.bullets?.length ? (
                          <ul className="mt-6 space-y-3 rounded-[1.5rem] bg-slate-50 p-6 text-slate-700">
                            {section.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-3 leading-7">
                                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-600" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    ))}
                  </div>

                  <div className="mt-10 rounded-lg bg-slate-900 p-6 text-white sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                      Final Thought
                    </p>
                    <p className="mt-4 text-base leading-8 text-slate-200 sm:text-lg">
                      {post.closing}
                    </p>
                  </div>
                </div>
              </article>

              <aside className="space-y-6">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
                    Need learning support?
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                    Find the right course on LearningEdge
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Browse structured courses, learn from instructors, and build
                    practical skills at your own pace.
                  </p>
                  <Link
                    to="/all-courses"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                    Explore courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
                    More Articles
                  </p>
                  <div className="mt-5 space-y-4">
                    {relatedPosts.map((item) => (
                      <Link
                        key={item.id}
                        to={`/blog/${item.id}`}
                        className="group block rounded-2xl border border-slate-200 p-4 transition hover:border-brand-200 hover:bg-slate-50">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {item.category}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-700">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
