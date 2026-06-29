import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { getLatestArticles } from '../../data/articles';

const ArticlesSection = () => {
  const articles = getLatestArticles(3);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-pink-600 font-medium text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Articles & Guides
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              Florist Tips for Kenya
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-2 max-w-xl"
            >
              Gift guides, delivery advice, and flower trends from our Nairobi florists.
            </motion.p>
          </div>
          <Button asChild variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50 shrink-0">
            <Link to="/blog">
              View all articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-2xl border border-pink-100 overflow-hidden bg-gradient-to-b from-white to-pink-50/30 hover:shadow-lg transition-shadow"
            >
              <Link to={`/blog/${article.slug}`} className="block h-full">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-pink-600">{article.category}</span>
                  <h3 className="font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
