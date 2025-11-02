import React from "react";
import "./Collaboration.css";

// Collaboration data (15 examples)
const collaborationsData = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1663040178972-ee1d45d33899?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "Flood Relief Operation",
    place: "Addis Ababa, Ethiopia",
    date: "2025-09-15",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1710022115470-9a6c05ce5a28?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    title: "Earthquake Response",
    place: "Bahir Dar, Ethiopia",
    date: "2025-08-10",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1661396472785-6a983fd4534c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "Fire Disaster Aid",
    place: "Dire Dawa, Ethiopia",
    date: "2025-07-21",
  },
  {
    id: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1664303030100-745585532de5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073",
    title: "Storm Relief Mission",
    place: "Hawassa, Ethiopia",
    date: "2025-06-05",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1561673879-297ac83cafc7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    title: "Food Distribution Campaign",
    place: "Gondar, Ethiopia",
    date: "2025-05-18",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1616416354008-3007299b4933?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "Medical Aid for Flood Victims",
    place: "Mekelle, Ethiopia",
    date: "2025-04-12",
  },
  {
    id: 7,
    image:
      "https://plus.unsplash.com/premium_photo-1663045423469-aade0c24bd6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1lcmdlbmN5JTIwc2hlbHRlciUyMHNldHVwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    title: "Emergency Shelter Setup",
    place: "Jimma, Ethiopia",
    date: "2025-03-30",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1733162948632-4dd8610b4d5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "Winter Clothing Distribution",
    place: "Addis Ababa, Ethiopia",
    date: "2025-02-20",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1677907564161-7279d5aac75f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBzdXBwbHklMjBhaWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    title: "Water Supply for Disaster Zone",
    place: "Adama, Ethiopia",
    date: "2025-01-15",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1728322150375-d6a2accce6d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "Community Relief Initiative",
    place: "Bahir Dar, Ethiopia",
    date: "2024-12-10",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1728804956804-7f02c9671c56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    title: "River Flood Rescue",
    place: "Awash, Ethiopia",
    date: "2025-09-02",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1759411354058-9e429834f92f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1062",
    title: "Drought Relief Distribution",
    place: "Somali Region, Ethiopia",
    date: "2025-08-20",
  },
  {
    id: 13,
    image:
      "https://unsplash.com/photos/a-man-on-a-high-voltage-power-line-GbApVsOZ3jUhttps://images.unsplash.com/photo-1627207278573-58ecc196e08e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    title: "Electrical Accident Assistance",
    place: "Addis Ababa, Ethiopia",
    date: "2025-07-14",
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1509587584298-0ffb77f9f69c",
    title: "Unstoppable Fire Evacuation",
    place: "Dire Dawa, Ethiopia",
    date: "2025-06-28",
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7",
    title: "Heavy Flood Relief",
    place: "Awassa, Ethiopia",
    date: "2025-05-05",
  },
];

const Collaboration = () => {
  return (
    <div className="collaboration-section">
      <div className="collab-note">
        <p>
          Our team has actively participated in numerous disaster relief
          operations across Ethiopia. These collaborations represent emergency
          response efforts in floods, fires, droughts, electrical accidents, and
          storms. Every action demonstrates our commitment to saving lives and
          helping communities.
        </p>
      </div>
      <div className="collab-grid">
        {collaborationsData.map((c) => (
          <div key={c.id} className="collab-card">
            <img src={c.image} alt={c.title} className="collab-photo" />
            <div className="collab-info">
              <h3>{c.title}</h3>
              <p>{c.place}</p>
              <p>{c.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaboration;
