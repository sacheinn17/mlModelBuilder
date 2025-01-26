import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
	prerender: {
		handleHttpError: ({ path, referrer, message }) => {
			// ignore deliberate link to shiny 404 page
			if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
				return;
			}

			// otherwise fail the build
			throw new Error(message);
		}},
    adapter: adapter()
  }
};

export default config;
