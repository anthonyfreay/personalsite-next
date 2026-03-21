const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.anthonyfreay.com';

const routes = [
  '/',
  '/work',
  '/live',
  '/bw',
  '/people',
  '/places',
  '/cars',
  '/events',
  '/contact',
];

const galleryImages = {
  '/bw': [
    { loc: '/bw/DSC05585-bw.webp', title: 'Tyler, the Creator' },
    { loc: '/bw/A7202360-bw.webp', title: 'City from on High' },
    { loc: '/bw/DSC01524-bw.webp', title: 'Exhausted' },
    { loc: '/bw/A7202339-bw.webp', title: 'Chrysler Building' },
    { loc: '/bw/DSC02678-bw.webp', title: 'Goldlink' },
    { loc: '/bw/DSC01358-bw.webp', title: '10th Ave' },
    { loc: '/bw/A7202347-bw.webp', title: 'Empire State Building' },
    { loc: '/bw/DSC02466-bw.webp', title: 'Defund the Police' },
    { loc: '/bw/DSC01930-bw.webp', title: 'Daniel Caesar' },
    { loc: '/bw/A7406794-bw.webp', title: 'Biking' },
    { loc: '/bw/A7406787-bw.webp', title: 'Gently Trash in NYC' },
    { loc: '/bw/DSC08655-bw.webp', title: 'Jack Harlow' },
    { loc: '/bw/DSC07973-bw.webp', title: 'Save the kids' },
    { loc: '/bw/RX709059-Edit-bw.webp', title: 'J Balvin' },
    { loc: '/bw/DSC01515-bw.webp', title: 'Over-looked' },
    { loc: '/bw/A7207520-bw.webp', title: 'Saron Crenshaw' },
    { loc: '/bw/A7201582-Edit-portrait.webp', title: 'Arize in Brooklyn' },
    { loc: '/bw/A7208259-Edit-bw.webp', title: 'Chelsea Cutler' },
    { loc: '/bw/DSC02743-bw.webp', title: 'Ice in my Veins' },
    { loc: '/bw/DSC08988-bw.webp', title: 'Taxi Driver' },
    { loc: '/bw/A7204510-bw.webp', title: 'Harbour along Oregon Coast' },
    { loc: '/bw/A7204635-bw.webp', title: 'Scary reflection in a window of an Oregon house' },
    { loc: '/bw/A7405342-bw.webp', title: 'Skating sideways' },
    { loc: '/bw/A7405350-bw.webp', title: 'Crash landing' },
    { loc: '/bw/A7406217-bw.webp', title: 'Mexico City Square' },
    { loc: '/bw/RX702300-bw.webp', title: 'Family on a Motorcycle' },
    { loc: '/bw/A7208874-bw.webp', title: 'Alone in the parking lot' },
  ],
  '/live': [
    { loc: '/live/DSC05584-music.webp', title: 'Tyler, the Creator' },
    { loc: '/live/A7206554-music.webp', title: 'Anik Khan' },
    { loc: '/live/DSC02184-music.webp', title: 'Daniel Caesar' },
    { loc: '/live/A7400207-Edit-music.webp', title: 'Alexa Porat' },
    { loc: '/live/RX704864-music.webp', title: 'Cautious Clay' },
    { loc: '/live/RX709066-Edit-music.webp', title: 'J Balvin' },
    { loc: '/live/RX704131-music.webp', title: 'Lizzie McAlpine' },
    { loc: '/live/RX701806-music.webp', title: 'Gracie Abrams' },
    { loc: '/live/RX701741-Enhanced-NR-music.webp', title: 'Gracie Abrams' },
    { loc: '/live/A7400474-music.webp', title: 'Tiffany Day' },
    { loc: '/live/RX708483-music.webp', title: 'Tai Verdes' },
    { loc: '/live/RX704917-music.webp', title: 'Cautious Clay' },
    { loc: '/live/A7400244-music.webp', title: 'Alexa Porat' },
    { loc: '/live/RX704049-Enhanced-NR-Edit-music.webp', title: 'Lizie McAlpine' },
    { loc: '/live/RX703010-Enhanced-NR-Edit-music.webp', title: 'WowGr8' },
    { loc: '/live/DSC05554-Enhanced-NR-music.webp', title: 'Tyler, The Creator singing sad' },
    { loc: '/live/RX704104-Edit-2-music.webp', title: 'Gracie Abrams' },
    { loc: '/live/DSC08431-Edit-music.webp', title: 'Jack Harlow' },
    { loc: '/live/A7400058-music.webp', title: 'JUNO' },
    { loc: '/live/DSC02629-music.webp', title: 'New Politics' },
    { loc: '/live/RX702447-music.webp', title: 'Olu' },
    { loc: '/live/DSC05693-Enhanced-NR-music.webp', title: 'Tyler, The Creator sillouette' },
    { loc: '/live/A7207787-music.webp', title: 'Alexander23' },
    { loc: '/live/DSC04170-music.webp', title: 'Jaden Smith' },
    { loc: '/live/DSC05678-Enhanced-NR-music.webp', title: 'Tyler, The Creator on Stage' },
    { loc: '/live/A7207540-music.webp', title: 'X Lovers' },
    { loc: '/live/A7208496-music.webp', title: 'Chelsea Cutler' },
    { loc: '/live/A7206805-music.webp', title: 'Sango' },
    { loc: '/live/RX704229-Enhanced-NR-Edit-music.webp', title: 'Lizzie McAlpine' },
    { loc: '/live/DSC06611-music.webp', title: 'Lauv' },
    { loc: '/live/RX703590-music.webp', title: 'Olu' },
    { loc: '/live/RX709090-music.webp', title: 'Nicki Minaj' },
  ],
  '/people': [
    { loc: '/people/DSC01179-Edit-portrait.webp', title: 'Em in Williamsburg' },
    { loc: '/people/DSC06349-portrait.webp', title: 'Kal looking over a fire escape' },
    { loc: '/people/A7404306-portrait.webp', title: 'Natalie Freay celebrating her enagement' },
    { loc: '/people/A7205925-portrait.webp', title: 'Dajee at Untermyer Gardens' },
    { loc: '/people/A7207181-portrait.webp', title: 'Dajee in Grand Central' },
    { loc: '/people/A7201581-Edit-portrait.webp', title: 'Arize in Studio' },
    { loc: '/people/A7205508-HDR-Edit-portrait.webp', title: 'Dajee at the MET Cloisters' },
    { loc: '/people/A7201742-Edit-portrait.webp', title: 'Camille in Studio' },
    { loc: '/people/A7204813-Edit-portrait.webp', title: 'Richard in his favorite green shirt' },
    { loc: '/people/DSC00436-Edit-portrait.webp', title: 'Em in Bryant Park' },
    { loc: '/people/A7209214-Edit-portrait.webp', title: 'Jenn in an alley' },
    { loc: '/people/A7404298-portrait.webp', title: 'Michael' },
    { loc: '/people/DSC07716-Edit-portrait.webp', title: 'Ben over Rio Grande' },
    { loc: '/people/A7200334-portrait.webp', title: 'Natalie at Liberty State Park' },
  ],
  '/places': [
    { loc: '/places/A7407286-scapes.webp', title: 'Landscape photography' },
    { loc: '/places/A7405233-scapes.webp', title: 'Travel photography' },
    { loc: '/places/A7407228-scapes.webp', title: 'Scenic landscape' },
    { loc: '/places/RX703948-scapes.webp', title: 'Nature photography' },
    { loc: '/places/A7204930-scapes.webp', title: 'Landscape detail' },
    { loc: '/places/RX703316-scapes.webp', title: 'Travel moment' },
    { loc: '/places/RX702154-scapes.webp', title: 'Street photography' },
    { loc: '/places/A7205360-color.webp', title: 'Colorful landscape' },
    { loc: '/places/RX706732-color.webp', title: 'Travel photography by Anthony Freay' },
    { loc: '/places/A7405906-color.webp', title: 'Scenic photography' },
    { loc: '/places/A7407432-scapes.webp', title: 'Landscape composition' },
    { loc: '/places/A7206508-Edit-scapes.webp', title: 'Travel destination' },
    { loc: '/places/RX702886-scapes.webp', title: 'Nature landscape' },
    { loc: '/places/A7407357-scapes.webp', title: 'Scenic view' },
    { loc: '/places/RX702276-scapes.webp', title: 'Street scene' },
    { loc: '/places/A7406572-scapes.webp', title: 'Landscape photography detail' },
    { loc: '/places/A7204586-HDR-scapes.webp', title: 'HDR landscape' },
    { loc: '/places/A7401638-scapes.webp', title: 'Travel photography moment' },
    { loc: '/places/A7405944-color.webp', title: 'Colorful travel scene' },
    { loc: '/places/A7407519-scapes.webp', title: 'Scenic landscape photography' },
    { loc: '/places/RX702351-scapes.webp', title: 'Street photography detail' },
    { loc: '/places/A7405591-color.webp', title: 'Travel destination photography' },
    { loc: '/places/A7406556-Edit-scapes.webp', title: 'Landscape edit' },
    { loc: '/places/A7202190-scapes.webp', title: 'Beams' },
    { loc: '/places/A7406558-scapes.webp', title: 'Tree' },
    { loc: '/places/RX706719-color.webp', title: 'Coney Island Rollercoaster' },
    { loc: '/places/A7406615-scapes.webp', title: 'Charleston' },
    { loc: '/places/A7202338-scapes.webp', title: 'Queens' },
    { loc: '/places/A7401731-Enhanced-NR-color.webp', title: 'Galapagos Summer' },
    { loc: '/places/A7204120-scapes.webp', title: 'Multnomah Falls' },
    { loc: '/places/A7205351-color.webp', title: 'San Francisco Summer' },
    { loc: '/places/A7206286-scapes.webp', title: 'Catskills Lake' },
    { loc: '/places/A7202369-scapes.webp', title: 'Ice Rink' },
    { loc: '/places/A7407416-scapes.webp', title: 'Paradise' },
    { loc: '/places/DSC09254-scapes.webp', title: 'Columbus Circle on a Rainy Weekday' },
    { loc: '/places/A7204896-scapes.webp', title: 'Pigeon Guillemot on Oregon Coast' },
    { loc: '/places/A7202361-scapes.webp', title: 'City Stacks' },
    { loc: '/places/RX702292-scapes.webp', title: "Mom's Apartment" },
    { loc: '/places/A7407477-scapes.webp', title: 'JETski' },
    { loc: '/places/A7205014-color.webp', title: 'San Francisco street sign' },
    { loc: '/places/RX703340-scapes.webp', title: 'Teleferico Quito' },
    { loc: '/places/A7407441-scapes.webp', title: 'Sitting in the Sun' },
    { loc: '/places/A7205161-color.webp', title: 'Muir Woods' },
    { loc: '/places/A7205308-color.webp', title: 'San Francisco Sunset' },
    { loc: '/places/A7401603-scapes.webp', title: 'Kids in Galapagos' },
    { loc: '/places/A7204601-HDR-scapes.webp', title: 'Pretty Oregon Coast line' },
    { loc: '/places/A7407388-scapes.webp', title: 'Kids playing in the Sand' },
    { loc: '/places/A7204910-scapes.webp', title: 'Sea Lions on the Oregon Coast' },
    { loc: '/places/A7209983-Edit-scapes.webp', title: 'Garret Mountain Basketball Court' },
    { loc: '/places/A7402155-HDR-scapes.webp', title: 'Volcano in Ecuador' },
    { loc: '/places/RX702346-scapes.webp', title: 'Guayaquil Highway' },
    { loc: '/places/A7401732-Enhanced-NR-color.webp', title: 'Tropical landscape' },
  ],
  '/cars': [
    { loc: '/cars/A7406517-Enhanced-NR-color.webp', title: 'Luxury car detail shot' },
    { loc: '/cars/A7405676-color.webp', title: 'Classic automobile photography' },
    { loc: '/cars/A7204618-color.webp', title: 'Automotive photography by Anthony Freay' },
    { loc: '/cars/A7406721-bw.webp', title: 'Black and white car portrait' },
    { loc: '/cars/A7409382-color.webp', title: 'Sports car in color' },
    { loc: '/cars/A7409342-color.webp', title: 'Modern automobile design' },
    { loc: '/cars/DSC04341-bw.webp', title: 'Classic car in black and white' },
    { loc: '/cars/A7200465-color.webp', title: 'Vintage car photography' },
    { loc: '/cars/A7200477-color.webp', title: 'Luxury vehicle detail' },
    { loc: '/cars/A7200475-color.webp', title: 'Automotive photography' },
    { loc: '/cars/A7406716-bw.webp', title: 'Car in monochrome' },
    { loc: '/cars/A7200462-color.webp', title: 'Classic automobile portrait' },
    { loc: '/cars/A7200488-color.webp', title: 'Vehicle detail shot' },
    { loc: '/cars/A7408915-color.webp', title: 'Modern car photography' },
    { loc: '/cars/A7406778-color.webp', title: 'Automotive detail by Anthony Freay' },
    { loc: '/cars/A7406726-bw.webp', title: 'Black and white automotive' },
    { loc: '/cars/A7406734-color.webp', title: 'Car in natural light' },
    { loc: '/cars/A7406717-bw.webp', title: 'Monochrome car portrait' },
    { loc: '/cars/A7209958-color.webp', title: 'Automotive photography detail' },
    { loc: '/cars/A7200461-color.webp', title: 'Classic car in color' },
  ],
  '/events': [
    { loc: '/events/A7401031-color.webp', title: 'Event celebration moment' },
    { loc: '/events/A7207716-color.webp', title: 'Party gathering photography' },
    { loc: '/events/A7400919-color.webp', title: 'Event attendees by Anthony Freay' },
    { loc: '/events/A7206906-color.webp', title: 'Celebration moment captured' },
    { loc: '/events/A7400937-color.webp', title: 'Event photography detail' },
    { loc: '/events/A7402659-color.webp', title: 'Party moment by Anthony Freay' },
    { loc: '/events/A7207820-color.webp', title: 'Event gathering candid shot' },
    { loc: '/events/A7208176-color.webp', title: 'Celebration photography' },
    { loc: '/events/A7407714-color.webp', title: 'Event attendees moment' },
    { loc: '/events/A7402648-color.webp', title: 'Party celebration captured' },
    { loc: '/events/A7207973-color.webp', title: 'Event moment photography' },
    { loc: '/events/A7208096-color.webp', title: 'Gathering candid shot' },
    { loc: '/events/A7208033-color.webp', title: 'Event celebration detail' },
    { loc: '/events/A7207913-color.webp', title: 'Party moment by photographer' },
    { loc: '/events/A7207907-color.webp', title: 'Event attendees candid' },
    { loc: '/events/A7407589-color.webp', title: 'Maddie Miller Bday Cake' },
    { loc: '/events/A7402701-color.webp', title: 'Event celebration photography' },
    { loc: '/events/A7401049-color.webp', title: 'Party gathering moment' },
    { loc: '/events/A7402526-color.webp', title: 'Event candid shot' },
    { loc: '/events/A7206966-color.webp', title: 'Abuela and Candeladia' },
    { loc: '/events/A7207859-color.webp', title: 'Event moment captured' },
    { loc: '/events/A7400963-color.webp', title: 'Celebration gathering photography' },
    { loc: '/events/A7206546-color.webp', title: 'Party attendees candid' },
    { loc: '/events/A7207942-color.webp', title: 'Event celebration moment' },
    { loc: '/events/A7404835-color.webp', title: 'Event celebration portrait' },
    { loc: '/events/A7404355-color.webp', title: 'Party attendee moment' },
    { loc: '/events/A7401037-color.webp', title: 'Event photography by Anthony Freay' },
    { loc: '/events/A7404555-color.webp', title: 'Celebration attendee portrait' },
    { loc: '/events/A7404514-color.webp', title: 'Event moment captured' },
    { loc: '/events/A7404632-color.webp', title: 'Party gathering portrait' },
    { loc: '/events/A7407621-color.webp', title: 'Event attendee candid' },
    { loc: '/events/A7207607-color.webp', title: 'Celebration moment portrait' },
    { loc: '/events/A7206591-color.webp', title: 'Mom, Cita, and Tio' },
    { loc: '/events/A7206528-color.webp', title: 'Event celebration detail' },
    { loc: '/events/A7404780-color.webp', title: 'Party moment portrait' },
    { loc: '/events/A7402521-color.webp', title: 'Event attendee photograph' },
    { loc: '/events/A7404479-color.webp', title: 'Celebration gathering portrait' },
    { loc: '/events/A7206559-color.webp', title: 'Event moment candid shot' },
    { loc: '/events/A7401130-color.webp', title: 'Jill and Kendall' },
    { loc: '/events/A7401014-color.webp', title: 'Event attendee portrait' },
    { loc: '/events/A7407559-color.webp', title: 'Party celebration candid' },
    { loc: '/events/A7206551-color.webp', title: 'DJ Bolivar' },
    { loc: '/events/A7206574-color.webp', title: 'Event moment photography' },
    { loc: '/events/A7404717-color.webp', title: 'Celebration attendee candid' },
    { loc: '/events/A7207740-color.webp', title: 'All The Way Down' },
    { loc: '/events/A7405071-color.webp', title: 'Event gathering moment' },
    { loc: '/events/A7206542-color.webp', title: 'Party attendee portrait' },
    { loc: '/events/A7207884-color.webp', title: 'Event celebration candid' },
    { loc: '/events/A7402743-color.webp', title: 'Celebration moment captured' },
    { loc: '/events/A7206535-color.webp', title: 'Event attendee moment' },
    { loc: '/events/A7405908-Enhanced-NR-color.webp', title: 'Party gathering photography' },
    { loc: '/events/A7404868-color.webp', title: 'Event moment portrait' },
    { loc: '/events/A7206529-color.webp', title: 'Cake' },
    { loc: '/events/A7206604-Enhanced-NR-color.webp', title: 'Event celebration detail' },
    { loc: '/events/A7405960-color.webp', title: 'Party moment candid shot' },
    { loc: '/events/A7405730-Enhanced-NR-color.webp', title: 'Celebration gathering candid' },
  ],
};

function buildImageEntries(route) {
  const images = galleryImages[route];
  if (!images) return '';
  return images
    .map(
      (img) => `    <image:image>
      <image:loc>${SITE_URL}${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>`
    )
    .join('\n');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
    .map((route) => {
      const imageEntries = buildImageEntries(route);
      return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
${imageEntries ? imageEntries + '\n' : ''}  </url>`;
    })
    .join('\n')}
</urlset>`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✓ Sitemap generated at public/sitemap.xml');
