import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-950 to-black">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 inline-block mb-4">About Us</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-purple-500 rounded-lg opacity-50"></div>
              <img
                src="fiverr.webp"
                alt="About Us"
                className="rounded-lg shadow-2xl w-full object-cover h-96 relative z-10"
              />
              <div className="absolute -bottom-3 -right-3 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-lg"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-left mt-12 lg:mt-0">
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">Our Journey</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              It has survived not only five centuries, but also the leap into electronic typesetting, 
              remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset 
              sheets containing Lorem Ipsum passages.
            </p>
            <Link to='/fviewProjects'><button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
              Explore More
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;