import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
const AboutUs = () => {
    const aboutUsData = {
        heroSection: {
          title: "About TaskBros - Your Trusted Service Partner",
          subtitle:
            "TaskBros is a service-sharing platform dedicated to providing reliable electrical product servicing. From installation to repairs, we ensure top-quality service with skilled professionals.",
          image: "/images/about-hero.jpg",
        },
      
        companyOverview: {
          title: "Who We Are",
          description:
            "TaskBros was founded with the vision of making electrical product servicing accessible and hassle-free. We connect users with experienced professionals who provide high-quality repairs, maintenance, and installations. Our platform ensures transparency, security, and convenience for every service request.",
          image: "/images/company-overview.jpg",
        },
      
        missionVision: {
          mission: {
            title: "Our Mission",
            description:
              "Our mission is to revolutionize the service industry by offering a user-friendly platform that simplifies electrical servicing while ensuring trust and reliability.",
          },
          vision: {
            title: "Our Vision",
            description:
              "We envision a future where quality electrical services are accessible to everyone with just a few clicks. Our goal is to create a seamless experience for both service providers and customers.",
          },
        },
      
        whyChooseUs: {
          title: "Why Choose TaskBros?",
          points: [
            {
              title: "Experienced Professionals",
              description: "All service providers are vetted, trained, and experienced in handling electrical repairs and installations.",
            },
            {
              title: "Secure & Reliable",
              description: "We prioritize safety and reliability, ensuring high-quality services with customer satisfaction.",
            },
            {
              title: "Affordable Pricing",
              description: "Transparent pricing with no hidden costs. Get premium services at competitive rates.",
            },
            {
              title: "24/7 Customer Support",
              description: "Our support team is always available to assist you with any queries or concerns.",
            },
          ],
          image: "/images/why-choose-us.jpg",
        },
      
        ourTeam: {
          title: "Meet Our Team",
          description:
            "Our team consists of skilled professionals, customer support specialists, and engineers dedicated to providing the best service experience.",
          members: [
            {
              name: "John Doe",
              role: "Founder & CEO",
              image: "https://images.pexels.com/photos/5668886/pexels-photo-5668886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              name: "Sarah Smith",
              role: "Chief Technician",
              image: "https://images.pexels.com/photos/7166996/pexels-photo-7166996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              name: "Michael Brown",
              role: "Customer Support Manager",
              image: "https://img.freepik.com/free-photo/business-customer-service_329181-9143.jpg?t=st=1739328522~exp=1739332122~hmac=246b9b18a7d2d5d960540dbeb8c8135a84f32047d9854e98400f380aca9ba31a&w=1060",
            },
            {
              name: "Emily Davis",
              role: "Operations Head",
              image: "https://img.freepik.com/free-photo/woman-using-tablet_53876-105182.jpg?t=st=1739328687~exp=1739332287~hmac=4af3dc2f0f48f6c46d1827c11dc7b073494b59cefdf6a2f96683c9cbda5ffd00&w=1380",
            },
          ],
        },
      
        testimonials: {
          title: "What Our Customers Say",
          reviews: [
            {
              name: "David Johnson",
              comment:
                "TaskBros saved me time and effort! Their team fixed my washing machine quickly, and their support was excellent.",
              rating: 5,
            },
            {
              name: "Emma Wilson",
              comment:
                "Very professional service. My air conditioner is working perfectly now. Highly recommend TaskBros!",
              rating: 5,
            },
            {
              name: "James Anderson",
              comment:
                "Quick response and affordable pricing. Their electrician was skilled and fixed my issue in no time.",
              rating: 4.5,
            },
          ],
        },
      
        faqs: {
          title: "Frequently Asked Questions",
          questions: [
            {
              question: "How do I book a service on TaskBros?",
              answer:
                "Simply sign up, browse available services, and book an appointment. Our team will contact you for confirmation.",
            },
            {
              question: "Are the technicians certified?",
              answer:
                "Yes, all our technicians go through a verification process and are trained professionals.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept online payments through credit/debit cards, mobile banking, and cash on service completion.",
            },
            {
              question: "Do you offer emergency services?",
              answer:
                "Yes, we offer emergency electrical repair services 24/7 for urgent cases.",
            },
          ],
        },
      
        contactUs: {
          title: "Get in Touch",
          description:
            "Have questions? Need assistance? Our team is here to help! Contact us anytime for service inquiries.",
          email: "support@taskbros.com",
          phone: "+123-456-7890",
          address: "123 TaskBros Street, Dhaka, Bangladesh",
          image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      };
            
    return (
        <div className="container mx-auto p-8">
  
        {/* Our Team */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{aboutUsData.ourTeam.title}</h2>
            <p className="text-center mb-8">{aboutUsData.ourTeam.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {aboutUsData.ourTeam.members.map((member, index) => (
                <div key={index} className="text-center">
                  <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{aboutUsData.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutUsData.testimonials.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-700 mb-4">&quot;{review.comment}&quot;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                    </div>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400 mr-1">★</span>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <span key={i} className="text-gray-300 mr-1">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* FAQs */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{aboutUsData.faqs.title}</h2>
            <div className="space-y-4">
              {aboutUsData.faqs.questions.map((faq, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4">
                  <h3 className="text-xl font-semibold cursor-pointer" onClick={() => {
                    const answer = document.getElementById(`answer-${index}`);
                    answer.classList.toggle('hidden');
                  }}>{faq.question}</h3>
                  <p id={`answer-${index}`} className="text-gray-700 hidden mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Contact Us */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{aboutUsData.contactUs.title}</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <img src={aboutUsData.contactUs.image} alt="Contact Us" className="rounded-lg shadow-lg" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <p className="text-lg mb-4">{aboutUsData.contactUs.description}</p>
                <ul className="space-y-2">
                  <li>
                    <a href={`mailto:${aboutUsData.contactUs.email}`} className="flex items-center">
                      <FaEnvelope className="mr-2" /> {aboutUsData.contactUs.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${aboutUsData.contactUs.phone}`} className="flex items-center">
                      <FaPhone className="mr-2" /> {aboutUsData.contactUs.phone}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> {aboutUsData.contactUs.address}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default AboutUs;