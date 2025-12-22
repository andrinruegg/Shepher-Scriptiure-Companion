
import { BibleStory } from '../types';

type StoriesData = Record<string, BibleStory[]>;

const IMAGES = {
    jesus: 'https://images.pexels.com/photos/53959/summit-cross-peak-happiness-hochlantsch-mountain-53959.jpeg', 
    mary: 'https://cdn.pixabay.com/photo/2023/01/30/03/35/virgin-mary-7754571_1280.jpg',
    peter: 'https://ucatholic.com/wp-content/uploads/2017/06/SaintPeter.png',
    david: 'https://www.myjewishlearning.com/wp-content/uploads/2009/03/2048px-Gerard_van_Honthorst_-_King_David_Playing_the_Harp_-_Google_Art_Project-1595x900.jpg',
    moses: 'https://cdn.prod.website-files.com/5b8fd783bee52c8fb59b1fac/61cdcae233925b85b530449d_Moses%2520A%2520Not%2520Quite%2520Mortal%2520Moses.jpeg',
    paul: 'https://media.swncdn.com/via/13071-probablyvalentindeboulogne-saintpaulwritinghi.jpg'
};

export const STORIES_DATA: StoriesData = {
  English: [
    {
      id: 'jesus',
      name: 'Jesus Christ',
      role: 'The Good Shepherd',
      image: IMAGES.jesus,
      biography: ["Jesus of Nazareth is the central figure of Christianity, believed to be the Son of God and the Messiah who redeemed the world through His life, death, and resurrection."]
    },
    {
      id: 'mary',
      name: 'Mary',
      role: 'Mother of Jesus',
      image: IMAGES.mary,
      biography: ["Chosen by God to be the mother of the Savior, Mary's life is a testimony of humble obedience and unwavering faith."]
    },
    {
      id: 'peter',
      name: 'Peter',
      role: 'The Rock',
      image: IMAGES.peter,
      biography: ["Originally a fisherman named Simon, he became one of the closest apostles to Jesus and a foundational leader of the early Church."]
    },
    {
      id: 'david',
      name: 'David',
      role: 'King of Israel',
      image: IMAGES.david,
      biography: ["A shepherd boy who became a giant-slayer and Israel's greatest king, known for his heart for God and authoring many of the Psalms."]
    },
    {
      id: 'moses',
      name: 'Moses',
      role: 'The Deliverer',
      image: IMAGES.moses,
      biography: ["Raised in Pharaoh's court but chosen to lead the Israelites out of slavery in Egypt and receive the Law of God at Mount Sinai."]
    },
    {
      id: 'paul',
      name: 'Paul',
      role: 'Apostle to the Gentiles',
      image: IMAGES.paul,
      biography: ["Formerly a persecutor of the Church, Saul of Tarsus had a radical encounter with the risen Christ that transformed him into the greatest missionary of the New Testament."]
    }
  ],
  Romanian: [
    {
      id: 'jesus',
      name: 'Isus Hristos',
      role: 'Fiul lui Dumnezeu',
      image: IMAGES.jesus,
      biography: ["Isus din Nazaret este figura centrală a credinței creștine."]
    },
    {
        id: 'mary',
        name: 'Maria',
        role: 'Mama lui Isus',
        image: IMAGES.mary,
        biography: ["Aleasă de Dumnezeu pentru a fi mama Mântuitorului."]
    },
    {
        id: 'peter',
        name: 'Petru',
        role: 'Piatra',
        image: IMAGES.peter,
        biography: ["Un pescar care a devenit un stâlp al Bisericii timpurii."]
    }
  ],
  German: [
    {
      id: 'jesus',
      name: 'Jesus Christus',
      role: 'Sohn Gottes',
      image: IMAGES.jesus,
      biography: ["Jesus von Nazareth ist die zentrale Figur des christlichen Glaubens."]
    },
    {
        id: 'mary',
        name: 'Maria',
        role: 'Mutter Jesu',
        image: IMAGES.mary,
        biography: ["Von Gott auserwählt, die Mutter des Erlösers zu sein."]
    },
    {
        id: 'peter',
        name: 'Petrus',
        role: 'Der Fels',
        image: IMAGES.peter,
        biography: ["Ein Fischer, der zu einem der engsten Jünger Jesu wurde."]
    }
  ]
};
