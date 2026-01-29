
export const MOCK_PRODUCE = [
  {
    id: 'p1',
    name: "Organic Vine Tomatoes",
    quantity: "1,200 kg",
    harvestTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // Expires in 4 hours
    status: "Cancelled",
    type: "Vegetable",
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    primaryBuyer: "Central Retail Corp",
  },
  {
    id: 'p2',
    name: "Alphonso Mangoes",
    quantity: "500 kg",
    harvestTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(), // Expires in 18 hours
    status: "Active",
    type: "Fruit",
    location: { lat: 12.9716, lng: 77.5946 },
    primaryBuyer: "FruitLoft Inc",
  },
  {
    id: 'p3',
    name: "Baby Spinach",
    quantity: "300 kg",
    harvestTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 1.5).toISOString(), // Expires in 1.5 hours
    status: "Cancelled",
    type: "Leafy Greens",
    location: { lat: 12.9716, lng: 77.5946 },
    primaryBuyer: "Green Basket",
  },
  {
    id: 'p4',
    name: "Bell Peppers (Mixed)",
    quantity: "800 kg",
    harvestTime: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // Expires in 48 hours
    status: "Active",
    type: "Vegetable",
    location: { lat: 12.9716, lng: 77.5946 },
    primaryBuyer: "PureVeg Co",
  }
];

export const MOCK_BUYERS = [
  {
    id: 'b1',
    name: "Metro Mart Logistics",
    distance: 4.2,
    pricePerKg: 45,
    rating: 4.8,
    pickupType: "Instant Pickup",
    availableSlots: ["Immediately", "In 1 hour"],
  },
  {
    id: 'b2',
    name: "FreshConnect Hub",
    distance: 12.5,
    pricePerKg: 42,
    rating: 4.5,
    pickupType: "Scheduled",
    availableSlots: ["In 3 hours", "Tomorrow AM"],
  },
  {
    id: 'b3',
    name: "EcoFarm Exports",
    distance: 28.1,
    pricePerKg: 48,
    rating: 4.9,
    pickupType: "Instant Pickup",
    availableSlots: ["Immediately"],
  },
  {
    id: 'b4',
    name: "Local Community Coop",
    distance: 2.1,
    pricePerKg: 38,
    rating: 4.2,
    pickupType: "Scheduled",
    availableSlots: ["In 2 hours"],
  },
  {
    id: 'b5',
    name: "Highland Greens",
    distance: 45.7,
    pricePerKg: 50,
    rating: 4.7,
    pickupType: "Instant Pickup",
    availableSlots: ["Immediately"],
  }
];
