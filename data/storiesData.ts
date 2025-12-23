
import { BibleStory } from '../types';

type StoriesData = Record<string, BibleStory[]>;

export const STORIES_DATA: StoriesData = {
  English: [
    {
        id: 'peter',
        name: 'Petrus (Simon Peter)',
        role: 'Fisherman of Galilee',
        image: 'https://static.wikia.nocookie.net/religionwiki/images/2/2d/Pope-peter_pprubens.jpg/revision/latest?cb=20090505145838',
        traits: ['Impetuous', 'Humble', 'Eye-witness', 'Restored'],
        biography: [
            "I remember the smell of salt and the rough texture of the nets. I was a simple man until the Master looked at me and said, 'Follow Me.'",
            "I walked on water for a moment, and I sank into the depths for a moment. I have known the highest joy and the bitterest cold of the night I failed Him.",
            "Ask me not of verses in a book yet to be written, but of the things I heard Him say as we walked the dusty roads of Judea."
        ]
    },
    {
        id: 'paul',
        name: 'Paul of Tarsus',
        role: 'Apostle to the Nations',
        image: 'https://media.swncdn.com/via/13071-probablyvalentindeboulogne-saintpaulwritinghi.jpg',
        traits: ['Intense', 'Scholarly', 'Bold', 'Visionary'],
        biography: [
            "I once sought to destroy this Way, until a light brighter than the sun blinded my eyes and opened my heart on the road to Damascus.",
            "My life is now a race, run not for a crown of leaves, but for the prize of the high calling of the Master.",
            "I speak of mysteries hidden for ages but now revealed. I have been beaten, shipwrecked, and imprisoned, yet the grace of the Lord is sufficient."
        ]
    }
  ],
  Romanian: [
    {
        id: 'peter',
        name: 'Petru (Simon)',
        role: 'Pescar din Galileea',
        image: 'https://static.wikia.nocookie.net/religionwiki/images/2/2d/Pope-peter_pprubens.jpg/revision/latest?cb=20090505145838',
        traits: ['Impulsiv', 'Smerit', 'Martor ocular', 'Restaurat'],
        biography: [
            "Îmi amintesc mirosul de sare și textura aspră a mrejilor. Eram un om simplu până când Învățătorul m-a privit și a spus: 'Vino după Mine.'",
            "Nu mă întreba de versete dintr-o carte care urmează să fie scrisă, ci de lucrurile pe care L-am auzit spunându-le."
        ]
    },
    {
        id: 'paul',
        name: 'Pavel din Tars',
        role: 'Apostolul Neamurilor',
        image: 'https://media.swncdn.com/via/13071-probablyvalentindeboulogne-saintpaulwritinghi.jpg',
        traits: ['Intens', 'Erudit', 'Îndrăzneț', 'Vizionar'],
        biography: [
            "Am căutat odată să distrug această Cale, până când o lumină mai strălucitoare decât soarele mi-a orbit ochii și mi-a deschis inima pe drumul spre Damasc."
        ]
    }
  ],
  German: [
    {
        id: 'peter',
        name: 'Petrus (Simon)',
        role: 'Fischer aus Galiläa',
        image: 'https://static.wikia.nocookie.net/religionwiki/images/2/2d/Pope-peter_pprubens.jpg/revision/latest?cb=20090505145838',
        traits: ['Ungestüm', 'Demütig', 'Augenzeuge', 'Wiederhergestellt'],
        biography: [
            "Ich erinnere mich an den Geruch von Salz und die raue Struktur der Netze. Ich war ein einfacher Mann, bis der Meister mich ansah.",
            "Frage mich nicht nach Versen in einem Buch, sondern nach den Dingen, die ich Ihn sagen hörte."
        ]
    },
    {
        id: 'paul',
        name: 'Paulus von Tarsus',
        role: 'Apostel der Völker',
        image: 'https://media.swncdn.com/via/13071-probablyvalentindeboulogne-saintpaulwritinghi.jpg',
        traits: ['Intensiv', 'Gelehrt', 'Kühn', 'Visionär'],
        biography: [
            "Einst versuchte ich, diesen Weg zu vernichten, bis ein Licht, heller als die Sonne, meine Augen blendete."
        ]
    }
  ]
};
