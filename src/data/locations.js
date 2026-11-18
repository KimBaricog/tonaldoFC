// Training locations shown in the "Find us" section.
// To add a location, copy one line and edit it. The first one is selected by default.
//  - address:  the exact venue address. Leave '' if it isn't known yet: the card then says
//              "contact us for the exact venue" and the map shows the suburb area.
//  - mapQuery: what Google Maps searches for (used when there is no address).
//  - note:     optional small label under the name (e.g. "Main academy base").
export const LOCATIONS = [
  { id: 'harkness', name: 'Harkness', address: '44 Wallangarra Blvd, Harkness, Melton VIC 3337', mapQuery: 'Harkness, VIC, Australia', note: 'Main academy base' },
  { id: 'melton-west', name: 'Melton West', address: '', mapQuery: 'Melton West, VIC, Australia', note: '' },
  { id: 'melton-south', name: 'Melton South', address: '', mapQuery: 'Melton South, VIC, Australia', note: '' },
  { id: 'werribee', name: 'Werribee', address: '', mapQuery: 'Werribee, VIC, Australia', note: '' },
  { id: 'caroline-springs', name: 'Caroline Springs', address: '', mapQuery: 'Caroline Springs, VIC, Australia', note: '' },
  { id: 'epping', name: 'Epping', address: '', mapQuery: 'Epping, VIC, Australia', note: '' },
]
