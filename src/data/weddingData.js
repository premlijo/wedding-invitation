import christiansong from '../assets/christiansong.mp3';
import caricatureLijo from '../assets/caricature-lijo.png';
import caricatureJaisha from '../assets/caricature-jaisha.png';
import coupleImage from '../assets/wedding.png';

export const weddingData = {
  // Couple Information - Groom First
  groom: {
    firstName: "Prem Lijo",
    lastName: "P",
    fullName: "Prem Lijo",
    parents: "Mr. C. Premaraj & Mrs. M.S. Sheeba Sherin",
    fatherTitle: "Headmaster, Scott Christian Hr. Sec. School, Nagercoil",
    motherTitle: "Headmistress, L.M.S Tamil H.S. Parassala",
    address: "PS Cottage, Alumoodu, Nithiravilai Post., Kanyakumari District.",
    mobile: "94425 43103"
  },
  bride: {
    firstName: "Jaisha",
    lastName: "J",
    fullName: "Jaisha",
    parents: "Mr. J. Jeyaraj & Mrs. R. Evangeline",
    address: "Themanoor, Thiruvattar Post."
  },
  
  // Wedding Date & Time
  weddingDate: {
    day: 19,
    month: "October",
    year: 2026,
    fullDate: "19th October 2026",
    dayOfWeek: "Monday",
    time: "10:00 AM"
  },
  
  // Ceremony Information
  ceremony: {
    venue: "C.S.I. Pastorate Church",
    address: "Themanoor",
    city: "Themanoor",
    state: "Tamil Nadu",
    qrLabel: "Scan Here for Wedding Location"
  },
  
  // Wedding Functions
  weddingFunctions: {
    venue: "C.S.I. Hacker Auditorium",
    location: "Payanam",
    address: "Near Marthandam",
    qrLabel: "Scan Here for Function Location"
  },
  
  // Officiant
  officiant: {
    name: "Rt. Rev. Dr. S. Christopher Vijayan",
    title: "Bishop C.S.I. Kanyakumari Diocese"
  },

  // Reception Guest of Honor
  receptionGuest: {
    name: "Rt. Rev. Dr. Prinstone Ben",
    title: "Bishop, C.S.I. South Kerala Diocese"
  },
  
  // Reception Information
  reception: {
    date: "19-10-2026",
    day: "Monday",
    time: "5.00 p.m. onwards",
    venue: "Karunakaran Auditorium",
    location: "Nadaikavu",
    qrLabel: "Scan Here for Reception Location"
  },
  
  // Map URLs
  weddingMapUrl: "https://maps.app.goo.gl/15b6sxF7WpoheJmn9",
  functionMapUrl: "https://maps.app.goo.gl/MJMHFcaBt4CY6ndg6",
  receptionMapUrl: "https://maps.app.goo.gl/pbjU1z7f1WkzJNVs7",
  
  // Bible Verse
  bibleVerse: {
    text: "The Lord has made everything beautiful in its time.",
    reference: "Ecclesiastes 3:11"
  },
  
  // Groom-side Family
  groomFamily: {
    heading: "We cordially solicit your esteemed presence and prayer with family at the Holy Matrimony of our beloved son",
    fatherName: "Mr. C. Premaraj",
    fatherTitle: "Headmaster, Scott Christian Hr. Sec. School, Nagercoil",
    motherName: "Mrs. M.S. Sheeba Sherin",
    motherTitle: "Headmistress, L.M.S Tamil HS Parassala",
    address: "PS Cottage, Alumoodu, Nithiravilai Post., Kanyakumari District.",
    mobile: "94425 43103"
  },
  
  // Closing Message
  closing: {
    message: "The Reception function will be graced by the esteemed presence of Rt. Rev. Dr. Prinstone Ben (Bishop, C.S.I. South Kerala Diocese)",
    compliments: "With Best Compliments From",
    signatory: "Prem Leo",
    kin: "Kith & Kin"
  },
  
  // Images - Using high-quality placeholder images
  images: {
    hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    couple: coupleImage,
    groom: caricatureLijo,
    bride: caricatureJaisha,
    venue: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80",
    reception: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
    final: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
  },
  
  // Music
  music: {
    url: christiansong,
    title: "Wedding Music"
  },
  
  // Navigation - Updated order
  navigation: [
    { id: "home", label: "Home" },
    { id: "couple", label: "The Couple" },
    { id: "wedding", label: "Wedding" },
    { id: "reception", label: "Reception" },
    { id: "venue", label: "Venue" }
  ]
};
