// This is the About Us Page

import React, { Component } from "react";
import "../App.css";
import { Link } from 'react-router-dom';

class AboutUs extends Component {

  render() {
    return (
      <div className="container" style={{ marginBottom: "5%" }}>

        <h1>About Us</h1>
        <br /><br /><br /><br />
        
        <p style={{ textAlign: "left", fontSize: "small" }}>
          VirtualVogue is a forward-thinking leader in sustainable design, marketing, and the distribution of luxury fashion and lifestyle products, including apparel and accessories. Our brand is recognized globally and is known for pushing the boundaries of innovation in the fashion industry.
          
          <br /><br /><br /><br />
          <h2>Our Products and Brands</h2>
          Since our founding, VirtualVogue has consistently delivered high-quality, unique products that resonate with modern sensibilities and sustainable practices. Our collections reflect a cohesive vision of luxury for a greener future, capturing the essence of style and sustainability. We celebrate individuality and innovation, and we work collaboratively to inspire a lifestyle that is both aspirational and environmentally responsible. Our commitment to sustainability is evident in our partnership with global initiatives and our active role in redefining fashion for the digital age.
          <br /><br /><br />

          <h2>Green Carpet Initiative</h2>
          At VirtualVogue, our designs are influenced by the diverse backgrounds of our designers, blending multicultural inspirations with a contemporary perspective. We are proud to be recognized by industry leaders and have participated in initiatives like the CFDA/Vogue Fashion Challenges. This season, we are exclusively launching our Fall/Winter collection on platforms like Snapchat and Instagram, embracing a direct-to-consumer model that fosters transparency, personalization, and reduced environmental impact. Through these efforts, we aim to empower our customers to express themselves while contributing positively to the planet.
          <br /><br /><br />

          <h2>Discover the Future of Fashion</h2>
          Join us as we continue to innovate and shape the future of sustainable fashion. VirtualVogue believes in a world where style meets purpose, and we are committed to creating a lasting impact on the fashion industry and beyond.
          <br /><br /><br />

          <h2>We hope you enjoy VirtualVogue... <Link to="/products">Discover More</Link></h2>

          <br /><br /><br />
        </p>
      </div>
    );
  }
}

export default AboutUs;
