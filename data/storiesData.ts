
import { BibleStory } from '../types';

type StoriesData = Record<string, BibleStory[]>;

const IMAGES = {
    jesus: 'https://images.pexels.com/photos/53959/summit-cross-peak-happiness-hochlantsch-mountain-53959.jpeg', 
    peter: 'https://ucatholic.com/wp-content/uploads/2017/06/SaintPeter.png',
    mary: 'https://cdn.pixabay.com/photo/2023/01/30/03/35/virgin-mary-7754571_1280.jpg',
    david: 'https://www.myjewishlearning.com/wp-content/uploads/2009/03/2048px-Gerard_van_Honthorst_-_King_David_Playing_the_Harp_-_Google_Art_Project-1595x900.jpg',
    moses: 'https://cdn.prod.website-files.com/5b8fd783bee52c8fb59b1fac/61cdcae233925b85b530449d_Moses%2520A%2520Not%2520Quite%2520Mortal%2520Moses.jpeg',
    paul: 'https://media.swncdn.com/via/13071-probablyvalentindeboulogne-saintpaulwritinghi.jpg'
};

export const STORIES_DATA: StoriesData = {
  English: [
    {
      id: 'jesus',
      name: 'Jesus Christ',
      role: 'The Son of God',
      image: IMAGES.jesus,
      meaningOfName: 'The Lord Saves (Yeshua)',
      timeline: 'c. 4 BC – 30 AD',
      traits: ['Love', 'Humility', 'Sacrifice', 'Authority', 'Compassion'],
      family: {
          parents: 'God the Father / Joseph (Adoptive) & Mary',
          siblings: 'James, Joseph, Judas, Simon (Half-brothers)',
      },
      keyVerses: [
          { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
          { ref: "John 14:6", text: "I am the way and the truth and the life. No one comes to the Father except through me." },
          { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." }
      ],
      biography: [
          "Jesus of Nazareth is the central figure of human history and the Christian faith. The Gospel of John describes Him as the 'Word' (Logos) who was with God in the beginning and was God, through whom all things were made. He laid aside His divine glory to enter humanity, conceived by the Holy Spirit and born of the Virgin Mary in the humble town of Bethlehem, fulfilling ancient prophecies.",
          "His early life remains largely a mystery, save for a brief glimpse at age twelve when He was found in the Temple, astounding the religious teachers with His understanding. He grew up in Nazareth, a town of little repute, working as a 'tekton' (carpenter or builder), experiencing the mundane realities of human life, obedience, and labor.",
          "Around the age of thirty, Jesus began His public ministry after being baptized by John the Baptist in the Jordan River. As He emerged from the water, the heavens opened, the Spirit descended like a dove, and the Father’s voice thundered, 'This is my Son, whom I love; with him I am well pleased.' Immediately following this, He endured forty days of fasting and temptation by Satan in the wilderness, emerging victorious where Adam and Israel had failed.",
          "Jesus called twelve ordinary men—fishermen, a tax collector, and zealots—to be His disciples. With this ragtag group, He traveled throughout Judea and Galilee, proclaiming the arrival of the Kingdom of God. His ministry was characterized by compassion for the outcast: He touched lepers, dined with sinners, honored women, and welcomed children.",
          "His teaching was unlike anything the world had heard. In the Sermon on the Mount, He revolutionized ethics, teaching that hatred is murder of the heart and lust is adultery of the heart. He spoke in parables—stories of lost sheep, prodigal sons, and mustard seeds—that revealed the hidden mysteries of God's Kingdom to the humble while confounding the proud.",
          "Miracles authenticated His message. He turned water into wine, calmed raging storms with a word, fed thousands with a boy's lunch, opened blind eyes, and raised Lazarus from the dead. These were not just magic tricks but 'signs' pointing to the restoration of creation and His identity as the Messiah.",
          "However, His claims of divinity and His challenge to the religious status quo drew the ire of the Pharisees and Sadducees. He entered Jerusalem on a donkey to shouts of 'Hosanna,' but within days, the cheers turned to jeers. After sharing a final Passover meal with His disciples, He was betrayed by Judas Iscariot and arrested in the Garden of Gethsemane.",
          "Enduring a sham trial, brutal scourging, and mockery, Jesus was condemned to death by Pontius Pilate. He carried His cross to Golgotha, where He was crucified. In His final moments, He prayed for His executioners, 'Father, forgive them,' and declared, 'It is finished.' The sky turned dark, the earth shook, and the Temple curtain tore in two.",
          "His body was laid in a borrowed tomb, sealed and guarded. But death could not hold the Author of Life. On the third day, the stone was rolled away, and Jesus rose bodily from the grave. He appeared to Mary Magdalene, the apostles, and over five hundred others, proving His victory over sin and death.",
          "Before ascending to Heaven, He gave His followers the Great Commission: to go and make disciples of all nations. He promised He would not leave them as orphans but would send the Holy Spirit. Today, Jesus sits at the right hand of the Father, interceding for us, and the church awaits His promised return to judge the living and the dead and to make all things new."
      ]
    },
    {
      id: 'mary',
      name: 'Mary',
      role: 'Mother of Jesus',
      image: IMAGES.mary,
      meaningOfName: 'Beloved / Rebellious (context dependent)',
      timeline: '1st Century BC – 1st Century AD',
      traits: ['Obedience', 'Faith', 'Fortitude', 'Devotion'],
      family: {
          parents: 'Joachim and Anne (Tradition)',
          spouse: 'Joseph',
          children: 'Jesus, James, Joseph, Judas, Simon'
      },
      keyVerses: [
          { ref: "Luke 1:38", text: "I am the Lord’s servant... May your word to me be fulfilled." },
          { ref: "Luke 1:46-47", text: "My soul glorifies the Lord and my spirit rejoices in God my Savior." },
          { ref: "John 2:5", text: "Do whatever he tells you." }
      ],
      biography: [
          "Mary of Nazareth stands as a supreme example of faith and surrender in the biblical narrative. A young Jewish woman of humble means, she was betrothed to a carpenter named Joseph when her life was irrevocably changed. The Angel Gabriel appeared to her with a startling announcement: she would conceive by the Holy Spirit and bear the Son of the Most High.",
          "Her response to this terrifying and socially dangerous calling defines her legacy. Despite the risk of public shame, divorce, or even stoning, she uttered the words that opened the door for salvation: 'I am the Lord’s servant. May your word to me be fulfilled.' She then traveled to visit her cousin Elizabeth, where she sang the Magnificat, a powerful hymn of praise celebrating God’s championing of the humble.",
          "The nativity story highlights her resilience. Heavily pregnant, she endured the arduous journey to Bethlehem and gave birth to the King of Kings in the poverty of a stable, wrapping Him in cloths and placing Him in a manger. She 'treasured up all these things and pondered them in her heart,' observing the shepherds and wise men who came to worship her Son.",
          "Motherhood for Mary was a mix of wonder and sword-piercing sorrow, as prophesied by Simeon. She and Joseph raised Jesus in obedience to the Law, fleeing to Egypt to protect Him from Herod and later searching frantically for Him when He stayed behind in the Temple at age twelve. She knew early on that He belonged not just to her, but to His Father.",
          "Mary appears at key moments in Jesus' ministry. At the Wedding at Cana, she prompted His first miracle, demonstrating her confidence in Him by telling the servants, 'Do whatever he tells you.' Even when His family worried He was out of his mind, she remained a constant, quiet presence in the background of His rising fame.",
          "Her greatest trial came at the cross. While most disciples fled in fear, Mary stood steadfast at Golgotha, watching her Son suffer the agony of crucifixion. In one of His final acts, Jesus entrusted her care to the Apostle John, ensuring she would be protected and honored as a mother, establishing a spiritual family that transcends bloodlines.",
          "Mary did not vanish after the resurrection. She is last mentioned in the book of Acts, present in the Upper Room in Jerusalem. There, she gathered with the apostles and other women, devoting herself to prayer as they awaited the Holy Spirit. She was there at the birth of Jesus, and she was there at the birth of the Church.",
          "Throughout history, she has been called 'Blessed' by all generations, just as she predicted. She is not a deity to be worshipped, but a human to be emulated—a vessel who emptied herself entirely so that she could be filled with God. Her life teaches us that God uses the humble, the willing, and the faithful to accomplish His greatest works.",
          "Her legacy is one of silent strength. She is the woman who said 'Yes' to God when it cost her everything. From the manger to the cross to the upper room, Mary's life was a consistent testimony of pointing others to her Son.",
          "In a world that values power and noise, Mary's quiet fortitude reminds us that the greatest things are often birthed in humility and nurtured in the hidden places of the heart."
      ]
    },
    {
      id: 'david',
      name: 'David',
      role: 'King of Israel',
      image: IMAGES.david,
      meaningOfName: 'Beloved',
      timeline: 'c. 1040 – 970 BC',
      traits: ['Courage', 'Musicality', 'Leadership', 'Repentance'],
      family: {
          parents: 'Jesse',
          spouse: 'Michal, Abigail, Bathsheba, and others',
          children: 'Solomon, Absalom, Adonijah, Tamar',
          siblings: 'Eliab, Abinadab, Shimea, Nethanel, Raddai, Ozem (7 brothers)'
      },
      keyVerses: [
          { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
          { ref: "Acts 13:22", text: "I have found David son of Jesse, a man after my own heart." },
          { ref: "Psalm 51:10", text: "Create in me a pure heart, O God, and renew a steadfast spirit within me." }
      ],
      biography: [
          "David is one of the most complex and beloved figures in Scripture, known as a 'man after God's own heart.' He began his life as the youngest son of Jesse in Bethlehem, a simple shepherd boy often overlooked by his own family. While his brothers trained for war, David learned to protect his flock from lions and bears, developing a fierce courage and a deep intimacy with God through song.",
          "His life changed forever when the prophet Samuel anointed him as the future king of Israel, passing over his taller, stronger brothers. God declared that while man looks at the outward appearance, He looks at the heart. Soon after, David visited the battlefield and, armed only with a sling and five smooth stones, defeated the Philistine giant Goliath, declaring that the battle belonged to the Lord.",
          "David's rise to the throne was not immediate. He spent his formative years serving in King Saul's court as a musician and armor-bearer, soothing the king's tormented spirit with his harp. He formed a legendary covenant friendship with Saul's son, Jonathan, a bond that exemplified loyalty and sacrificial love.",
          "Jealousy eventually consumed Saul, forcing David to live as a fugitive in the wilderness for years. During this time, he led a band of outcasts and mighty men, sparing Saul's life on two separate occasions when he could have killed him. David refused to raise his hand against 'the Lord's anointed,' trusting God to elevate him in His own perfect timing.",
          "Upon Saul's death, David was crowned king, first over Judah and then over all Israel. He conquered the fortress of Jebus, renaming it Jerusalem (the City of David), and established it as the political and spiritual capital. He brought the Ark of the Covenant into the city with great celebration, dancing before the Lord with abandon, prioritizing God's presence above his royal dignity.",
          "David was a warrior-poet who expanded Israel's borders to their greatest extent. Yet, his legacy is preserved most vividly in the Psalms. He wrote nearly half of the Psalter, pouring out raw human emotion—soaring praise, desperate lament, and unshakable trust—giving the people of God a vocabulary for prayer for all generations.",
          "However, David was not a perfect man. At the height of his power, he fell into grievous sin, committing adultery with Bathsheba and orchestrating the murder of her husband, Uriah the Hittite. The consequences were devastating: the child conceived died, and violence plagued David's household for the rest of his reign, culminating in the rebellion of his son Absalom.",
          "What set David apart from Saul was not sinlessness, but his response to sin. When confronted by the prophet Nathan, David did not make excuses. He broke. Psalm 51 captures his cry for mercy: 'Against you, you only, have I sinned.' He accepted God's discipline and sought a clean heart above all else.",
          "In his later years, David prepared the materials and plans for the Temple that his son Solomon would build. He ended his life not as a conqueror, but as a worshipper, acknowledging that everything he had came from God. He died at a good old age, full of days, riches, and honor.",
          "David's greatest legacy is theological. God made a covenant with him that his throne would be established forever. This promise finds its ultimate fulfillment in Jesus Christ, the 'Son of David,' who was born in David's city to rule an eternal Kingdom of righteousness and peace."
      ]
    },
    {
      id: 'moses',
      name: 'Moses',
      role: 'Prophet & Deliverer',
      image: IMAGES.moses,
      meaningOfName: 'Drawn out (of the water)',
      timeline: 'c. 1400 BC',
      traits: ['Meekness', 'Leadership', 'Patience', 'Intercessor'],
      family: {
          parents: 'Amram and Jochebed',
          spouse: 'Zipporah',
          children: 'Gershom, Eliezer',
          siblings: 'Aaron, Miriam'
      },
      keyVerses: [
          { ref: "Exodus 14:14", text: "The Lord will fight for you; you need only to be still." },
          { ref: "Deuteronomy 34:10", text: "Since then, no prophet has risen in Israel like Moses, whom the Lord knew face to face." },
          { ref: "Hebrews 11:24", text: "By faith Moses, when he had grown up, refused to be known as the son of Pharaoh’s daughter." }
      ],
      biography: [
          "Moses towers over the Old Testament as the great emancipator, lawgiver, and prophet. His life began under the shadow of genocide, as Pharaoh ordered the death of all Hebrew baby boys. His mother, Jochebed, hid him in a papyrus basket among the reeds of the Nile, where he was discovered by Pharaoh's daughter. In a divine twist of irony, he was raised in the royal palace, educated in all the wisdom of Egypt, yet nursed by his own birth mother.",
          "Despite his royal status, Moses never forgot his heritage. At age forty, seeing an Egyptian taskmaster beating a Hebrew slave, he intervened and killed the Egyptian. Fearing retribution, he fled Egypt to the land of Midian. The Prince of Egypt became a humble shepherd in the desert, a forty-year period of obscurity that stripped him of his self-reliance and prepared him for God's call.",
          "God encountered Moses at Horeb in a bush that burned but was not consumed. When Moses asked for God's name, God revealed Himself as YHWH ('I AM WHO I AM'). Despite Moses' five objections regarding his inadequacy and stuttering speech, God commissioned him to return to Egypt to demand the release of His people.",
          "Armed only with a staff and the promises of God, Moses confronted the most powerful empire on earth. Through ten devastating plagues—turning the Nile to blood, darkness, hail, and the death of the firstborn—God dismantled the pantheon of Egyptian gods. Moses instituted the Passover, a meal commemorating God's judgment passing over the homes marked by the blood of the lamb.",
          "The Exodus itself was a miracle of deliverance. Trapped between the chariots of Pharaoh and the Red Sea, Moses raised his staff, and the waters parted, allowing Israel to cross on dry ground. When the Egyptians pursued, the waters collapsed, destroying the oppressor and liberating the oppressed.",
          "At Mount Sinai, Moses ascended into the thick cloud to meet with God. He received the Ten Commandments and the detailed blueprints for the Tabernacle, establishing the moral and civil law that would define Israel as a holy nation. His face shone with such radiance from being in God's presence that he had to wear a veil.",
          "Leadership was a heavy burden. Moses led a grumbling, stiff-necked people for forty years in the wilderness. He faced rebellion from his own siblings, idolatry with the Golden Calf, and constant complaints about food and water. Yet, he is described as the meekest man on earth, constantly interceding for the people when God threatened to destroy them.",
          "Moses was not without flaw. In a moment of frustration at Meribah, he struck the rock to bring forth water instead of speaking to it as commanded, failing to uphold God's holiness. For this, he was denied entry into the Promised Land, a somber reminder that leaders are held to a higher standard.",
          "At the end of his life, Moses climbed Mount Nebo. God showed him the land of Canaan from a distance—the fulfillment of the promise he had dedicated his life to. There, Moses died at the age of 120, his eyes undimmed and his vigor unabated. God Himself buried him in a secret valley.",
          "Moses' legacy is incomparable. He organized a slave rabble into a nation, mediated the Old Covenant, and wrote the Torah (the first five books of the Bible). Centuries later, he appeared on the Mount of Transfiguration alongside Elijah, talking with Jesus, testifying that the Law and the Prophets pointed ultimately to Christ."
      ]
    },
    {
      id: 'peter',
      name: 'Peter',
      role: 'Apostle & Leader',
      image: IMAGES.peter,
      meaningOfName: 'Rock (Petros)',
      timeline: 'died c. 64 AD',
      traits: ['Boldness', 'Impulsive', 'Passion', 'Resilience'],
      family: {
          parents: 'John (Jonah)',
          spouse: 'Unnamed wife (mentioned in 1 Cor 9:5)',
          siblings: 'Andrew'
      },
      keyVerses: [
          { ref: "Matthew 16:16", text: "You are the Messiah, the Son of the living God." },
          { ref: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
          { ref: "Acts 4:12", text: "Salvation is found in no one else." }
      ],
      biography: [
          "Simon Peter is one of the most relatable figures in the New Testament—a man of great passion, significant flaws, and eventual rock-solid faith. Originally a fisherman from Bethsaida living in Capernaum, he was introduced to Jesus by his brother Andrew. Jesus looked at this rough, impulsive fisherman and gave him a new name: Cephas (Peter), meaning 'Rock.'",
          "Peter was part of Jesus' inner circle, along with James and John. He witnessed the most intimate moments of Christ's ministry: the raising of Jairus' daughter, the Transfiguration on the mountain, and the agony in the Garden of Gethsemane. He was a man of action, often speaking before thinking, yet possessed of a deep spiritual intuition.",
          "He famously walked on water at Jesus' command, defying the laws of nature until fear caused him to sink. This moment captures Peter's essence: courageous faith mixed with human frailty. He was the first disciple to boldly confess Jesus' identity: 'You are the Messiah, the Son of the living God,' a revelation Jesus said came directly from the Father.",
          "However, Peter struggled to understand the Messiah's mission of suffering. Moments after his great confession, he rebuked Jesus for speaking of death, earning the stern correction, 'Get behind me, Satan!' Peter promised to die for Jesus, yet when the test came in the High Priest's courtyard, fear overtook him, and he denied knowing the Lord three times as the rooster crowed.",
          "Peter's story is ultimately one of restoration. On resurrection morning, the angel specifically mentioned him: 'Go tell his disciples and Peter.' Later, on the shores of Galilee, Jesus recreated the miraculous catch of fish and asked Peter three times, 'Do you love me?' reinstating him and commissioning him to 'feed my sheep.'",
          "Transformed by the Holy Spirit at Pentecost, the once fearful Peter stood before thousands in Jerusalem and preached a sermon so powerful that 3,000 people were baptized in one day. He became the pillar of the early church, performing miracles—healing a lame beggar at the Beautiful Gate and even raising Dorcas from the dead.",
          "Peter played a pivotal role in the church's expansion to the Gentiles. Through a vision of unclean animals and a visit to the Roman centurion Cornelius, God showed Peter that the Gospel was for all people, breaking down centuries of racial and religious barriers.",
          "He authored two epistles (1 and 2 Peter), writing to encourage suffering Christians to stand firm in the grace of God. He described the church as 'living stones' being built into a spiritual house, with Christ as the cornerstone.",
          "Tradition tells us that Peter was eventually arrested in Rome under the persecution of Emperor Nero. When sentenced to crucifixion, he requested to be crucified upside down, declaring himself unworthy to die in the same manner as his Lord. He died a martyr, faithful to the end.",
          "Peter's life proves that failure is not final. God does not look for perfect vessels, but for willing hearts that He can shape. The shifting sand of Simon became the solid Rock of Peter, a foundation stone of the universal church."
      ]
    },
    {
      id: 'paul',
      name: 'Paul',
      role: 'Apostle to the Gentiles',
      image: IMAGES.paul,
      meaningOfName: 'Small / Humble (Paulus)',
      timeline: 'c. 5 – 64 AD',
      traits: ['Intellect', 'Zeal', 'Perseverance', 'Theologian'],
      family: {
          parents: 'Jewish Pharisees of the tribe of Benjamin',
          siblings: 'Mention of a sister in Acts 23:16'
      },
      keyVerses: [
          { ref: "Philippians 1:21", text: "For to me, to live is Christ and to die is gain." },
          { ref: "Romans 8:38-39", text: "For I am convinced that neither death nor life... will be able to separate us from the love of God." },
          { ref: "Galatians 2:20", text: "I have been crucified with Christ and I no longer live, but Christ lives in me." }
      ],
      biography: [
          "Paul, originally known as Saul of Tarsus, stands as the intellectual giant of the early church and its greatest missionary. Born a Roman citizen and a Jew from the tribe of Benjamin, he was educated under the renowned Gamaliel. He was a Pharisee of Pharisees, zealous for the Law and convinced that the new sect of 'The Way' was a dangerous heresy that needed to be destroyed.",
          "His introduction in Scripture is ominous: he stood guard over the coats of the men who stoned Stephen, the first Christian martyr, approving of the execution. Breathing murderous threats, Saul obtained letters to arrest Christians in Damascus. But on that road, a blinding light flashed from heaven, and he heard a voice: 'Saul, Saul, why do you persecute me?'",
          "This encounter with the risen Christ shattered Saul's worldview. He realized that in persecuting the church, he was persecuting God Himself. Blinded for three days, he fasted and prayed until a disciple named Ananias—overcoming his own fear—laid hands on him. Scales fell from his eyes, he was baptized, and the great persecutor became the great proclaimer.",
          "Taking the Roman name Paul, he embarked on three extensive missionary journeys that spanned the Mediterranean world. He traveled thousands of miles by land and sea, planting churches in key cities like Corinth, Ephesus, Philippi, and Thessalonica. His strategy was to preach first in the synagogues to the Jews, and then to the Gentiles in the marketplaces.",
          "Paul's ministry was marked by extreme suffering. As he cataloged in 2 Corinthians, he endured beatings, stonings, three shipwrecks, sleepless nights, hunger, and the constant 'anxiety for all the churches.' He famously suffered from a 'thorn in the flesh,' a weakness God refused to remove to keep Paul humble and dependent on grace.",
          "He is the primary theologian of the New Testament, authoring 13 epistles (letters) that comprise nearly half of its books. In Romans, he systematically explained the gospel of grace: that righteousness is a gift from God received by faith, not by works. In Galatians, he fought for Christian freedom. In Ephesians, he described the cosmic scope of Christ's work.",
          "Paul was also a man of deep relationships. He mentored younger leaders like Timothy and Titus, calling Timothy his 'true son in the faith.' He worked alongside couples like Priscilla and Aquila and relied on teams to carry out his mission. He was never a lone ranger.",
          "His later years were spent largely in chains. Arrested in Jerusalem after a riot, he used his Roman citizenship to appeal to Caesar. He spent two years under house arrest in Rome, welcoming all who came to him and preaching the Kingdom of God with all boldness and without hindrance.",
          "Tradition holds that Paul was released for a time and traveled as far as Spain, before being arrested again during Nero's persecution. Writing his final letter to Timothy from a cold dungeon, he declared, 'I have fought the good fight, I have finished the race, I have kept the faith.'",
          "Paul was beheaded in Rome around 64-67 AD. The man who once tried to extinguish the light of the gospel became the torchbearer who carried it to the ends of the earth. His life demonstrates that no one is beyond the reach of God's grace, and that God can use our background, intellect, and zeal for His own glory."
      ]
    }
  ],
  Romanian: [
    {
      id: 'jesus',
      name: 'Isus Hristos',
      role: 'Fiul lui Dumnezeu',
      image: IMAGES.jesus,
      meaningOfName: 'Domnul Mântuiește',
      timeline: 'c. 4 î.Hr. – 30 d.Hr.',
      traits: ['Dragoste', 'Smerenie', 'Jertfă', 'Autoritate'],
      family: {
          parents: 'Dumnezeu Tatăl / Iosif (Adoptiv) & Maria',
          siblings: 'Iacov, Iosif, Iuda, Simon (Frați vitregi)',
      },
      keyVerses: [
          { ref: "Ioan 3:16", text: "Fiindcă atât de mult a iubit Dumnezeu lumea, că a dat pe singurul Lui Fiu..." },
          { ref: "Ioan 14:6", text: "Eu sunt Calea, Adevărul și Viața." },
          { ref: "Matei 11:28", text: "Veniți la Mine, toți cei trudiți și împovărați, și Eu vă voi da odihnă." }
      ],
      biography: [
          "Isus din Nazaret este figura centrală a istoriei umane și a credinței creștine. Evanghelia după Ioan Îl descrie ca fiind 'Cuvântul' (Logosul) care era la început cu Dumnezeu și era Dumnezeu, prin care toate lucrurile au fost făcute. El a lăsat la o parte slava Sa divină pentru a intra în umanitate, zămislit de Duhul Sfânt și născut din Fecioara Maria în umilul oraș Betleem, împlinind profețiile antice.",
          "Viața Sa timpurie rămâne în mare parte un mister, cu excepția unei scurte imagini la vârsta de doisprezece ani, când a fost găsit în Templu, uimind învățătorii religioși cu înțelepciunea Sa. A crescut în Nazaret, un oraș fără reputație, lucrând ca 'tekton' (tâmplar sau constructor), experimentând realitățile lumești ale vieții umane, ascultarea și munca.",
          "În jurul vârstei de treizeci de ani, Isus și-a început lucrarea publică după ce a fost botezat de Ioan Botezătorul în râul Iordan. Când a ieșit din apă, cerurile s-au deschis, Duhul a coborât ca un porumbel, și glasul Tatălui a tunat: 'Acesta este Fiul Meu preaiubit, în care Îmi găsesc plăcerea.' Imediat după aceasta, a îndurat patruzeci de zile de post și ispitire din partea Satanei în pustie, ieșind victorios acolo unde Adam și Israel au eșuat.",
          "Isus a chemat doisprezece oameni obișnuiți – pescari, un vameș și zeloți – să fie ucenicii Săi. Cu acest grup pestriț, El a călătorit prin Iudeea și Galileea, vestind sosirea Împărăției lui Dumnezeu. Lucrarea Sa a fost caracterizată de compasiune pentru cei marginalizați: a atins leproșii, a mâncat cu păcătoșii, a onorat femeile și a primit copiii.",
          "Învățătura Sa a fost diferită de orice auzise lumea. În Predica de pe Munte, El a revoluționat etica, învățând că ura este crimă a inimii și pofta este adulter al inimii. A vorbit în pilde – povești despre oi pierdute, fii risipitori și semințe de muștar – care au dezvăluit misterele ascunse ale Împărăției lui Dumnezeu celor smeriți, în timp ce i-au confundat pe cei mândri.",
          "Minunile au autentificat mesajul Său. A transformat apa în vin, a potolit furtunile furioase cu un cuvânt, a hrănit mii de oameni cu prânzul unui băiat, a deschis ochii orbilor și l-a înviat pe Lazăr din morți. Acestea nu au fost doar trucuri magice, ci 'semne' care indicau restaurarea creației și identitatea Sa ca Mesia.",
          "Cu toate acestea, pretențiile Sale de divinitate și provocarea Sa la adresa status quo-ului religios au atras mânia fariseilor și saducheilor. A intrat în Ierusalim pe un măgăruș în strigăte de 'Osana', dar în câteva zile, aclamațiile s-au transformat în batjocuri. După ce a împărtășit o ultimă cină de Paște cu ucenicii Săi, a fost trădat de Iuda Iscarioteanul și arestat în Grădina Ghetsimani.",
          "Îndurând un proces simulat, biciuire brutală și batjocură, Isus a fost condamnat la moarte de Pilat din Pont. Și-a purtat crucea la Golgota, unde a fost răstignit. În ultimele Sale momente, S-a rugat pentru călăii Săi: 'Tată, iartă-i' și a declarat: 'S-a isprăvit'. Cerul s-a întunecat, pământul s-a cutremurat, iar perdeaua Templului s-a rupt în două.",
          "Trupul Său a fost pus într-un mormânt împrumutat, sigilat și păzit. Dar moartea nu l-a putut ține pe Autorul Vieții. A treia zi, piatra a fost dată la o parte, iar Isus a înviat trupește din mormânt. S-a arătat Mariei Magdalena, apostolilor și altor peste cinci sute de persoane, dovedind victoria Sa asupra păcatului și morții.",
          "Înainte de a se înălța la Cer, le-a dat urmașilor Săi Marea Trimitere: să meargă și să facă ucenici din toate neamurile. A promis că nu îi va lăsa orfani, ci va trimite Duhul Sfânt. Astăzi, Isus stă la dreapta Tatălui, mijlocind pentru noi, iar biserica așteaptă întoarcerea Sa promisă pentru a judeca viii și morții și pentru a face toate lucrurile noi."
      ]
    },
    {
      id: 'david',
      name: 'David',
      role: 'Regele Israelului',
      image: IMAGES.david,
      meaningOfName: 'Preaiubit',
      timeline: 'c. 1040 – 970 î.Hr.',
      traits: ['Curaj', 'Muzicalitate', 'Lider', 'Pocăință'],
      family: {
          parents: 'Iese',
          spouse: 'Mical, Abigail, Batșeba',
          children: 'Solomon, Absalom, Adonia, Tamar',
          siblings: 'Eliab, Abinadab, Șimea... (7 frați)'
      },
      keyVerses: [
          { ref: "Psalmul 23:1", text: "Domnul este păstorul meu: nu voi duce lipsă de nimic." },
          { ref: "Faptele 13:22", text: "Am găsit pe David, fiul lui Iese, om după inima Mea." },
          { ref: "Psalmul 51:10", text: "Zidește în mine o inimă curată, Dumnezeule!" }
      ],
      biography: [
          "David este una dintre cele mai complexe și iubite figuri din Scriptură, cunoscut ca 'un om după inima lui Dumnezeu'. Și-a început viața ca cel mai mic fiu al lui Iese în Betleem, un simplu păstor adesea trecut cu vederea de propria familie. În timp ce frații săi se antrenau pentru război, David a învățat să-și protejeze turma de lei și urși, dezvoltând un curaj feroce și o intimitate profundă cu Dumnezeu prin cântec.",
          "Viața sa s-a schimbat pentru totdeauna când profetul Samuel l-a uns ca viitor rege al lui Israel, trecând peste frații săi mai înalți și mai puternici. Dumnezeu a declarat că, în timp ce omul se uită la înfățișare, El se uită la inimă. La scurt timp după aceea, David a vizitat câmpul de luptă și, înarmat doar cu o praștie și cinci pietre netede, l-a învins pe uriașul filistean Goliat, declarând că lupta aparține Domnului.",
          "Ascensiunea lui David la tron nu a fost imediată. Și-a petrecut anii de formare slujind la curtea regelui Saul ca muzician și purtător de arme, liniștind spiritul chinuit al regelui cu harpa sa. A format o prietenie legendară de legământ cu fiul lui Saul, Ionatan, o legătură care a exemplificat loialitatea și dragostea sacrificială.",
          "Gelosia l-a consumat în cele din urmă pe Saul, forțându-l pe David să trăiască ca un fugar în pustie ani de zile. În acest timp, a condus o bandă de proscriși și viteji, cruțând viața lui Saul în două ocazii separate când ar fi putut să-l ucidă. David a refuzat să ridice mâna împotriva 'unsului Domnului', având încredere că Dumnezeu îl va înălța la momentul Său perfect.",
          "La moartea lui Saul, David a fost încoronat rege, mai întâi peste Iuda și apoi peste tot Israelul. A cucerit fortăreața Iebus, redenumind-o Ierusalim (Cetatea lui David), și a stabilit-o ca capitală politică și spirituală. A adus Chivotul Legământului în oraș cu mare sărbătoare, dansând înaintea Domnului cu abandon, prioritizând prezența lui Dumnezeu mai presus de demnitatea sa regală.",
          "David a fost un războinic-poet care a extins granițele lui Israel la cea mai mare întindere a lor. Totuși, moștenirea sa este păstrată cel mai viu în Psalmi. El a scris aproape jumătate din Psaltire, vărsând emoții umane brute – laudă înălțătoare, lamentație disperată și încredere de nezdruncinat – oferind poporului lui Dumnezeu un vocabular pentru rugăciune pentru toate generațiile.",
          "Cu toate acestea, David nu a fost un om perfect. La apogeul puterii sale, a căzut într-un păcat grav, comițând adulter cu Batșeba și orchestrând uciderea soțului ei, Urie Hititul. Consecințele au fost devastatoare: copilul conceput a murit, iar violența a chinuit casa lui David pentru tot restul domniei sale, culminând cu rebeliunea fiului său Absalom.",
          "Ceea ce l-a deosebit pe David de Saul nu a fost lipsa de păcat, ci răspunsul său la păcat. Când a fost confruntat de profetul Natan, David nu a căutat scuze. S-a frânt. Psalmul 51 surprinde strigătul său pentru milă: 'Împotriva Ta, numai împotriva Ta am păcătuit'. El a acceptat disciplina lui Dumnezeu și a căutat o inimă curată mai presus de orice altceva.",
          "În ultimii săi ani, David a pregătit materialele și planurile pentru Templul pe care fiul său Solomon avea să-l construiască. El și-a încheiat viața nu ca un cuceritor, ci ca un închinător, recunoscând că tot ce avea venea de la Dumnezeu. A murit la o bătrânețe fericită, sătul de zile, de bogății și de glorie.",
          "Cea mai mare moștenire a lui David este teologică. Dumnezeu a făcut un legământ cu el că tronul său va fi stabilit pentru totdeauna. Această promisiune își găsește împlinirea supremă în Isus Hristos, 'Fiul lui David', care s-a născut în cetatea lui David pentru a stăpâni o Împărăție veșnică a neprihănirii și păcii."
      ]
    },
    {
        id: 'peter',
        name: 'Petru',
        role: 'Apostol & Lider',
        image: IMAGES.peter,
        meaningOfName: 'Piatra (Petros)',
        timeline: 'decedat c. 64 d.Hr.',
        traits: ['Îndrăzneală', 'Impulsiv', 'Pasiune', 'Reziliență'],
        family: {
            parents: 'Iona',
            spouse: 'Soție nenumită',
            siblings: 'Andrei'
        },
        keyVerses: [
            { ref: "Matei 16:16", text: "Tu ești Hristosul, Fiul Dumnezeului celui viu!" },
            { ref: "1 Petru 5:7", text: "Aruncați asupra Lui toate îngrijorările voastre, căci El însuși îngrijește de voi." }
        ],
        biography: [
            "Simon Petru este una dintre cele mai identificabile figuri din Noul Testament – un om de o mare pasiune, defecte semnificative și o credință în cele din urmă de nezdruncinat. Originar pescar din Betsaida care locuia în Capernaum, a fost prezentat lui Isus de fratele său Andrei. Isus s-a uitat la acest pescar aspru și impulsiv și i-a dat un nume nou: Chifa (Petru), însemnând 'Piatră'.",
            "Petru a făcut parte din cercul intim al lui Isus, alături de Iacov și Ioan. El a fost martor la cele mai intime momente ale lucrării lui Hristos: învierea fiicei lui Iair, Schimbarea la Față pe munte și agonia din Grădina Ghetsimani. Era un om de acțiune, vorbind adesea înainte de a gândi, dar poseda o intuiție spirituală profundă.",
            "El a mers faimos pe apă la porunca lui Isus, sfidând legile naturii până când frica l-a făcut să se scufunde. Acest moment surprinde esența lui Petru: credință curajoasă amestecată cu fragilitate umană. El a fost primul ucenic care a mărturisit cu îndrăzneală identitatea lui Isus: 'Tu ești Hristosul, Fiul Dumnezeului celui viu', o revelație despre care Isus a spus că a venit direct de la Tatăl.",
            "Cu toate acestea, Petru s-a luptat să înțeleagă misiunea de suferință a Mesiei. La câteva momente după marea sa mărturisire, L-a mustrat pe Isus pentru că vorbea despre moarte, câștigându-și corecția severă: 'Înapoia Mea, Satano!' Petru a promis că va muri pentru Isus, totuși, când a venit testul în curtea Marelui Preot, frica l-a cuprins și a negat că Îl cunoaște pe Domnul de trei ori, în timp ce cocoșul cânta.",
            "Povestea lui Petru este, în cele din urmă, una a restaurării. În dimineața învierii, îngerul l-a menționat în mod specific: 'Duceți-vă de spuneți ucenicilor Lui și lui Petru'. Mai târziu, pe malul Galileii, Isus a recreat prinderea miraculoasă de pești și l-a întrebat pe Petru de trei ori: 'Mă iubești?', reinstalându-l și însărcinându-l să 'pascal mieii Mei'.",
            "Transformat de Duhul Sfânt la Cincizecime, Petru, odată fricos, a stat în fața a mii de oameni în Ierusalim și a predicat o predică atât de puternică încât 3.000 de oameni au fost botezați într-o singură zi. A devenit stâlpul bisericii primare, făcând minuni – vindecând un olog la Poarta Frumoasă și chiar înviind-o pe Dorcas din morți.",
            "Petru a jucat un rol esențial în extinderea bisericii către neamuri. Printr-o viziune a animalelor necurate și o vizită la sutașul roman Corneliu, Dumnezeu i-a arătat lui Petru că Evanghelia era pentru toți oamenii, dărâmând secole de bariere rasiale și religioase.",
            "El a scris două epistole (1 și 2 Petru), scriind pentru a încuraja creștinii care suferă să rămână fermi în harul lui Dumnezeu. El a descris biserica drept 'pietre vii' care sunt zidite într-o casă spirituală, cu Hristos ca piatră din capul unghiului.",
            "Tradiția ne spune că Petru a fost în cele din urmă arestat la Roma sub persecuția împăratului Nero. Când a fost condamnat la răstignire, a cerut să fie răstignit cu capul în jos, declarându-se nedemn să moară în același mod ca Domnul său. A murit ca martir, credincios până la sfârșit.",
            "Viața lui Petru dovedește că eșecul nu este final. Dumnezeu nu caută vase perfecte, ci inimi dispuse pe care El le poate modela. Nisipul mișcător al lui Simon a devenit Stânca solidă a lui Petru, o piatră de temelie a bisericii universale."
        ]
    },
    {
      id: 'mary',
      name: 'Maria',
      role: 'Mama lui Isus',
      image: IMAGES.mary,
      meaningOfName: 'Preaiubită / Răzvrătită (depinde de context)',
      timeline: 'Secolul 1 î.Hr. – Secolul 1 d.Hr.',
      traits: ['Ascultare', 'Credință', 'Tărie', 'Devotament'],
      family: {
          parents: 'Ioachim și Ana (Tradiție)',
          spouse: 'Iosif',
          children: 'Isus, Iacov, Iosif, Iuda, Simon'
      },
      keyVerses: [
          { ref: "Luca 1:38", text: "Iată roaba Domnului; facă-mi-se după cuvintele tale!" },
          { ref: "Luca 1:46-47", text: "Sufletul meu mărește pe Domnul și mi se bucură duhul în Dumnezeu, Mântuitorul meu." },
          { ref: "Ioan 2:5", text: "Să faceți orice vă va zice." }
      ],
      biography: [
          "Maria din Nazaret rămâne un exemplu suprem de credință și predare în narațiunea biblică. O tânără evreică cu posibilități modeste, era logodită cu un tâmplar numit Iosif când viața ei a fost schimbată irevocabil. Îngerul Gabriel i-a apărut cu un anunț uluitor: va concepe prin Duhul Sfânt și va naște pe Fiul Celui Preaînalt.",
          "Răspunsul ei la această chemare terifiantă și social periculoasă îi definește moștenirea. În ciuda riscului de rușine publică, divorț sau chiar lapidare, ea a rostit cuvintele care au deschis ușa mântuirii: 'Iată roaba Domnului; facă-mi-se după cuvintele tale'. Apoi a călătorit să-și viziteze verișoara Elisabeta, unde a cântat Magnificat, un imn puternic de laudă care celebrează susținerea de către Dumnezeu a celor smeriți.",
          "Povestea nașterii subliniază reziliența ei. Însărcinată înaintat, a îndurat călătoria grea spre Betleem și l-a născut pe Regele Regilor în sărăcia unui staul, înfășurându-L în scutece și punându-L într-o iesle. Ea 'păstra toate cuvintele acestea și se gândea la ele în inima ei', observând păstorii și magii care veneau să se închine Fiului ei.",
          "Maternitatea pentru Maria a fost un amestec de minune și durere care străpunge ca o sabie, așa cum a profețit Simeon. Ea și Iosif l-au crescut pe Isus în ascultare de Lege, fugind în Egipt pentru a-L proteja de Irod și mai târziu căutându-L frenetic când a rămas în Templu la vârsta de doisprezece ani. Ea a știut de timpuriu că El nu îi aparținea doar ei, ci Tatălui Său.",
          "Maria apare în momente cheie ale lucrării lui Isus. La Nunta din Cana, ea a determinat prima Sa minune, demonstrându-și încrederea în El spunând slujitorilor: 'Să faceți orice vă va zice'. Chiar și când familia Lui s-a îngrijorat că El și-a ieșit din minți, ea a rămas o prezență constantă și liniștită în fundalul faimei Sale crescânde.",
          "Cea mai mare încercare a ei a venit la cruce. În timp ce majoritatea ucenicilor au fugit de frică, Maria a stat neclintită la Golgota, privindu-și Fiul suferind agonia răstignirii. Într-unul dintre actele Sale finale, Isus a încredințat grija ei apostolului Ioan, asigurându-se că va fi protejată și onorată ca mamă, stabilind o familie spirituală care transcende legăturile de sânge.",
          "Maria nu a dispărut după înviere. Ea este menționată ultima dată în cartea Faptele Apostolilor, prezentă în Camera de Sus din Ierusalim. Acolo, s-a adunat cu apostolii și alte femei, dedicându-se rugăciunii în timp ce așteptau Duhul Sfânt. Ea a fost acolo la nașterea lui Isus și a fost acolo la nașterea Bisericii.",
          "De-a lungul istoriei, ea a fost numită 'Binecuvântată' de toate generațiile, exact așa cum a prezis. Ea nu este o zeitate care trebuie adorată, ci un om care trebuie emulat – un vas care s-a golit complet pentru a putea fi umplut de Dumnezeu. Viața ei ne învață că Dumnezeu îi folosește pe cei smeriți, doritori și credincioși pentru a îndeplini cele mai mari lucrări ale Sale.",
          "Moștenirea ei este una de putere tăcută. Ea este femeia care a spus 'Da' lui Dumnezeu când a costat-o totul. De la iesle la cruce și până la camera de sus, viața Mariei a fost o mărturie consecventă de a-i îndrepta pe alții către Fiul ei.",
          "Într-o lume care prețuiește puterea și zgomotul, tăria liniștită a Mariei ne amintește că cele mai mari lucruri se nasc adesea în smerenie și sunt hrănite în locurile ascunse ale inimii."
      ]
    },
    {
      id: 'moses',
      name: 'Moise',
      role: 'Profet & Eliberator',
      image: IMAGES.moses,
      meaningOfName: 'Scos (din apă)',
      timeline: 'c. 1400 î.Hr.',
      traits: ['Blândețe', 'Lider', 'Răbdare', 'Mijlocitor'],
      family: {
          parents: 'Amram și Iochebed',
          spouse: 'Sefora',
          children: 'Gherșom, Eliezer',
          siblings: 'Aaron, Miriam'
      },
      keyVerses: [
          { ref: "Exodul 14:14", text: "Domnul Se va lupta pentru voi; dar voi, stați liniștiți." },
          { ref: "Deuteronom 34:10", text: "În Israel nu s-a mai ridicat prooroc ca Moise, pe care Domnul să-l fi cunoscut față în față." },
          { ref: "Evrei 11:24", text: "Prin credință Moise, când s-a făcut mare, n-a vrut să fie numit fiul fiicei lui Faraon." }
      ],
      biography: [
          "Moise domină Vechiul Testament ca marele eliberator, legiuitor și profet. Viața sa a început sub umbra genocidului, deoarece Faraon a ordonat moartea tuturor băieților evrei. Mama sa, Iochebed, l-a ascuns într-un coș de papirus printre trestiile Nilului, unde a fost descoperit de fiica lui Faraon. Într-o întorsătură divină a ironiei, a fost crescut în palatul regal, educat în toată înțelepciunea Egiptului, totuși alăptat de propria sa mamă naturală.",
          "În ciuda statutului său regal, Moise nu și-a uitat niciodată moștenirea. La vârsta de patruzeci de ani, văzând un supraveghetor egiptean bătând un sclav evreu, a intervenit și l-a ucis pe egiptean. Temându-se de răzbunare, a fugit din Egipt în țara Madian. Prințul Egiptului a devenit un păstor umil în deșert, o perioadă de patruzeci de ani de obscuritate care l-a dezbrăcat de încrederea în sine și l-a pregătit pentru chemarea lui Dumnezeu.",
          "Dumnezeu l-a întâlnit pe Moise la Horeb într-un rug care ardea, dar nu se consuma. Când Moise a întrebat care este numele lui Dumnezeu, Dumnezeu S-a revelat ca YHWH ('EU SUNT CEL CE SUNT'). În ciuda celor cinci obiecții ale lui Moise cu privire la inadecvarea sa și vorbirea sa bâlbâită, Dumnezeu l-a însărcinat să se întoarcă în Egipt pentru a cere eliberarea poporului Său.",
          "Înarmat doar cu un toiag și cu promisiunile lui Dumnezeu, Moise a confruntat cel mai puternic imperiu de pe pământ. Prin zece plăgi devastatoare – transformarea Nilului în sânge, întuneric, grindină și moartea întâilor născuți – Dumnezeu a demontat panteonul zeilor egipteni. Moise a instituit Paștele, o masă care comemora judecata lui Dumnezeu trecând peste casele marcate cu sângele mielului.",
          "Exodul în sine a fost un miracol de eliberare. Prins între carele lui Faraon și Marea Roșie, Moise și-a ridicat toiagul, iar apele s-au despărțit, permițând Israelului să treacă pe pământ uscat. Când egiptenii i-au urmărit, apele s-au prăbușit, distrugând asupritorul și eliberând asupritul.",
          "La Muntele Sinai, Moise a urcat în norul gros pentru a se întâlni cu Dumnezeu. A primit Cele Zece Porunci și planurile detaliate pentru Cortul Întâlnirii, stabilind legea morală și civilă care va defini Israelul ca o națiune sfântă. Fața sa strălucea cu atâta radianță din cauza prezenței lui Dumnezeu încât a trebuit să poarte un văl.",
          "Conducerea a fost o povară grea. Moise a condus un popor nemulțumit și încăpățânat timp de patruzeci de ani în pustie. S-a confruntat cu rebeliunea propriilor frați, idolatria cu Vițelul de Aur și plângeri constante despre mâncare și apă. Totuși, el este descris ca cel mai blând om de pe pământ, mijlocind constant pentru popor atunci când Dumnezeu a amenințat să-i distrugă.",
          "Moise nu a fost fără greșeală. Într-un moment de frustrare la Meriba, a lovit stânca pentru a scoate apă în loc să-i vorbească așa cum i s-a poruncit, eșuând în a susține sfințenia lui Dumnezeu. Pentru aceasta, i s-a refuzat intrarea în Țara Făgăduinței, o amintire sobră că liderii sunt ținuți la un standard mai înalt.",
          "La sfârșitul vieții sale, Moise a urcat pe Muntele Nebo. Dumnezeu i-a arătat țara Canaanului de la distanță – împlinirea promisiunii căreia își dedicase viața. Acolo, Moise a murit la vârsta de 120 de ani, cu ochii neîncețoșați și vigoarea neabătută. Dumnezeu Însuși l-a îngropat într-o vale secretă.",
          "Moștenirea lui Moise este incomparabilă. El a organizat o gloată de sclavi într-o națiune, a mediat Vechiul Legământ și a scris Tora (primele cinci cărți ale Bibliei). Secole mai târziu, a apărut pe Muntele Schimbării la Față alături de Ilie, vorbind cu Isus, mărturisind că Legea și Profeții arătau în cele din urmă spre Hristos."
      ]
    },
    {
      id: 'paul',
      name: 'Pavel',
      role: 'Apostolul Neamurilor',
      image: IMAGES.paul,
      meaningOfName: 'Mic / Umil (Paulus)',
      timeline: 'c. 5 – 64 d.Hr.',
      traits: ['Intelect', 'Zel', 'Perseverență', 'Teolog'],
      family: {
          parents: 'Farisei evrei din tribul lui Beniamin',
          siblings: 'Mențiune despre o soră în Faptele 23:16'
      },
      keyVerses: [
          { ref: "Filipeni 1:21", text: "Căci pentru mine a trăi este Hristos, și a muri este un câștig." },
          { ref: "Romani 8:38-39", text: "Căci sunt bine încredințat că nici moartea, nici viața... nu ne va putea despărți de dragostea lui Dumnezeu." },
          { ref: "Galateni 2:20", text: "Am fost răstignit împreună cu Hristos, și trăiesc... dar nu mai trăiesc eu, ci Hristos trăiește în mine." }
      ],
      biography: [
          "Pavel, cunoscut inițial ca Saul din Tars, este gigantul intelectual al bisericii primare și cel mai mare misionar al acesteia. Născut cetățean roman și evreu din tribul lui Beniamin, a fost educat sub renumitul Gamaliel. A fost un fariseu al fariseilor, plin de zel pentru Lege și convins că noua sectă a 'Căii' era o erezie periculoasă care trebuia distrusă.",
          "Introducerea sa în Scriptură este amenințătoare: a păzit hainele oamenilor care l-au împroșcat cu pietre pe Ștefan, primul martir creștin, aprobând execuția. Suflând amenințări cu moartea, Saul a obținut scrisori pentru a aresta creștini în Damasc. Dar pe acel drum, o lumină orbitoare a strălucit din cer și a auzit o voce: 'Saule, Saule, pentru ce Mă prigonești?'",
          "Această întâlnire cu Hristosul înviat a spulberat viziunea asupra lumii a lui Saul. A realizat că persecutând biserica, Îl persecuta pe Dumnezeu Însuși. Orbit timp de trei zile, a postit și s-a rugat până când un ucenic numit Anania – depășindu-și propria frică – și-a pus mâinile peste el. Solzi i-au căzut de pe ochi, a fost botezat, iar marele persecutor a devenit marele vestitor.",
          "Luând numele roman Pavel, a pornit în trei călătorii misionare extinse care au cuprins lumea mediteraneană. A călătorit mii de mile pe uscat și pe mare, plantând biserici în orașe cheie precum Corint, Efes, Filipi și Tesalonic. Strategia sa era să predice mai întâi în sinagogi evreilor, și apoi neamurilor în piețe.",
          "Lucrarea lui Pavel a fost marcată de suferință extremă. Așa cum a catalogat în 2 Corinteni, a îndurat bătăi, lapidări, trei naufragii, nopți nedormite, foame și 'grija constantă pentru toate bisericile'. A suferit faimos de un 'țepuș în carne', o slăbiciune pe care Dumnezeu a refuzat să o înlăture pentru a-l menține pe Pavel smerit și dependent de har.",
          "El este teologul principal al Noului Testament, autor al a 13 epistole (scrisori) care cuprind aproape jumătate din cărțile acestuia. În Romani, a explicat sistematic evanghelia harului: că neprihănirea este un dar de la Dumnezeu primit prin credință, nu prin fapte. În Galateni, a luptat pentru libertatea creștină. În Efeseni, a descris sfera cosmică a lucrării lui Hristos.",
          "Pavel a fost, de asemenea, un om al relațiilor profunde. A mentorat lideri mai tineri precum Timotei și Tit, numindu-l pe Timotei 'adevăratul său fiu în credință'. A lucrat alături de cupluri precum Priscila și Aquila și s-a bazat pe echipe pentru a-și îndeplini misiunea. Nu a fost niciodată un luptător singuratic.",
          "Ultimii săi ani au fost petrecuți în mare parte în lanțuri. Arestat în Ierusalim după o revoltă, s-a folosit de cetățenia sa romană pentru a face apel la Cezar. A petrecut doi ani în arest la domiciliu în Roma, primind pe toți cei care veneau la el și propovăduind Împărăția lui Dumnezeu cu toată îndrăzneala și fără piedici.",
          "Tradiția susține că Pavel a fost eliberat pentru o vreme și a călătorit până în Spania, înainte de a fi arestat din nou în timpul persecuției lui Nero. Scriindu-și ultima scrisoare către Timotei dintr-o temniță rece, a declarat: 'M-am luptat lupta cea bună, mi-am isprăvit alergarea, am păzit credința'.",
          "Pavel a fost decapitat la Roma în jurul anilor 64-67 d.Hr. Omul care a încercat odată să stingă lumina evangheliei a devenit purtătorul de torță care a dus-o până la marginile pământului. Viața sa demonstrează că nimeni nu este dincolo de raza harului lui Dumnezeu și că Dumnezeu poate folosi trecutul, intelectul și zelul nostru pentru propria Sa glorie."
      ]
    }
  ],
  German: [
    {
      id: 'jesus',
      name: 'Jesus Christus',
      role: 'Sohn Gottes',
      image: IMAGES.jesus,
      meaningOfName: 'Der Herr rettet',
      timeline: 'ca. 4 v. Chr. – 30 n. Chr.',
      traits: ['Liebe', 'Demut', 'Opfer', 'Autorität'],
      family: {
          parents: 'Gott der Vater / Josef (Adoptiv) & Maria',
          siblings: 'Jakobus, Josef, Judas, Simon (Halbbrüder)',
      },
      keyVerses: [
          { ref: "Johannes 3,16", text: "Denn so sehr hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab..." },
          { ref: "Johannes 14,6", text: "Ich bin der Weg und die Wahrheit und das Leben." },
          { ref: "Matthäus 11,28", text: "Kommt her zu mir, alle, die ihr mühselig und beladen seid; ich will euch erquicken." }
      ],
      biography: [
          "Jesus von Nazareth ist die zentrale Figur der Menschheitsgeschichte und des christlichen Glaubens. Das Johannesevangelium beschreibt ihn als das 'Wort' (Logos), das im Anfang bei Gott war und Gott war, durch das alle Dinge geschaffen wurden. Er legte seine göttliche Herrlichkeit ab, um in die Menschheit einzutreten, empfangen vom Heiligen Geist und geboren von der Jungfrau Maria in der bescheidenen Stadt Bethlehem, womit sich alte Prophezeiungen erfüllten.",
          "Sein frühes Leben bleibt weitgehend ein Geheimnis, abgesehen von einem kurzen Blick im Alter von zwölf Jahren, als er im Tempel gefunden wurde und die religiösen Lehrer mit seinem Verständnis verblüffte. Er wuchs in Nazareth auf, einer Stadt von geringem Ruf, und arbeitete als 'Tekton' (Zimmermann oder Bauarbeiter), wobei er die weltlichen Realitäten des menschlichen Lebens, des Gehorsams und der Arbeit erlebte.",
          "Im Alter von etwa dreißig Jahren begann Jesus seinen öffentlichen Dienst, nachdem er von Johannes dem Täufer im Jordan getauft worden war. Als er aus dem Wasser stieg, öffnete sich der Himmel, der Geist stieg wie eine Taube herab, und die Stimme des Vaters donnerte: 'Dies ist mein geliebter Sohn, an dem ich Wohlgefallen habe.' Unmittelbar danach ertrug er vierzig Tage Fasten und Versuchung durch Satan in der Wüste und ging siegreich hervor, wo Adam und Israel versagt hatten.",
          "Jesus berief zwölf gewöhnliche Männer – Fischer, einen Zöllner und Zeloten – zu seinen Jüngern. Mit dieser bunten Gruppe reiste er durch Judäa und Galiläa und verkündete die Ankunft des Reiches Gottes. Sein Dienst war geprägt von Mitgefühl für die Ausgestoßenen: Er berührte Aussätzige, aß mit Sündern, ehrte Frauen und hieß Kinder willkommen.",
          "Seine Lehre war anders als alles, was die Welt gehört hatte. In der Bergpredigt revolutionierte er die Ethik und lehrte, dass Hass Mord des Herzens und Lust Ehebruch des Herzens ist. Er sprach in Gleichnissen – Geschichten von verlorenen Schafen, verlorenen Söhnen und Senfkörnern –, die die verborgenen Geheimnisse von Gottes Reich den Demütigen offenbarten, während sie die Stolzen verwirrten.",
          "Wunder beglaubigten seine Botschaft. Er verwandelte Wasser in Wein, beruhigte tobende Stürme mit einem Wort, speiste Tausende mit dem Mittagessen eines Jungen, öffnete blinde Augen und weckte Lazarus von den Toten auf. Dies waren keine bloßen Zaubertricks, sondern 'Zeichen', die auf die Wiederherstellung der Schöpfung und seine Identität als Messias hinwiesen.",
          "Seine Ansprüche auf Göttlichkeit und seine Herausforderung des religiösen Status quo zogen jedoch den Zorn der Pharisäer und Sadduzäer auf sich. Er zog auf einem Esel unter Rufen von 'Hosianna' in Jerusalem ein, doch innerhalb von Tagen verwandelte sich der Jubel in Spott. Nachdem er ein letztes Passahmahl mit seinen Jüngern geteilt hatte, wurde er von Judas Iskariot verraten und im Garten Gethsemane verhaftet.",
          "Nach einem Scheinprozess, brutaler Geißelung und Verspottung wurde Jesus von Pontius Pilatus zum Tode verurteilt. Er trug sein Kreuz nach Golgatha, wo er gekreuzigt wurde. In seinen letzten Momenten betete er für seine Henker: 'Vater, vergib ihnen', und erklärte: 'Es ist vollbracht.' Der Himmel verfinsterte sich, die Erde bebte, und der Vorhang im Tempel riss entzwei.",
          "Sein Leib wurde in ein geliehenes Grab gelegt, versiegelt und bewacht. Aber der Tod konnte den Urheber des Lebens nicht halten. Am dritten Tag wurde der Stein weggewälzt, und Jesus stand leibhaftig aus dem Grab auf. Er erschien Maria Magdalena, den Aposteln und über fünfhundert anderen und bewies seinen Sieg über Sünde und Tod.",
          "Bevor er in den Himmel auffuhr, gab er seinen Nachfolgern den Missionsbefehl: Hinzugehen und alle Völker zu Jüngern zu machen. Er versprach, sie nicht als Waisen zurückzulassen, sondern den Heiligen Geist zu senden. Heute sitzt Jesus zur Rechten des Vaters, tritt für uns ein, und die Kirche erwartet seine verheißene Rückkehr, um die Lebenden und die Toten zu richten und alle Dinge neu zu machen."
      ]
    },
    {
      id: 'david',
      name: 'David',
      role: 'König von Israel',
      image: IMAGES.david,
      meaningOfName: 'Geliebter',
      timeline: 'ca. 1040 – 970 v. Chr.',
      traits: ['Mut', 'Musikalität', 'Führung', 'Buße'],
      family: {
          parents: 'Isai',
          spouse: 'Michal, Abigail, Bathseba',
          children: 'Salomo, Absalom, Adonija, Tamar',
          siblings: 'Eliab, Abinadab... (7 Brüder)'
      },
      keyVerses: [
          { ref: "Psalm 23,1", text: "Der Herr ist mein Hirte, mir wird nichts mangeln." },
          { ref: "Apostelgeschichte 13,22", text: "Ich habe David gefunden, den Sohn Isais, einen Mann nach meinem Herzen." }
      ],
      biography: [
          "David ist eine der komplexesten und beliebtesten Figuren der Schrift, bekannt als ein 'Mann nach dem Herzen Gottes'. Er begann sein Leben als jüngster Sohn von Isai in Bethlehem, ein einfacher Hirtenjunge, der oft von seiner eigenen Familie übersehen wurde. Während seine Brüder für den Krieg trainierten, lernte David, seine Herde vor Löwen und Bären zu schützen, und entwickelte einen wilden Mut und eine tiefe Intimität mit Gott durch Lieder.",
          "Sein Leben änderte sich für immer, als der Prophet Samuel ihn zum zukünftigen König von Israel salbte und seine größeren, stärkeren Brüder überging. Gott erklärte, dass der Mensch auf das Äußere schaut, Er aber auf das Herz. Kurz darauf besuchte David das Schlachtfeld und besiegte, nur mit einer Schleuder und fünf glatten Steinen bewaffnet, den philistäischen Riesen Goliath und erklärte, dass der Kampf dem Herrn gehört.",
          "Davids Aufstieg zum Thron erfolgte nicht sofort. Er verbrachte seine prägenden Jahre am Hof von König Saul als Musiker und Waffenträger und beruhigte den gequälten Geist des Königs mit seiner Harfe. Er schloss eine legendäre Bundesfreundschaft mit Sauls Sohn Jonathan, eine Bindung, die Loyalität und opferbereite Liebe verkörperte.",
          "Eifersucht verzehrte schließlich Saul und zwang David, jahrelang als Flüchtling in der Wüste zu leben. In dieser Zeit führte er eine Bande von Ausgestoßenen und Helden an und verschonte Sauls Leben bei zwei verschiedenen Gelegenheiten, als er ihn hätte töten können. David weigerte sich, seine Hand gegen den 'Gesalbten des Herrn' zu erheben, und vertraute darauf, dass Gott ihn zu Seiner perfekten Zeit erheben würde.",
          "Nach Sauls Tod wurde David zum König gekrönt, zuerst über Juda und dann über ganz Israel. Er eroberte die Festung Jebus, benannte sie in Jerusalem (die Stadt Davids) um und etablierte sie als politische und geistliche Hauptstadt. Er brachte die Bundeslade mit großem Jubel in die Stadt und tanzte vor dem Herrn mit Hingabe, wobei er Gottes Gegenwart über seine königliche Würde stellte.",
          "David war ein Krieger-Poet, der Israels Grenzen bis zu ihrer größten Ausdehnung erweiterte. Doch sein Vermächtnis ist am lebendigsten in den Psalmen erhalten. Er schrieb fast die Hälfte des Psalters und schüttete rohe menschliche Emotionen aus – jubelndes Lob, verzweifelte Klage und unerschütterliches Vertrauen –, was dem Volk Gottes ein Vokabular für das Gebet für alle Generationen gab.",
          "Doch David war kein perfekter Mann. Auf dem Höhepunkt seiner Macht fiel er in schwere Sünde, beging Ehebruch mit Bathseba und inszenierte den Mord an ihrem Ehemann, Uria dem Hethiter. Die Folgen waren verheerend: Das gezeugte Kind starb, und Gewalt plagte Davids Haus für den Rest seiner Herrschaft, was in der Rebellion seines Sohnes Absalom gipfelte.",
          "Was David von Saul unterschied, war nicht Sündlosigkeit, sondern seine Reaktion auf Sünde. Als er vom Propheten Nathan konfrontiert wurde, suchte David keine Ausreden. Er zerbrach. Psalm 51 fängt seinen Schrei nach Barmherzigkeit ein: 'An dir allein habe ich gesündigt.' Er akzeptierte Gottes Züchtigung und suchte vor allem ein reines Herz.",
          "In seinen späteren Jahren bereitete David die Materialien und Pläne für den Tempel vor, den sein Sohn Salomo bauen würde. Er beendete sein Leben nicht als Eroberer, sondern als Anbeter, der anerkannte, dass alles, was er hatte, von Gott kam. Er starb in einem guten Alter, satt an Tagen, Reichtum und Ehre.",
          "Davids größtes Vermächtnis ist theologisch. Gott schloss einen Bund mit ihm, dass sein Thron für immer bestehen würde. Dieses Versprechen findet seine endgültige Erfüllung in Jesus Christus, dem 'Sohn Davids', der in Davids Stadt geboren wurde, um ein ewiges Königreich der Gerechtigkeit und des Friedens zu regieren."
      ]
    },
    {
      id: 'moses',
      name: 'Mose',
      role: 'Prophet & Befreier',
      image: IMAGES.moses,
      meaningOfName: 'Herausgezogen (aus dem Wasser)',
      timeline: 'ca. 1400 v. Chr.',
      traits: ['Sanftmut', 'Führung', 'Geduld', 'Fürbitter'],
      family: {
          parents: 'Amram und Jochebed',
          spouse: 'Zippora',
          children: 'Gershom, Eliëser',
          siblings: 'Aaron, Miriam'
      },
      keyVerses: [
          { ref: "2. Mose 14,14", text: "Der HERR wird für euch streiten, und ihr werdet stille sein." },
          { ref: "5. Mose 34,10", text: "Und es stand hinfort kein Prophet in Israel auf wie Mose, den der HERR erkannt hätte von Angesicht zu Angesicht." },
          { ref: "Hebräer 11,24", text: "Durch den Glauben wollte Mose, als er groß geworden war, nicht mehr als Sohn der Tochter des Pharao gelten." }
      ],
      biography: [
          "Mose überragt das Alte Testament als der große Befreier, Gesetzgeber und Prophet. Sein Leben begann im Schatten eines Völkermords, als der Pharao den Tod aller hebräischen Jungen anordnete. Seine Mutter Jochebed versteckte ihn in einem Papyruskorb im Schilf des Nils, wo er von der Tochter des Pharao entdeckt wurde. In einer göttlichen Ironie wurde er im königlichen Palast aufgezogen, in aller Weisheit Ägyptens unterrichtet, aber von seiner eigenen leiblichen Mutter gestillt.",
          "Trotz seines königlichen Status vergaß Mose nie seine Herkunft. Im Alter von vierzig Jahren, als er sah, wie ein ägyptischer Aufseher einen hebräischen Sklaven schlug, griff er ein und tötete den Ägypter. Aus Angst vor Vergeltung floh er aus Ägypten in das Land Midian. Der Prinz von Ägypten wurde ein bescheidener Hirte in der Wüste, eine vierzigjährige Zeit der Verborgenheit, die ihn von seinem Selbstvertrauen befreite und ihn auf Gottes Ruf vorbereitete.",
          "Gott begegnete Mose am Horeb in einem Dornbusch, der brannte, aber nicht verzehrt wurde. Als Mose nach Gottes Namen fragte, offenbarte sich Gott als JHWH ('ICH BIN, DER ICH BIN'). Trotz Moses' fünf Einwänden bezüglich seiner Unzulänglichkeit und seines stotternden Sprechens beauftragte Gott ihn, nach Ägypten zurückzukehren, um die Freilassung Seines Volkes zu fordern.",
          "Nur mit einem Stab und den Verheißungen Gottes bewaffnet, konfrontierte Mose das mächtigste Imperium der Erde. Durch zehn verheerende Plagen – Verwandlung des Nils in Blut, Dunkelheit, Hagel und den Tod der Erstgeborenen – demontierte Gott das Pantheon der ägyptischen Götter. Mose setzte das Passahfest ein, ein Mahl zum Gedenken an Gottes Gericht, das an den mit dem Blut des Lammes markierten Häusern vorüberging.",
          "Der Auszug selbst war ein Wunder der Befreiung. Gefangen zwischen den Streitwagen des Pharao und dem Roten Meer, erhob Mose seinen Stab, und die Wasser teilten sich, sodass Israel auf trockenem Boden hindurchziehen konnte. Als die Ägypter sie verfolgten, stürzten die Wassermassen zusammen, vernichteten den Unterdrücker und befreiten die Unterdrückten.",
          "Am Berg Sinai stieg Mose in die dichte Wolke, um Gott zu begegnen. Er empfing die Zehn Gebote und die detaillierten Pläne für die Stiftshütte und etablierte das moralische und bürgerliche Gesetz, das Israel als heilige Nation definieren würde. Sein Gesicht strahlte so sehr von der Gegenwart Gottes, dass er einen Schleier tragen musste.",
          "Führung war eine schwere Last. Mose führte vierzig Jahre lang ein murrendes, halsstarriges Volk durch die Wüste. Er sah sich der Rebellion seiner eigenen Geschwister, dem Götzendienst mit dem Goldenen Kalb und ständigen Beschwerden über Essen und Wasser gegenüber. Dennoch wird er als der sanftmütigste Mann auf Erden beschrieben, der ständig für das Volk eintrat, wenn Gott drohte, es zu vernichten.",
          "Mose war nicht ohne Fehler. In einem Moment der Frustration bei Meriba schlug er den Felsen, um Wasser hervorzubringen, anstatt zu ihm zu sprechen, wie befohlen, und versäumte es, Gottes Heiligkeit zu wahren. Dafür wurde ihm der Eintritt in das Gelobte Land verwehrt, eine ernste Erinnerung daran, dass an Führer höhere Maßstäbe angelegt werden.",
          "Am Ende seines Lebens bestieg Mose den Berg Nebo. Gott zeigte ihm das Land Kanaan aus der Ferne – die Erfüllung des Versprechens, dem er sein Leben gewidmet hatte. Dort starb Mose im Alter von 120 Jahren, seine Augen nicht trübe und seine Kraft nicht geschwunden. Gott selbst begrub ihn in einem geheimen Tal.",
          "Moses' Vermächtnis ist unvergleichlich. Er organisierte einen Sklavenhaufen zu einer Nation, vermittelte den Alten Bund und schrieb die Tora (die ersten fünf Bücher der Bibel). Jahrhunderte später erschien er auf dem Berg der Verklärung zusammen mit Elia und sprach mit Jesus, womit er bezeugte, dass das Gesetz und die Propheten letztendlich auf Christus hinwiesen."
      ]
    },
    {
      id: 'mary',
      name: 'Maria',
      role: 'Mutter Jesu',
      image: IMAGES.mary,
      meaningOfName: 'Geliebte / Widerspenstige (kontextabhängig)',
      timeline: '1. Jahrhundert v. Chr. – 1. Jahrhundert n. Chr.',
      traits: ['Gehorsam', 'Glaube', 'Stärke', 'Hingabe'],
      family: {
          parents: 'Joachim und Anna (Tradition)',
          spouse: 'Josef',
          children: 'Jesus, Jakobus, Josef, Judas, Simon'
      },
      keyVerses: [
          { ref: "Lukas 1,38", text: "Siehe, ich bin des Herrn Magd; mir geschehe, wie du gesagt hast." },
          { ref: "Lukas 1,46-47", text: "Meine Seele erhebt den Herrn, und mein Geist freuet sich Gottes, meines Heilands." },
          { ref: "Johannes 2,5", text: "Was er euch sagt, das tut." }
      ],
      biography: [
          "Maria von Nazareth steht als höchstes Beispiel für Glauben und Hingabe in der biblischen Erzählung. Als junge jüdische Frau aus bescheidenen Verhältnissen war sie mit einem Zimmermann namens Josef verlobt, als ihr Leben unwiderruflich verändert wurde. Der Engel Gabriel erschien ihr mit einer erschreckenden Ankündigung: Sie würde durch den Heiligen Geist empfangen und den Sohn des Höchsten gebären.",
          "Ihre Reaktion auf diese beängstigende und gesellschaftlich gefährliche Berufung definiert ihr Vermächtnis. Trotz des Risikos öffentlicher Schande, Scheidung oder sogar Steinigung sprach sie die Worte, die die Tür zur Errettung öffneten: 'Siehe, ich bin des Herrn Magd; mir geschehe, wie du gesagt hast.' Dann reiste sie zu ihrer Cousine Elisabeth, wo sie das Magnificat sang, einen mächtigen Lobgesang, der Gottes Eintreten für die Demütigen feiert.",
          "Die Weihnachtsgeschichte unterstreicht ihre Widerstandsfähigkeit. Hochschwanger ertrug sie die beschwerliche Reise nach Bethlehem und gebar den König der Könige in der Armut eines Stalls, wickelte ihn in Windeln und legte ihn in eine Krippe. Sie 'behielt alle diese Worte und bewegte sie in ihrem Herzen', während sie die Hirten und Weisen beobachtete, die kamen, um ihren Sohn anzubeten.",
          "Mutterschaft war für Maria eine Mischung aus Wunder und schwertdurchdringendem Schmerz, wie von Simeon prophezeit. Sie und Josef zogen Jesus im Gehorsam gegenüber dem Gesetz auf, flohen nach Ägypten, um ihn vor Herodes zu schützen, und suchten später verzweifelt nach ihm, als er im Alter von zwölf Jahren im Tempel zurückblieb. Sie wusste schon früh, dass er nicht nur ihr, sondern seinem Vater gehörte.",
          "Maria erscheint in Schlüsselmomenten des Dienstes Jesu. Bei der Hochzeit zu Kana veranlasste sie sein erstes Wunder und demonstrierte ihr Vertrauen in ihn, indem sie den Dienern sagte: 'Was er euch sagt, das tut.' Selbst als seine Familie sich sorgte, er sei von Sinnen, blieb sie eine konstante, stille Präsenz im Hintergrund seines wachsenden Ruhms.",
          "Ihre größte Prüfung kam am Kreuz. Während die meisten Jünger aus Angst flohen, stand Maria standhaft auf Golgotha und sah zu, wie ihr Sohn die Qualen der Kreuzigung litt. In einem seiner letzten Akte vertraute Jesus ihre Fürsorge dem Apostel Johannes an und stellte sicher, dass sie als Mutter beschützt und geehrt würde, und gründete eine geistliche Familie, die Blutlinien übersteigt.",
          "Maria verschwand nicht nach der Auferstehung. Sie wird zuletzt im Buch der Apostelgeschichte erwähnt, anwesend im Obergemach in Jerusalem. Dort versammelte sie sich mit den Aposteln und anderen Frauen und widmete sich dem Gebet, während sie auf den Heiligen Geist warteten. Sie war bei der Geburt Jesu dabei, und sie war bei der Geburt der Kirche dabei.",
          "Im Laufe der Geschichte wurde sie von allen Generationen 'gepriesen' genannt, genau wie sie es vorhergesagt hatte. Sie ist keine Gottheit, die angebetet werden soll, sondern ein Mensch, dem nachgeeifert werden soll – ein Gefäß, das sich völlig entleerte, damit es mit Gott gefüllt werden konnte. Ihr Leben lehrt uns, dass Gott die Demütigen, die Willigen und die Treuen benutzt, um seine größten Werke zu vollbringen.",
          "Ihr Vermächtnis ist eines der stillen Stärke. Sie ist die Frau, die 'Ja' zu Gott sagte, als es sie alles kostete. Von der Krippe über das Kreuz bis zum Obergemach war Marias Leben ein beständiges Zeugnis, andere auf ihren Sohn hinzuweisen.",
          "In einer Welt, die Macht und Lärm schätzt, erinnert uns Marias stille Tapferkeit daran, dass die größten Dinge oft in Demut geboren und in den verborgenen Orten des Herzens genährt werden."
      ]
    },
    {
      id: 'peter',
      name: 'Petrus',
      role: 'Apostel & Leiter',
      image: IMAGES.peter,
      meaningOfName: 'Fels (Petros)',
      timeline: 'gestorben ca. 64 n. Chr.',
      traits: ['Kühnheit', 'Impulsiv', 'Leidenschaft', 'Resilienz'],
      family: {
          parents: 'Johannes (Jona)',
          spouse: 'Unbenannte Ehefrau',
          siblings: 'Andreas'
      },
      keyVerses: [
          { ref: "Matthäus 16,16", text: "Du bist Christus, des lebendigen Gottes Sohn!" },
          { ref: "1. Petrus 5,7", text: "Alle eure Sorge werft auf ihn; denn er sorgt für euch." }
      ],
      biography: [
          "Simon Petrus ist eine der greifbarsten Figuren im Neuen Testament – ein Mann großer Leidenschaft, mit bedeutenden Fehlern und schließlich felsenfestem Glauben. Ursprünglich ein Fischer aus Bethsaida, der in Kapernaum lebte, wurde er Jesus von seinem Bruder Andreas vorgestellt. Jesus sah diesen rauen, impulsiven Fischer an und gab ihm einen neuen Namen: Kephas (Petrus), was 'Fels' bedeutet.",
          "Petrus gehörte zusammen mit Jakobus und Johannes zum inneren Kreis Jesu. Er war Zeuge der intimsten Momente des Dienstes Christi: der Auferweckung der Tochter des Jairus, der Verklärung auf dem Berg und der Qual im Garten Gethsemane. Er war ein Mann der Tat, der oft sprach, bevor er dachte, besaß aber eine tiefe geistliche Intuition.",
          "Berühmt ist, wie er auf Jesu Befehl auf dem Wasser ging und den Gesetzen der Natur trotzte, bis die Angst ihn sinken ließ. Dieser Moment fängt Petrus' Wesen ein: mutiger Glaube gemischt mit menschlicher Schwäche. Er war der erste Jünger, der kühn Jesu Identität bekannte: 'Du bist Christus, des lebendigen Gottes Sohn', eine Offenbarung, von der Jesus sagte, sie komme direkt vom Vater.",
          "Petrus hatte jedoch Mühe, die Leidensmission des Messias zu verstehen. Augenblicke nach seinem großen Bekenntnis tadelte er Jesus dafür, dass er vom Tod sprach, und erntete die strenge Zurechtweisung: 'Geh weg von mir, Satan!' Petrus versprach, für Jesus zu sterben, doch als die Prüfung im Hof des Hohenpriesters kam, übermannte ihn die Angst, und er leugnete dreimal, den Herrn zu kennen, als der Hahn krähte.",
          "Petrus' Geschichte ist letztlich eine der Wiederherstellung. Am Auferstehungsmorgen erwähnte der Engel ihn namentlich: 'Geht hin und sagt es seinen Jüngern und Petrus.' Später, am Ufer von Galiläa, wiederholte Jesus den wunderbaren Fischfang und fragte Petrus dreimal: 'Liebst du mich?', setzte ihn wieder ein und beauftragte ihn: 'Weide meine Schafe.'",
          "Transformiert durch den Heiligen Geist an Pfingsten, stand der einst furchtsame Petrus vor Tausenden in Jerusalem und predigte eine Predigt, die so kraftvoll war, dass an einem Tag 3.000 Menschen getauft wurden. Er wurde die Säule der frühen Kirche, wirkte Wunder – heilte einen Lahmen an der Schönen Pforte und weckte sogar Tabita von den Toten auf.",
          "Petrus spielte eine entscheidende Rolle bei der Ausbreitung der Kirche zu den Heiden. Durch eine Vision von unreinen Tieren und einen Besuch beim römischen Hauptmann Kornelius zeigte Gott Petrus, dass das Evangelium für alle Menschen ist, und riss Jahrhunderte alter rassischer und religiöser Barrieren nieder.",
          "Er verfasste zwei Briefe (1. und 2. Petrus), um leidende Christen zu ermutigen, fest in der Gnade Gottes zu stehen. Er beschrieb die Kirche als 'lebendige Steine', die zu einem geistlichen Haus aufgebaut werden, mit Christus als Eckstein.",
          "Die Tradition besagt, dass Petrus schließlich in Rom unter der Verfolgung von Kaiser Nero verhaftet wurde. Als er zur Kreuzigung verurteilt wurde, bat er darum, kopfüber gekreuzigt zu werden, da er sich für unwürdig erklärte, auf dieselbe Weise wie sein Herr zu sterben. Er starb als Märtyrer, treu bis zum Ende.",
          "Petrus' Leben beweist, dass Versagen nicht endgültig ist. Gott sucht nicht nach perfekten Gefäßen, sondern nach willigen Herzen, die Er formen kann. Der Treibsand von Simon wurde zum festen Fels von Petrus, einem Grundstein der weltweiten Kirche."
      ]
    },
    {
      id: 'paul',
      name: 'Paulus',
      role: 'Apostel der Heiden',
      image: IMAGES.paul,
      meaningOfName: 'Klein / Demütig (Paulus)',
      timeline: 'ca. 5 – 64 n. Chr.',
      traits: ['Intellekt', 'Eifer', 'Ausdauer', 'Theologe'],
      family: {
          parents: 'Jüdische Pharisäer aus dem Stamm Benjamin',
          siblings: 'Erwähnung einer Schwester in Apostelgeschichte 23,16'
      },
      keyVerses: [
          { ref: "Philipper 1,21", text: "Denn Christus ist mein Leben, und Sterben ist mein Gewinn." },
          { ref: "Römer 8,38-39", text: "Denn ich bin gewiss, dass weder Tod noch Leben... uns scheiden kann von der Liebe Gottes." },
          { ref: "Galater 2,20", text: "Ich lebe, doch nun nicht ich, sondern Christus lebt in mir." }
      ],
      biography: [
          "Paulus, ursprünglich als Saulus von Tarsus bekannt, steht als der intellektuelle Riese der frühen Kirche und ihr größter Missionar. Als römischer Bürger und Jude aus dem Stamm Benjamin geboren, wurde er unter dem renommierten Gamaliel ausgebildet. Er war ein Pharisäer der Pharisäer, eifernd für das Gesetz und überzeugt, dass die neue Sekte des 'Weges' eine gefährliche Ketzerei war, die vernichtet werden musste.",
          "Seine Einführung in die Schrift ist unheilvoll: Er bewachte die Kleider der Männer, die Stephanus, den ersten christlichen Märtyrer, steinigten, und billigte die Hinrichtung. Morddrohungen ausstoßend, erhielt Saulus Briefe, um Christen in Damaskus zu verhaften. Aber auf diesem Weg blitzte ein blendendes Licht vom Himmel auf, und er hörte eine Stimme: 'Saul, Saul, warum verfolgst du mich?'",
          "Diese Begegnung mit dem auferstandenen Christus erschütterte Saulus' Weltbild. Er erkannte, dass er, indem er die Kirche verfolgte, Gott selbst verfolgte. Drei Tage lang blind, fastete und betete er, bis ein Jünger namens Ananias – seine eigene Angst überwindend – ihm die Hände auflegte. Schuppen fielen von seinen Augen, er wurde getauft, und der große Verfolger wurde zum großen Verkündiger.",
          "Er nahm den römischen Namen Paulus an und begab sich auf drei umfangreiche Missionsreisen, die die Mittelmeerwelt umspannten. Er reiste Tausende von Meilen zu Land und zu Wasser und gründete Gemeinden in Schlüsselstädten wie Korinth, Ephesus, Philippi und Thessaloniki. Seine Strategie war es, zuerst in den Synagogen zu den Juden zu predigen und dann auf den Marktplätzen zu den Heiden.",
          "Paulus' Dienst war von extremem Leiden geprägt. Wie er in 2. Korinther auflistete, ertrug er Schläge, Steinigungen, drei Schiffbrüche, schlaflose Nächte, Hunger und die ständige 'Sorge für alle Gemeinden'. Er litt bekanntermaßen unter einem 'Dorn im Fleisch', einer Schwäche, die Gott nicht entfernen wollte, um Paulus demütig und abhängig von der Gnade zu halten.",
          "Er ist der primäre Theologe des Neuen Testaments und verfasste 13 Briefe, die fast die Hälfte seiner Bücher ausmachen. Im Römerbrief erklärte er systematisch das Evangelium der Gnade: dass Gerechtigkeit ein Geschenk Gottes ist, das durch Glauben empfangen wird, nicht durch Werke. Im Galaterbrief kämpfte er für die christliche Freiheit. Im Epheserbrief beschrieb er das kosmische Ausmaß von Christi Werk.",
          "Paulus war auch ein Mann tiefer Beziehungen. Er mentorierte jüngere Leiter wie Timotheus und Titus und nannte Timotheus seinen 'wahren Sohn im Glauben'. Er arbeitete mit Ehepaaren wie Priszilla und Aquila zusammen und verließ sich auf Teams, um seine Mission auszuführen. Er war nie ein Einzelkämpfer.",
          "Seine späteren Jahre verbrachte er größtenteils in Ketten. Nach einem Aufruhr in Jerusalem verhaftet, nutzte er seine römische Bürgerschaft, um sich auf den Kaiser zu berufen. Er verbrachte zwei Jahre unter Hausarrest in Rom, empfing alle, die zu ihm kamen, und predigte das Reich Gottes mit aller Freimütigkeit und ungehindert.",
          "Die Tradition besagt, dass Paulus für eine Zeit freigelassen wurde und bis nach Spanien reiste, bevor er während Neros Verfolgung erneut verhaftet wurde. Als er seinen letzten Brief an Timotheus aus einem kalten Kerker schrieb, erklärte er: 'Ich habe den guten Kampf gekämpft, ich habe den Lauf vollendet, ich habe den Glauben gehalten.'",
          "Paulus wurde um 64-67 n. Chr. in Rom enthauptet. Der Mann, der einst versuchte, das Licht des Evangeliums auszulöschen, wurde der Fackelträger, der es bis an die Enden der Erde trug. Sein Leben zeigt, dass niemand außerhalb der Reichweite von Gottes Gnade ist und dass Gott unseren Hintergrund, unseren Intellekt und unseren Eifer für Seine eigene Herrlichkeit nutzen kann."
      ]
    }
  ]
};
