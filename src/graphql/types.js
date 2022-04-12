const Planet = `
type Planet {
  id: Int,
  name: String,
  code: String,
  spaceCenters(id: Int,
    uid: String,
    name: String,
    description: String,
    latitude: Float,
    longitude: Float): SpaceCenter
}
`;

const SpaceCenter = `
type SpaceCenter {
  id: Int,
  uid: String,
  name: String,
  description: String,
  planet: [Planet]
  latitude: Float,
  longitude: Float,
  }
`;

module.exports = {
  Planet,
  SpaceCenter
};
