import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/scripts/read-time';
import react from '@astrojs/react';
import image from '@astrojs/image';
// https://astro.build/config
export default defineConfig({
	site: 'https://nareshjois.com',
	integrations: [mdx(), image(), react(), sitemap()],
	markdown: {
		remarkPlugins: [remarkReadingTime],
		extendDefaultPlugins: true
	}
});
