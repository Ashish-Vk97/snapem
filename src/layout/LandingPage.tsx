

export default function LandingPage() {
  return (
    <>
      

       {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-8 py-20">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold text-[#6a1b9a] leading-tight">
            Building digital<br />Secure & Safe.
          </h2>
          <p className="text-lg text-gray-700">
            This platform provides an emergency SOS feature to keep you secure and safe and instantly connect to your close people. Access your contact information through <span className="font-bold text-[#6a1b9a]">Snap'em</span> and use our secure system.
          </p>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <img
            src="images/hero_section.png"
            alt="Snap'em Logo"
            className="w-3/4 max-w-sm drop-shadow-lg rounded-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-purple-700 mb-12">Why Snap'em?</h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-4">SOS Alerts</h4>
              <p>Instant alerts with location to your trusted contacts in emergencies.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Data Privacy</h4>
              <p>End-to-end encryption ensures your information stays private.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Easy Access</h4>
              <p>Quick and easy access to emergency tools and information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-purple-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-purple-700 mb-6">About Snap'em</h3>
          <p className="text-lg max-w-2xl mx-auto">
            Snap'em is built with the mission to offer a safe and connected experience in emergency scenarios using technology-driven features. Our goal is to make security digital, instant, and reliable.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-purple-700 mb-6">Get in Touch</h3>
          <form className="max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mb-4 border rounded shadow-sm"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 mb-4 border rounded shadow-sm h-32"
            ></textarea>
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800">
              Send Message
            </button>
          </form>
        </div>
      </section>
</>
      
  );
}
