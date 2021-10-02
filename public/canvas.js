// Create 60000 tiny dots and spiral them around the sphere.
const DOT_COUNT = 60000;

// A hexagon with a radius of 2 pixels looks like a circle
const dotGeometry = new THREE.CircleGeometry(2, 5);

// The XYZ coordinate of each dot
const positions = [];

// A random identifier for each dot
const rndId = [];

// The country border each dot falls within
const countryIds = [];

const vector = new THREE.Vector3();

for (let i = DOT_COUNT; i >= 0; i--) {
    const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
    const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

    // Pass the angle between this dot an the Y-axis (phi)
    // Pass this dot’s angle around the y axis (theta)
    // Scale each position by 600 (the radius of the globe)
    vector.setFromSphericalCoords(600, phi, theta);
    dotGeometry.lookAt(vector);

    // Move the dot to the newly calculated position
    dotGeometry.translate(vector.x, vector.y, vector.z);
}

//We assign a color to each ISO country code
const COUNTRY_MAPPING = [
    [0, '#99cc99', 'at'],
    [1, '#993333', 'au'],
    [2, '#cccc00', 'be'],
];

// Load the color-coded image then get each pixel’s color
new ImageLoader().load('map.png', (mapImage) => {
    const imageData = getImageData(mapImage);
});

dotGeometry.computeBoundingSphere();
const uv = pointToUV(dotGeometry.boundingSphere.center, this.position);
const sample = sampleImage(uv, imageData);

// If there is no color data, return and move to the next dot
if (!sample[3]) return;
// Create a dot if there is color data
for (let i = 0; i < dotGeometry.faces.length; i++) {
    const face = dotGeometry.faces[i];

    // Create the vertices which make up the face of each dot
    positions.push(
        dotGeometry.vertices[face.a].x,
        dotGeometry.vertices[face.a].y,
        dotGeometry.vertices[face.a].z,
    // face.b, face.c
    );

    const [countryId] = getCountryId(sample);
    countryIds.push(countryId, countryId, countryId);
}

// Convert RGB to Hex and look up the countryId by color
function getCountryId([r, g, b, _]) {
    const hex = [r, g, b]
        .map((color) => color.toString(16).padStart(2, '0'))
        .join('');
    const countryId = COUNTRY_MAPPING.find(([_, id]) => id === hex);
    return countryId;
}