import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    base: '/',
    adapter: adapter()
  }
};

export default config;
