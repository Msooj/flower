import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { SITE_URL, breadcrumbSchema, articleListSchema } from '../data/seoConfig';
import { supabase } from '../lib/supabase';
import { ARTICLES } from '../data/articles';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const canonical = `${SITE_URL}/blog`;

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database blogs to match article structure
      const transformedBlogs = (data || []).map(blog => ({
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt || blog.content?.substring(0, 150) + '...',
        category: blog.category,
        publishedAt: blog.published_at || blog.created_at,
        readMinutes: Math.ceil(blog.content?.length / 200) || 5,
        image: blog.image || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
        keywords: blog.category,
        body: blog.content?.split('\n\n') || [blog.content],
        ctaLink: '/flowers',
        ctaLabel: 'Shop Flowers'
      }));

      // If DB returned no published blogs, fall back to static articles
      setBlogs(transformedBlogs.length > 0 ? transformedBlogs : ARTICLES);
    } catch (error) {
      console.error('Error loading blogs:', error);
      // Fallback to static articles if database fails
      setBlogs(ARTICLES);
    } finally {
      setLoading(false);
    }
  };

  const sorted = [...blogs].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <PageMetaTags
        title="Flower Blog Kenya | Florist Tips, Guides & Gift Ideas | Flower Lifestyle"
        description="Read expert florist tips for Kenya — birthday flowers, same-day Nairobi delivery, anniversary bouquets, roses, Mother's Day ideas, and money bouquet trends."
        keywords="flower blog Kenya, florist tips Nairobi, flower gift guide Kenya, flower delivery articles"
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          articleListSchema(sorted),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: canonical },
          ]),
        ]}
      />

      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-pink-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Blog</span>
        </nav>

        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-600 font-medium text-sm uppercase tracking-wider"
          >
            Articles & Guides
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4"
          >
            Flower Lifestyle Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Florist tips, delivery guides, and gift ideas for ordering flowers in Nairobi and across Kenya.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {sorted.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <Link to={`/blog/${article.slug}`} className="block">
                <div className="aspect-[16/9] overflow-hidden bg-pink-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readMinutes} min read
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-pink-600 font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
