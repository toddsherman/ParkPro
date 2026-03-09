const mapboxgl = {
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
    addControl: jest.fn(),
    getCanvas: jest.fn(() => ({
      style: {},
    })),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
    getElement: jest.fn(() => document.createElement("div")),
  })),
  NavigationControl: jest.fn(),
  supported: jest.fn(() => true),
};

export default mapboxgl;
