import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import "./Interactivemap.css";
import { useNavigate } from "react-router-dom";

const InteractiveMap = () => {
    const navigate=useNavigate()
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    // North India
    {
      position: [28.6139, 77.2090],
      name: "Delhi Agricultural Hub",
      state: "Delhi",
      type: "Multi-Purpose Center",
      details: "Complete farming solutions and modern equipment",
      resources: {
        equipment: ["Tractors", "Harvesters", "Drones"],
        seeds: ["Wheat", "Rice", "Vegetables"],
        services: ["Soil Testing", "Crop Advisory"]
      }
    },
    {
      position: [30.7333, 76.7794],
      name: "Chandigarh Agri Tech",
      state: "Chandigarh",
      type: "Technology Center",
      details: "Advanced farming technology solutions",
      resources: {
        technology: ["IoT Sensors", "Weather Stations"],
        training: ["Tech Implementation", "Smart Farming"]
      }
    },
    {
      position: [32.2396, 77.1887],
      name: "Himachal Agri Center",
      state: "Himachal Pradesh",
      type: "Mountain Farming",
      details: "Specialized mountain agriculture solutions",
      resources: {
        equipment: ["Hill Tractors", "Sprayers"],
        seeds: ["Apple Saplings", "Mountain Crops"]
      }
    },
    {
      position: [33.7782, 76.5762],
      name: "Jammu Kashmir Farm Hub",
      state: "Jammu & Kashmir",
      type: "Cold Climate Farming",
      details: "Cold climate agricultural solutions",
      resources: {
        products: ["Saffron", "Apple Farming"],
        technology: ["Cold Storage", "Weather Protection"]
      }
    },
    {
      position: [31.1471, 75.3412],
      name: "Punjab Grain Center",
      state: "Punjab",
      type: "Grain Production Hub",
      details: "Major grain production and processing center",
      resources: {
        equipment: ["Heavy Machinery", "Processing Units"],
        storage: ["Grain Silos", "Cold Storage"]
      }
    },
    {
      position: [29.0588, 76.0856],
      name: "Haryana Agri Complex",
      state: "Haryana",
      type: "Modern Farming",
      details: "Advanced farming techniques and equipment",
      resources: {
        technology: ["Smart Irrigation", "Soil Sensors"],
        training: ["Modern Farming", "Tech Usage"]
      }
    },

    // South India
    {
      position: [12.9716, 77.5946],
      name: "Karnataka Agri Hub",
      state: "Karnataka",
      type: "Tech Agriculture",
      details: "Technology-driven agricultural solutions",
      resources: {
        tech: ["AI Farming", "Drone Services"],
        crops: ["Coffee", "Spices"]
      }
    },
    {
      position: [13.0827, 80.2707],
      name: "Tamil Nadu Farm Center",
      state: "Tamil Nadu",
      type: "Diverse Agriculture",
      details: "Multiple crop varieties and techniques",
      resources: {
        crops: ["Rice", "Cotton", "Sugarcane"],
        tech: ["Modern Irrigation", "Processing"]
      }
    },
    {
      position: [10.8505, 76.2711],
      name: "Kerala Agriculture Zone",
      state: "Kerala",
      type: "Spice Farming",
      details: "Spice cultivation and processing",
      resources: {
        products: ["Spices", "Rubber", "Coconut"],
        services: ["Processing", "Export"]
      }
    },
    {
      position: [17.3850, 78.4867],
      name: "Telangana Agri Complex",
      state: "Telangana",
      type: "Modern Farming",
      details: "Advanced farming technologies",
      resources: {
        tech: ["Smart Farming", "Irrigation"],
        crops: ["Cotton", "Rice"]
      }
    },
    {
      position: [15.9129, 79.7400],
      name: "Andhra Farming Center",
      state: "Andhra Pradesh",
      type: "Coastal Agriculture",
      details: "Coastal region farming solutions",
      resources: {
        crops: ["Rice", "Tobacco", "Fruits"],
        tech: ["Aquaculture", "Processing"]
      }
    },

    // East India
    {
      position: [22.5726, 88.3639],
      name: "West Bengal Agri Hub",
      state: "West Bengal",
      type: "Rice Farming",
      details: "Rice cultivation and processing center",
      resources: {
        crops: ["Rice", "Jute", "Tea"],
        services: ["Processing", "Storage"]
      }
    },
    {
      position: [20.9517, 85.0985],
      name: "Odisha Farm Center",
      state: "Odisha",
      type: "Coastal Farming",
      details: "Coastal agriculture solutions",
      resources: {
        crops: ["Rice", "Pulses"],
        tech: ["Irrigation", "Processing"]
      }
    },
    {
      position: [25.5941, 85.1376],
      name: "Bihar Agriculture Zone",
      state: "Bihar",
      type: "Traditional Farming",
      details: "Traditional and modern farming blend",
      resources: {
        crops: ["Rice", "Wheat", "Maize"],
        services: ["Training", "Support"]
      }
    },

    // West India
    {
      position: [19.0760, 72.8777],
      name: "Maharashtra Agri Complex",
      state: "Maharashtra",
      type: "Diverse Agriculture",
      details: "Multiple crop varieties and techniques",
      resources: {
        crops: ["Cotton", "Sugarcane", "Grapes"],
        tech: ["Modern Irrigation", "Processing"]
      }
    },
    {
      position: [23.0225, 72.5714],
      name: "Gujarat Farm Hub",
      state: "Gujarat",
      type: "Cotton Farming",
      details: "Cotton cultivation and processing",
      resources: {
        crops: ["Cotton", "Groundnut"],
        tech: ["Processing", "Storage"]
      }
    },
    {
      position: [15.2993, 74.1240],
      name: "Goa Agri Center",
      state: "Goa",
      type: "Coastal Agriculture",
      details: "Coastal farming solutions",
      resources: {
        crops: ["Rice", "Coconut", "Cashew"],
        services: ["Processing", "Tourism"]
      }
    },

    // Central India
    {
      position: [23.2599, 77.4126],
      name: "Madhya Pradesh Farm Hub",
      state: "Madhya Pradesh",
      type: "Organic Farming",
      details: "Organic farming solutions",
      resources: {
        crops: ["Soybean", "Wheat"],
        services: ["Organic Certification", "Training"]
      }
    },
    {
      position: [21.2787, 81.8661],
      name: "Chhattisgarh Agri Center",
      state: "Chhattisgarh",
      type: "Rice Farming",
      details: "Rice cultivation expertise",
      resources: {
        crops: ["Rice", "Pulses"],
        tech: ["Processing", "Storage"]
      }
    },

    // Northeast India
    {
      position: [26.2006, 92.9376],
      name: "Assam Tea Center",
      state: "Assam",
      type: "Tea Cultivation",
      details: "Tea processing and cultivation",
      resources: {
        crops: ["Tea", "Rice"],
        services: ["Processing", "Export"]
      }
    },
    {
      position: [25.4670, 91.3662],
      name: "Meghalaya Organic Hub",
      state: "Meghalaya",
      type: "Organic Farming",
      details: "Organic farming solutions",
      resources: {
        crops: ["Organic Vegetables", "Fruits"],
        services: ["Certification", "Training"]
      }
    },
    // Add more Northeast states...
  ];

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1458/1458260.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
      });

      locations.forEach(location => {
        const resourcesHTML = Object.entries(location.resources)
          .map(([category, items]) => `
            <div class="resource-category">
              <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('');

        const marker = L.marker(location.position, { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div class="custom-popup">
              <h3>${location.name}</h3>
              <p class="location-state">State: ${location.state}</p>
              <p class="location-type">${location.type}</p>
              <p class="location-details">${location.details}</p>
              <div class="resources-container">
                ${resourcesHTML}
              </div>
              <button class="popup-button" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${location.position[0]},${location.position[1]}')">Get Directions</button>
            </div>
          `, { maxWidth: 300 });

        L.circle(location.position, {
          color: '#51B26A',
          fillColor: '#51B26A',
          fillOpacity: 0.1,
          radius: 25000
        }).addTo(map);
      });

      mapRef.current = map;
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filtered.length > 0) {
      const location = filtered[0];
      mapRef.current.setView(location.position, 13);
      setSelectedLocation(location);
    }
  };

  const navigateToExpertHome = () => {
    navigate("/expertHome"); // Adjust this path as needed
  };


  return (
    <div className="map-container">
      <div className="map-header">
        <h1>AgriConnect Resource Map</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by state, location or resource type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {selectedLocation && (
          <div className="selected-location">
            <h3>{selectedLocation.name}</h3>
            <p>State: {selectedLocation.state}</p>
            <p>{selectedLocation.type}</p>
            <p>{selectedLocation.details}</p>
          </div>
        )}
      </div>
      <div id="map"></div>
      <span className="navigate-btn" onClick={navigateToExpertHome}>
        Go to Expert Home
      </span>
    </div>
  );
};

export default InteractiveMap;