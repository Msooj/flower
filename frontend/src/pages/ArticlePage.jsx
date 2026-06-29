import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import { SITE_URL, breadcrumbSchema, articleSchema } from '../data/seoConfig';
import { getArticleBySlug, getLatestArticles } from '../data/articles';
import { supabase } from '../lib/supabase';

const ArticlePage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        // Fallback to static articles if database fails
        const staticArticle = getArticleBySlug(slug);
        if (staticArticle) {
          setBlog(staticArticle);
        }
        return;
      }

      // Transform database blog to match article structure
      const transformedBlog = {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || data.content?.substring(0, 150) + '...',
        category: data.category,
        publishedAt: data.published_at || data.created_at,
        readMinutes: Math.ceil(data.content?.length / 200) || 5,
        image: data.image || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
        keywords: data.category,
        body: data.content?.split('\n\n') || [data.content],
        ctaLink: '/flowers',
        ctaLabel: 'Shop Flowers'
      };

      setBlog(transformedBlog);
    } catch (error) {
      console.error('Error loading blog:', error);
      // Fallback to static articles
      const staticArticle = getArticleBySlug(slug);
      if (staticArticle) {
        setBlog(staticArticle);
      }
    } finally {
      setLoading(false);
    }
  };

  const article = blog || getArticleBySlug(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = `${SITE_URL}/blog/${article.slug}`;
  const related = getLatestArticles(4).filter((a) => a.slug !== article.slug).slice(0, 3);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title={`${article.title} | Flower Lifestyle Blog`}
        description={article.excerpt}
        keywords={article.keywords}
        canonicalUrl={canonical}
        imageUrl={article.image}
      />
      <StructuredData
        data={[
          articleSchema(article),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: `${SITE_URL}/blog` },
            { name: article.title, url: canonical },
          ]),
        ]}
      />

      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-pink-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-pink-600">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 line-clamp-1">{article.title}</span>
        </nav>

        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        <article>
          <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readMinutes} min read
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/9] bg-pink-100">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-pink max-w-none space-y-5">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {article.ctaLink && (
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 text-center">
              <p className="text-gray-800 font-medium mb-4">Ready to order fresh flowers?</p>
              <Button asChild className="bg-pink-600 hover:bg-pink-700">
                <Link to={article.ctaLink}>{article.ctaLabel}</Link>
              </Button>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">More articles</h2>
            <ul className="space-y-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="block p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50/50 transition-colors"
                  >
                    <span className="text-xs text-pink-600 font-medium">{item.category}</span>
                    <h3 className="font-semibold text-gray-900 mt-1 hover:text-pink-600">{item.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
