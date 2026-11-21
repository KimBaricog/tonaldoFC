// Describes which fields each website section has, so the "Site content" page can build its forms.
// Field types: text, textarea, list. A list has either `fields` (each item is a group of fields)
// or `of: 'text'` (each item is a single piece of text). `blank` creates a new empty item.

const text = (key, label, hint) => ({ key, label, hint, type: 'text' })
const area = (key, label, hint) => ({ key, label, hint, type: 'textarea' })
const list = (key, label, opts) => ({ key, label, type: 'list', ...opts })
const heading = [text('kick', 'Small label above the heading'), text('title', 'Heading'), area('text', 'Intro text')]

export const SCHEMA = [
  { id: 'site', label: 'Contact details & top bar', fields: [
    text('phone', 'Phone number'), text('email', 'Email address'), text('topbar', 'Top bar text (top right)'),
    area('footerAbout', 'Footer: about text'), text('footerAddress', 'Footer: address'),
  ] },
  { id: 'nav', label: 'Menu links', fields: [
    list('items', 'Links', { titleKey: 'label', itemName: 'link', blank: () => ({ label: 'New link', href: '#' }),
      fields: [text('label', 'Text'), text('href', 'Goes to', 'Use #about, #programs, #gallery or #contact to jump to a section')] }),
  ] },
  { id: 'hero', label: 'Top banner', fields: [
    text('tag', 'Small tag above the heading'), text('line1', 'Heading line 1'), text('line2', 'Heading line 2'), text('line3', 'Heading line 3'),
    area('text', 'Intro text'), text('primaryButton', 'Main button'), text('secondaryButton', 'Second button'),
    text('badge1Title', 'Floating badge 1: title'), text('badge1Text', 'Floating badge 1: text'),
    text('badge2Title', 'Floating badge 2: title'), text('badge2Text', 'Floating badge 2: text'),
  ] },
  { id: 'info', label: 'Info bar under the banner', fields: [
    list('items', 'Boxes', { titleKey: 'title', itemName: 'box', blank: () => ({ icon: '★', title: 'New box', text: '' }),
      fields: [text('icon', 'Icon (one symbol)'), text('title', 'Title'), area('text', 'Text', 'Press Enter for a new line')] }),
  ] },
  { id: 'features', label: 'Why Tonaldo FC', fields: [
    ...heading,
    list('items', 'Cards', { titleKey: 'title', itemName: 'card', blank: () => ({ icon: '★', title: 'New card', text: '' }),
      fields: [text('icon', 'Icon (one symbol)'), text('title', 'Title'), area('text', 'Text')] }),
  ] },
  { id: 'training', label: '1-on-1 training', fields: [
    ...heading,
    list('pillars', 'Checklist', { of: 'text', itemName: 'point', blank: () => 'New point' }),
    text('button', 'Button'),
  ] },
  { id: 'programs', label: 'Programs', fields: [
    ...heading, text('linkText', 'Link text on each card'),
    list('items', 'Programs', { titleKey: 'name', itemName: 'program', blank: () => ({ tag: 'New', age: '', name: 'New program', text: '', pts: [] }),
      fields: [text('name', 'Name'), text('age', 'Age group (big text)'), text('tag', 'Small tag'), area('text', 'Description'),
        list('pts', 'Bullet points', { of: 'text', itemName: 'point', blank: () => 'New point' })] }),
  ] },
  { id: 'steps', label: 'Getting started steps', fields: [
    text('kick', 'Small label above the heading'), text('title', 'Heading'),
    list('items', 'Steps', { titleKey: 'title', itemName: 'step', blank: () => ({ title: 'New step', text: '' }), fields: [text('title', 'Title'), area('text', 'Text')] }),
  ] },
  { id: 'stats', label: 'Numbers strip', fields: [
    list('items', 'Numbers', { titleKey: 'label', itemName: 'number', blank: () => ({ value: '0', label: 'New' }), fields: [text('value', 'Number or text'), text('label', 'Label')] }),
  ] },
  { id: 'hours', label: 'Opening hours', fields: [
    ...heading, text('button', 'Button'), text('tableTitle', 'Table title'),
    list('items', 'Hours', { titleKey: 'day', itemName: 'row', blank: () => ({ day: 'Day', time: '9:00am – 5:00pm' }),
      fields: [text('day', 'Days (e.g. Monday – Friday)'), text('time', 'Times (e.g. 9:00am – 9:00pm)', 'Write times like 9:00am – 9:00pm so the "Open now" badge works')] }),
  ] },
  { id: 'locations', label: 'Locations & map', fields: [
    ...heading.slice(0, 2), area('text', 'Intro text', 'Use {count} to show the number of locations'),
    text('noAddressText', 'Text when a location has no address yet'), text('directionsButton', 'Directions button'), text('callButton', 'Call button'),
    list('items', 'Locations', { titleKey: 'name', itemName: 'location',
      blank: () => ({ id: `loc-${Date.now().toString(36)}`, name: 'New location', address: '', mapQuery: '', note: '' }),
      fields: [text('name', 'Name (suburb)'), text('address', 'Exact venue address', 'Leave empty if not known: the map then shows the suburb'),
        text('mapQuery', 'Map search (used when there is no address)', 'e.g. Werribee, VIC, Australia'), text('note', 'Small label (optional)', 'e.g. Main academy base')] }),
  ] },
  { id: 'coaches', label: 'Coaches heading', fields: heading },
  { id: 'gallery', label: 'Gallery heading', fields: heading },
  { id: 'testimonials', label: 'Testimonials', fields: [
    text('kick', 'Small label above the heading'), text('title', 'Heading'),
    list('items', 'Testimonials', { titleKey: 'who', itemName: 'testimonial', blank: () => ({ initial: 'A', who: 'Name', detail: '', quote: '' }),
      fields: [area('quote', 'Quote'), text('who', 'Who'), text('detail', 'Detail (e.g. Parent, Melton)'), text('initial', 'Initial for the circle')] }),
  ] },
  { id: 'sponsors', label: 'Sponsors heading', fields: [...heading, text('ctaTitle', 'Become a sponsor: title'), area('ctaText', 'Become a sponsor: text'), text('ctaButton', 'Become a sponsor: button')] },
  { id: 'cta', label: 'Call to action banner', fields: [text('title', 'Heading'), area('text', 'Text'), text('button', 'Button (also the menu button)')] },
  { id: 'faq', label: 'FAQ', fields: [
    text('kick', 'Small label above the heading'), text('title', 'Heading'),
    list('items', 'Questions', { titleKey: 'question', itemName: 'question', blank: () => ({ question: 'New question', answer: '' }),
      fields: [text('question', 'Question'), area('answer', 'Answer')] }),
  ] },
  { id: 'contact', label: 'Enquiry form', fields: [
    text('title', 'Heading'), text('text', 'Text under the heading'), text('button', 'Send button'),
    list('ageGroups', 'Age group choices', { of: 'text', itemName: 'choice', blank: () => 'New group' }),
  ] },
]
