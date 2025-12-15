
import { BibleStory } from '../types';

type StoriesData = Record<string, BibleStory[]>;

// Image Constants
// Updated: Jesus image changed to safe Pexels URL.
const IMAGES = {
    jesus: 'https://images.pexels.com/photos/53959/summit-cross-peak-happiness-hochlantsch-mountain-53959.jpeg', 
    peter: 'https://ucatholic.com/wp-content/uploads/2017/06/SaintPeter.png',
    
    // Pixabay (Safe)
    mary: 'https://cdn.pixabay.com/photo/2023/01/30/03/35/virgin-mary-7754571_1280.jpg',
    
    // Classical Art (Public Domain)
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
      story: `Jesus of Nazareth is the central figure of Christianity, believed to be the Son of God and the Messiah. Born in Bethlehem to Mary and Joseph, he grew up in Nazareth.

At age 30, he began his public ministry, preaching about the Kingdom of God, healing the sick, and performing miracles like walking on water and raising the dead. His teachings focused on love, forgiveness, and humility.

He was crucified under Pontius Pilate but rose from the dead on the third day, conquering sin and death. His life and resurrection offer the hope of eternal life to all who believe in him.`
    },
    {
      id: 'mary',
      name: 'Mary',
      role: 'Mother of Jesus',
      image: IMAGES.mary,
      story: `Mary was a young woman from Nazareth who was chosen by God for a unique purpose. The angel Gabriel appeared to her and announced that she would give birth to the Son of the Most High, even though she was a virgin.

Her response, "I am the Lord's servant," demonstrates her immense faith and obedience. She gave birth to Jesus in a humble stable in Bethlehem.

Mary remained a faithful presence throughout Jesus' life, from his first miracle at Cana to standing at the foot of his cross during his crucifixion.`
    },
    {
      id: 'peter',
      name: 'Peter',
      role: 'The Rock',
      image: IMAGES.peter,
      story: `Originally named Simon, Peter was a fisherman from Galilee. Jesus called him to become a "fisher of men." He was bold and impulsive, famously walking on water towards Jesus before his faith wavered.

Although he denied knowing Jesus three times before the crucifixion, he was restored by the risen Christ.

Peter became a leader in the early church, preaching powerfully at Pentecost where 3,000 people were baptized. He authored two epistles in the New Testament.`
    },
    {
      id: 'david',
      name: 'David',
      role: 'King of Israel',
      image: IMAGES.david,
      story: `David started as a young shepherd boy who famously defeated the giant warrior Goliath with just a sling and a stone, trusting in the name of the Lord.

He became the second King of Israel and is described as "a man after God's own heart." He was a skilled musician and poet, writing many of the Psalms found in the Bible.

Despite his great failures, including his sin with Bathsheba, David's life is marked by deep repentance and a passionate love for God.`
    },
    {
      id: 'moses',
      name: 'Moses',
      role: 'The Deliverer',
      image: IMAGES.moses,
      story: `Born a Hebrew slave but raised as an Egyptian prince, Moses fled Egypt after killing an Egyptian. God spoke to him through a burning bush, calling him to lead the Israelites to freedom.

Through Moses, God performed the ten plagues and parted the Red Sea. On Mount Sinai, Moses received the Ten Commandments.

He led the people through the wilderness for 40 years, teaching them God's laws and preparing them for the Promised Land.`
    },
    {
      id: 'paul',
      name: 'Paul',
      role: 'Apostle to the Gentiles',
      image: IMAGES.paul,
      story: `Originally known as Saul of Tarsus, he was a fierce persecutor of Christians. On the road to Damascus, he was blinded by a light and encountered the risen Jesus.

This radical conversion transformed him into Paul, the greatest missionary of the early church. He traveled thousands of miles establishing churches and wrote much of the New Testament.

He endured prison, shipwrecks, and beatings, yet famously wrote, "For to me, to live is Christ and to die is gain."`
    }
  ],
  Romanian: [
    {
      id: 'jesus',
      name: 'Isus Hristos',
      role: 'Păstorul Cel Bun',
      image: IMAGES.jesus,
      story: `Isus din Nazaret este figura centrală a creștinismului, considerat Fiul lui Dumnezeu și Mesia. Născut în Betleem din Maria și Iosif, a crescut în Nazaret.

La vârsta de 30 de ani, și-a început lucrarea publică, propovăduind despre Împărăția lui Dumnezeu, vindecând bolnavii și făcând minuni precum mersul pe apă și învierea morților. Învățăturile sale s-au concentrat pe dragoste, iertare și smerenie.

A fost răstignit sub Pilat din Pont, dar a înviat a treia zi, biruind păcatul și moartea. Viața și învierea sa oferă speranța vieții veșnice tuturor celor ce cred în el.`
    },
    {
      id: 'mary',
      name: 'Maria',
      role: 'Mama lui Isus',
      image: IMAGES.mary,
      story: `Maria a fost o tânără din Nazaret aleasă de Dumnezeu pentru un scop unic. Îngerul Gavril i s-a arătat și i-a vestit că va naște pe Fiul Celui Preaînalt, deși era fecioară.

Răspunsul ei, „Iată roaba Domnului”, demonstrează credința și ascultarea ei imensă. L-a născut pe Isus într-un staul umil din Betleem.

Maria a rămas o prezență credincioasă de-a lungul vieții lui Isus, de la prima sa minune din Cana până la picioarele crucii în timpul răstignirii.`
    },
    {
      id: 'peter',
      name: 'Petru',
      role: 'Piatra',
      image: IMAGES.peter,
      story: `Numit inițial Simon, Petru era un pescar din Galileea. Isus l-a chemat să devină „pescar de oameni”. Era îndrăzneț și impulsiv, mergând pe apă spre Isus înainte ca credința să-i scadă.

Deși s-a lepădat de Isus de trei ori înainte de răstignire, a fost restaurat de Hristosul înviat.

Petru a devenit un lider în biserica primară, predicând cu putere la Cincizecime unde 3.000 de oameni au fost botezați. A scris două epistole în Noul Testament.`
    },
    {
      id: 'david',
      name: 'David',
      role: 'Regele Israelului',
      image: IMAGES.david,
      story: `David a început ca un tânăr păstor care l-a învins pe uriașul Goliat doar cu o praștie și o piatră, încrezându-se în numele Domnului.

A devenit al doilea rege al Israelului și este descris ca „un om după inima lui Dumnezeu”. A fost un muzician și poet iscusit, scriind mulți dintre Psalmii din Biblie.

În ciuda marilor sale eșecuri, inclusiv păcatul cu Batșeba, viața lui David este marcată de o pocăință profundă și o dragoste pasională pentru Dumnezeu.`
    },
    {
      id: 'moses',
      name: 'Moise',
      role: 'Eliberatorul',
      image: IMAGES.moses,
      story: `Născut sclav evreu dar crescut ca prinț egiptean, Moise a fugit din Egipt după ce a ucis un egiptean. Dumnezeu i-a vorbit printr-un rug aprins, chemându-l să-i conducă pe israeliți spre libertate.

Prin Moise, Dumnezeu a adus cele zece urgii și a despărțit Marea Roșie. Pe Muntele Sinai, Moise a primit Cele Zece Porunci.

A condus poporul prin pustie timp de 40 de ani, învățându-i legile lui Dumnezeu și pregătindu-i pentru Țara Făgăduinței.`
    },
    {
      id: 'paul',
      name: 'Pavel',
      role: 'Apostolul Neamurilor',
      image: IMAGES.paul,
      story: `Cunoscut inițial ca Saul din Tars, a fost un persecutor aprig al creștinilor. Pe drumul spre Damasc, a fost orbit de o lumină și l-a întâlnit pe Isus cel înviat.

Această convertire radicală l-a transformat în Pavel, cel mai mare misionar al bisericii primare. A călătorit mii de kilometri înființând biserici și a scris mare parte din Noul Testament.

A îndurat închisoare, naufragii și bătăi, totuși a scris faimosul verset: „Căci pentru mine a trăi este Hristos și a muri este un câștig”.`
    }
  ],
  German: [
    {
      id: 'jesus',
      name: 'Jesus Christus',
      role: 'Der Gute Hirte',
      image: IMAGES.jesus,
      story: `Jesus von Nazareth ist die zentrale Figur des Christentums, der Sohn Gottes und der Messias. Geboren in Bethlehem als Sohn von Maria und Josef, wuchs er in Nazareth auf.

Im Alter von 30 Jahren begann er seinen öffentlichen Dienst, predigte vom Reich Gottes, heilte Kranke und vollbrachte Wunder. Seine Lehren konzentrierten sich auf Liebe, Vergebung und Demut.

Er wurde unter Pontius Pilatus gekreuzigt, stand aber am dritten Tag von den Toten auf und besiegte Sünde und Tod. Sein Leben und seine Auferstehung bieten allen, die an ihn glauben, die Hoffnung auf ewiges Leben.`
    },
    {
      id: 'mary',
      name: 'Maria',
      role: 'Mutter Jesu',
      image: IMAGES.mary,
      story: `Maria war eine junge Frau aus Nazareth, die von Gott für einen einzigartigen Zweck auserwählt wurde. Der Engel Gabriel erschien ihr und verkündete, dass sie den Sohn des Höchsten gebären würde, obwohl sie Jungfrau war.

Ihre Antwort „Ich bin die Magd des Herrn“ zeigt ihren immensen Glauben und Gehorsam. Sie gebar Jesus in einem bescheidenen Stall in Bethlehem.

Maria blieb während Jesu Leben eine treue Begleiterin, von seinem ersten Wunder in Kana bis zum Fuß seines Kreuzes während seiner Kreuzigung.`
    },
    {
      id: 'peter',
      name: 'Petrus',
      role: 'Der Fels',
      image: IMAGES.peter,
      story: `Ursprünglich Simon genannt, war Petrus ein Fischer aus Galiläa. Jesus rief ihn, ein „Menschenfischer“ zu werden. Er war mutig und impulsiv und ging auf dem Wasser auf Jesus zu, bevor sein Glaube wankte.

Obwohl er Jesus vor der Kreuzigung dreimal verleugnete, wurde er vom auferstandenen Christus wiederhergestellt.

Petrus wurde ein Leiter der frühen Kirche und predigte mächtig zu Pfingsten, wo 3.000 Menschen getauft wurden. Er verfasste zwei Briefe im Neuen Testament.`
    },
    {
      id: 'david',
      name: 'David',
      role: 'König von Israel',
      image: IMAGES.david,
      story: `David begann als junger Hirtenjunge, der den riesigen Krieger Goliath nur mit einer Schleuder und einem Stein besiegte, im Vertrauen auf den Namen des Herrn.

Er wurde der zweite König von Israel und wird als „ein Mann nach dem Herzen Gottes“ beschrieben. Er war ein geschickter Musiker und Dichter und schrieb viele der Psalmen in der Bibel.

Trotz seiner großen Fehler, einschließlich seiner Sünde mit Bathseba, ist Davids Leben von tiefer Reue und einer leidenschaftlichen Liebe zu Gott geprägt.`
    },
    {
      id: 'moses',
      name: 'Mose',
      role: 'Der Befreier',
      image: IMAGES.moses,
      story: `Als hebräischer Sklave geboren, aber als ägyptischer Prinz erzogen, floh Mose aus Ägypten, nachdem er einen Ägypter getötet hatte. Gott sprach durch einen brennenden Dornbusch zu ihm und rief ihn, die Israeliten in die Freiheit zu führen.

Durch Mose brachte Gott die zehn Plagen und teilte das Rote Meer. Auf dem Berg Sinai empfing Mose die Zehn Gebote.

Er führte das Volk 40 Jahre lang durch die Wüste, lehrte sie Gottes Gesetze und bereitete sie auf das Gelobte Land vor.`
    },
    {
      id: 'paul',
      name: 'Paulus',
      role: 'Apostel der Heiden',
      image: IMAGES.paul,
      story: `Ursprünglich bekannt als Saulus von Tarsus, war er ein heftiger Verfolger von Christen. Auf dem Weg nach Damaskus wurde er von einem Licht geblendet und begegnete dem auferstandenen Jesus.

Diese radikale Bekehrung verwandelte ihn in Paulus, den größten Missionar der frühen Kirche. Er reiste Tausende von Kilometern, gründete Kirchen und schrieb einen Großteil des Neuen Testaments.

Er ertrug Gefängnis, Schiffbruch und Schläge, schrieb jedoch den berühmten Satz: „Denn Christus ist mein Leben, und Sterben ist mein Gewinn.“`
    }
  ]
};
