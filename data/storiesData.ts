import { BibleStory } from '../types';

type StoriesData = Record<string, BibleStory[]>;

export const STORIES_DATA: StoriesData = {
  English: [
    {
      id: 'jesus',
      name: 'Jesus Christ',
      role: 'The Son of God',
      image: 'https://images.pexels.com/photos/53959/summit-cross-peak-happiness-hochlantsch-mountain-53959.jpeg',
      meaningOfName: 'The Lord Saves',
      timeline: 'c. 4 BC – 30 AD',
      traits: ['Love', 'Sacrifice', 'Authority'],
      biography: ["Jesus of Nazareth is the central figure of the Christian faith. Born in Bethlehem, His life fulfilled ancient prophecies."]
    },
    {
      id: 'david',
      name: 'David',
      role: 'King of Israel',
      image: 'https://www.myjewishlearning.com/wp-content/uploads/2009/03/2048px-Gerard_van_Honthorst_-_King_David_Playing_the_Harp_-_Google_Art_Project-1595x900.jpg',
      meaningOfName: 'Beloved',
      traits: ['Courage', 'Musicality'],
      biography: ["A shepherd boy who became a giant-slayer and Israel's greatest king, known for his heart for God."]
    }
  ],
  Romanian: [
    {
      id: 'jesus',
      name: 'Isus Hristos',
      role: 'Fiul lui Dumnezeu',
      image: 'https://images.pexels.com/photos/53959/summit-cross-peak-happiness-hochlantsch-mountain-53959.jpeg',
      biography: ["Isus din Nazaret este figura centrală a credinței creștine."]
    }
  ],
  German: [
    {
      id: 'jesus',
      name: 'Jesus Christus',
      role: 'Sohn Gottes',
      image: 'https://images.pexels.com/photos/53959/summit-cross-peak-happiness-hochlantsch-mountain-53959.jpeg',
      biography: ["Jesus von Nazareth ist die zentrale Figur des christlichen Glaubens."]
    }
  ]
};