import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AboutUs = () => {
  return (
      
       <div className="about-us-page">
       <div className="about-us-container">
      {/* Heading for About Us */}
      {/* Button to go back to Home */}
      <br></br>
      <Link to="/">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4">
          Back to Home 🏠
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-4"><center><b>About Our Products</b></center></h1><br></br>
      <h2><center>Our spices and nuts are carefully selected for their health benefits and superior quality. Here are some of the benefits</center></h2><br />
      <br></br>
      {/* List of Products and Benefits */}
      <ul>
        <li><strong>Almonds:</strong> Rich in vitamin E, healthy fats, and antioxidants that promote heart health.</li><br />
        <li><strong>Cinnamon:</strong> Helps regulate blood sugar levels and provides anti-inflammatory effects.</li><br />
        <li><strong>Cashews:</strong> Packed with healthy fats, protein, and essential minerals like magnesium.</li>
        <li><strong>Black Pepper:</strong> Aids digestion, reduces inflammation, and improves nutrient absorption.</li>
        <li><strong>Cumin:</strong> Known for its digestive properties and is a rich source of iron and antioxidants.</li>
        <li><strong>Cardamom:</strong> Known for its ability to improve digestion, fight bad breath, and offer antioxidant protection.</li>
        <li><strong>Walnuts:</strong> Rich in omega-3 fatty acids, antioxidants, and support brain health.</li>
        <li><strong>Ground Nuts (Peanuts):</strong> Excellent source of protein, healthy fats, and essential nutrients like biotin.</li>
        <li><strong>Cloves:</strong> Known for their antibacterial properties and ability to support oral health and digestion.</li>
        <li><strong>Fennel Seeds:</strong> Aid in digestion, reduce bloating, and promote healthy skin.</li><br />
        
      </ul>

      {/* Brief Description */}
      <h3><center> "Our products are carefully sourced and packed to maintain freshness and quality. Enjoy the best of nature's goodness!"</center></h3>
      <br></br>
      
    </div>
    </div>
  );
};

export default AboutUs;
