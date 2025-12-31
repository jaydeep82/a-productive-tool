import React from 'react';
import Head from 'next/head';

interface MetaProps {
    title?: string;
    description?: string;
}

/**
 * Simple SEO meta component. Provides a <title> and description meta tag.
 * If no props are provided, defaults are used.
 */
const Meta: React.FC<MetaProps> = ({ title = 'Productive - Your Autonomous Assistant', description = 'A premium productivity tool built for high-performance engineers.' }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Open Graph tags for richer sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
    </Head>
);

export default Meta;
