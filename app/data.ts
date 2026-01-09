export const blogPosts = [
  {
    slug: "scaling-nextjs-vercel",
    title: "Scaling Next.js on Vercel",
    excerpt: "Optimizing cold starts and reducing latency for high-traffic e-commerce sites using edge middleware.",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    tag: "Performance",
    content: `
      <h2>The Challenge of Scale</h2>
      <p>When building high-traffic e-commerce applications, every millisecond of latency translates directly to lost revenue. Next.js combined with Vercel provides a powerful platform, but default configurations aren't always enough for "Amazon-scale" traffic.</p>
      
      <h3>Cold Starts and Edge Functions</h3>
      <p>Serverless functions are great for cost and scaling, but cold starts can kill user experience. We tackled this by moving critical path logic—like authentication checks and A/B testing buckets—to Edge Middleware. This runs closer to the user and eliminates the cold start penalty associated with traditional Node.js serverless functions.</p>

      <h3>Image Optimization Strategies</h3>
      <p>We utilized <code>next/image</code> extensively but found that dynamic resizing at the edge was consuming too much budget. We implemented a tiered caching strategy and pre-generated common image variants during build time for static assets, reserving on-demand optimization only for user-generated content.</p>

      <h3>Results</h3>
      <p>By shifting logic to the edge and optimizing our caching strategy, we reduced LCP (Largest Contentful Paint) by 40% and improved our Core Web Vitals score to 98/100.</p>
    `
  },
  {
    slug: "rest-to-graphql",
    title: "From REST to GraphQL",
    excerpt: "A practical guide to incremental migration without breaking existing clients or stalling feature work.",
    date: "Sep 28, 2023",
    readTime: "8 min read",
    tag: "Architecture",
    content: `
      <h2>Why Migrate?</h2>
      <p>Our legacy REST API was suffering from severe over-fetching. The mobile app needed just a user's name and avatar, but the <code>/users/:id</code> endpoint was returning a 4KB JSON blob including order history and preferences. This wasted bandwidth and battery life.</p>

      <h3>The Strangler Fig Pattern</h3>
      <p>Instead of a "big bang" rewrite, we used the Strangler Fig pattern. We stood up a GraphQL gateway (Apollo Server) in front of our existing REST services. Resolvers simply called the underlying REST endpoints initially.</p>

      <h3>Solving N+1 Problems</h3>
      <p>The classic GraphQL pitfall is the N+1 query problem. We implemented <code>DataLoader</code> to batch requests to our backend services. This turned 100 individual database calls into a single optimized query, significantly reducing load on our Postgres cluster.</p>

      <h3>The Outcome</h3>
      <p>The frontend teams moved 3x faster because they didn't need to wait for backend adjustments to get new data fields. We eventually deprecated the REST endpoints one by one as they fell out of use.</p>
    `
  },
  {
    slug: "react-server-components",
    title: "React Server Components",
    excerpt: "Understanding the tradeoffs and performance benefits of RSC in modern web architecture.",
    date: "Sep 15, 2023",
    readTime: "6 min read",
    tag: "React",
    content: `
      <h2>The Paradigm Shift</h2>
      <p>React Server Components (RSC) represent the biggest shift in React since hooks. They allow us to render components exclusively on the server, reducing the JavaScript bundle sent to the client to zero for those parts of the tree.</p>

      <h3>When to Use RSC</h3>
      <p>We found RSC perfect for our marketing pages, blog posts (like this one!), and dashboard layouts that don't require immediate user interactivity. By moving heavy libraries like Markdown parsers or date formatting utilities to the server, we kept our client bundle lean.</p>

      <h3>Interleaving Client and Server</h3>
      <p>The real power comes from composition. We can have a Server Component fetch data from the DB and pass it as props to a Client Component (like a chart or interactive form). This gives us the best of both worlds: backend performance with frontend interactivity.</p>
    `
  }
];