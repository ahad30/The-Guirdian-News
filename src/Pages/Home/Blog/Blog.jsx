const Blog = () => {
  return (
      <section className="text-black max-w-6xl mx-auto">
          <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              <div className="">
                  <h2 className="text-3xl font-bold sm:text-4xl text-center">Explore the World of News with The Guardian</h2>
                  <p className="mt-4 text-gray-500 w-[70%] mx-auto text-center">
                      Dive into our meticulously curated collection of news articles and uncover insights from around the globe.
                  </p>
              </div>
              
              <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
              
                  <div className="flex items-start gap-4">
                      <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </span>
              
                      <div>
                          <h2 className="text-lg font-bold">Latest News</h2>
              
                          <p className="mt-1 text-sm text-gray-500">
                              Stay updated with the latest breaking news from around the world.
                          </p>
                      </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                      <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </span>
              
                      <div>
                          <h2 className="text-lg font-bold">Editorials and Opinions</h2>
              
                          <p className="mt-1 text-sm text-gray-500">
                              Explore thought-provoking editorials and opinion pieces from our team of expert writers.
                          </p>
                      </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                      <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </span>
              
                      <div>
                          <h2 className="text-lg font-bold">Investigative Reports</h2>
              
                          <p className="mt-1 text-sm text-gray-500">
                              Delve into our in-depth investigative reports uncovering the stories behind the headlines.
                          </p>
                      </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                      <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </span>
              
                      <div>
                          <h2 className="text-lg font-bold">Technology Updates</h2>
              
                          <p className="mt-1 text-sm text-gray-500">
                              Stay ahead with the latest updates and trends in technology and innovation.
                          </p>
                      </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                      <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </span>
              
                      <div>
                          <h2 className="text-lg font-bold">Health and Wellness</h2>
              
                          <p className="mt-1 text-sm text-gray-500">
                              Get insights and advice on health, wellness, and lifestyle from our experienced writers.
                          </p>
                      </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                      <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </span>
              
                      <div>
                          <h2 className="text-lg font-bold">Global Events</h2>
              
                          <p className="mt-1 text-sm text-gray-500">
                              Stay informed about upcoming global events, conferences, and summits.
                          </p>
                      </div>
                  </div>
              
              </div>
              
          </div>
      </section>
  );
};

export default Blog;
