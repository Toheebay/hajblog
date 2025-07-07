
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Users, Star, BookOpen } from 'lucide-react';

// Extended course data with full content
const coursesData = {
  1: {
    title: "Complete Hajj Guide for First-Time Pilgrims",
    instructor: "Sheikh Abdullah Al-Hariri",
    duration: "6 hours",
    rating: 4.9,
    students: 2341,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    description: "Essential step-by-step guide covering all rituals, preparations, and spiritual aspects of Hajj.",
    fullContent: `
# Complete Hajj Guide for First-Time Pilgrims

## Introduction
The Hajj pilgrimage is one of the five pillars of Islam and a spiritual journey that every Muslim should undertake at least once in their lifetime if they are physically and financially able.

## Chapter 1: Preparation
### Spiritual Preparation
- Sincere intention (Niyyah)
- Repentance and seeking forgiveness
- Learning about the rituals beforehand
- Mental preparation for the physical challenges

### Physical Preparation
- Health checkups and vaccinations
- Physical fitness training
- Packing essentials
- Understanding the climate

## Chapter 2: The Five Days of Hajj
### Day 1: 8th Dhul Hijjah (Yawm al-Tarwiyah)
- Travel to Mina
- Spend the day in prayer and reflection
- Prepare for the main day at Arafat

### Day 2: 9th Dhul Hijjah (Yawm Arafah)
- The most important day of Hajj
- Stand at Arafat from Dhuhr to Maghrib
- Make sincere duas and seek forgiveness
- Travel to Muzdalifah after sunset

### Day 3: 10th Dhul Hijjah (Yawm al-Nahr)
- Collect pebbles at Muzdalifah
- Stone the large Jamarat
- Sacrifice an animal (Qurbani)
- Shave or cut hair
- Perform Tawaf al-Ifadah

### Days 4-5: 11th-12th Dhul Hijjah (Ayyam al-Tashriq)
- Stone all three Jamarat each day
- Stay in Mina for reflection
- Option to leave on 12th or stay until 13th

## Chapter 3: Essential Rituals
### Ihram
- State of ritual purity and dress
- Specific clothing for men and women
- Restrictions while in Ihram state

### Tawaf
- Circumambulation of the Kaaba
- Seven rounds counterclockwise
- Prayers and supplications during Tawaf

### Sa'i
- Walking between Safa and Marwah hills
- Seven trips commemorating Hagar's search for water
- Significance and proper etiquette

## Chapter 4: Common Mistakes to Avoid
- Not maintaining proper Ihram state
- Rushing through rituals
- Not following the proper sequence
- Neglecting personal hygiene and health

## Chapter 5: Spiritual Benefits
- Purification of the soul
- Unity with Muslims worldwide
- Increased devotion and faith
- Life-changing spiritual experience

## Conclusion
The Hajj is a transformative journey that requires both physical and spiritual preparation. May Allah accept the Hajj of all pilgrims and grant them a blessed and safe journey.
    `
  },
  2: {
    title: "Umrah: The Lesser Pilgrimage",
    instructor: "Dr. Fatima Al-Zahra",
    duration: "4 hours",
    rating: 4.8,
    students: 1876,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    description: "Complete guide to performing Umrah with proper etiquette and spiritual preparation.",
    fullContent: `
# Umrah: The Lesser Pilgrimage

## Introduction
Umrah, often called the "lesser pilgrimage," is a pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj which has specific dates.

## Chapter 1: Understanding Umrah
### Definition and Significance
- Meaning of Umrah in Arabic
- Spiritual significance and rewards
- Difference between Umrah and Hajj
- Times when Umrah is most recommended

### Types of Umrah
- Umrah al-Mufradah (Independent Umrah)
- Umrah al-Tamattu (Part of Hajj)
- Best times to perform Umrah

## Chapter 2: Preparation for Umrah
### Before Leaving Home
- Intention and spiritual preparation
- Learning the rituals and duas
- Physical and health preparations
- Packing essentials for the journey

### Entering the State of Ihram
- Miqat locations and their significance
- Proper way to enter Ihram
- Ihram clothing and restrictions
- Common mistakes in Ihram state

## Chapter 3: Performing Umrah Rituals
### Arrival at Masjid al-Haram
- First sight of the Kaaba
- Entering the mosque with proper etiquette
- Recommended duas upon seeing the Kaaba

### Tawaf (Circumambulation)
- Seven rounds around the Kaaba
- Starting and ending points
- Istilam (touching/pointing to the Black Stone)
- Duas and supplications during Tawaf
- Tawaf al-Qudum for those performing Hajj

### Prayer at Maqam Ibrahim
- Two units of prayer after Tawaf
- Significance of Maqam Ibrahim
- Recommended recitations

### Sa'i Between Safa and Marwah
- Historical significance of Sa'i
- Seven trips between the hills
- Proper etiquette and supplications
- Areas of increased pace (for men)

### Halq or Taqsir (Hair Cutting)
- Complete shaving (Halq) vs. trimming (Taqsir)
- Recommended practices
- Exit from Ihram state

## Chapter 4: Recommended Acts
### Additional Prayers in Masjid al-Haram
- Praying in different areas of the mosque
- Significance of praying near the Kaaba
- Recommended times for prayer

### Visiting Historical Sites
- Well of Zamzam and its significance
- Hijr Ismail area
- Other significant locations in Makkah

### Duas and Supplications
- Specific duas for each ritual
- Personal supplications and remembrance
- Seeking forgiveness and making requests

## Chapter 5: Etiquette and Guidelines
### Behavior in the Holy Mosque
- Respect for other pilgrims
- Patience during crowded times
- Helping fellow pilgrims
- Maintaining cleanliness

### Common Challenges and Solutions
- Dealing with crowds
- Managing time effectively
- Health and safety considerations
- Language barriers and communication

## Conclusion
Umrah is a beautiful opportunity for spiritual purification and drawing closer to Allah. May every pilgrim find peace, forgiveness, and spiritual fulfillment in this blessed journey.
    `
  },
  3: {
    title: "History of Makkah and Madinah",
    instructor: "Prof. Muhammad Al-Ansari",
    duration: "8 hours",
    rating: 4.9,
    students: 3245,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    description: "Journey through the sacred history of Islam's holiest cities and their significance.",
    fullContent: `
# History of Makkah and Madinah

## Introduction
Makkah and Madinah are the two holiest cities in Islam, each holding profound significance in Islamic history and the development of the Muslim ummah.

## Part I: The Sacred History of Makkah

### Chapter 1: Pre-Islamic Makkah
#### The Foundation of Makkah
- Prophet Ibrahim (Abraham) and Ismail's (Ishmael) arrival
- The miracle of Zamzam water and Hajar's (Hagar) story
- The construction of the first Kaaba by Ibrahim and Ismail
- Makkah as a center of trade and pilgrimage in pre-Islamic Arabia

#### The Tribe of Quraysh
- The rise of the Quraysh tribe as guardians of the Kaaba
- The system of tribal leadership and the role of Qusayy ibn Kilab
- The establishment of trade routes and Makkah's economic importance
- The religious significance of the Kaaba in pre-Islamic times

### Chapter 2: Makkah During the Prophet's Lifetime
#### The Birth of Prophet Muhammad (PBUH)
- The Year of the Elephant (570 CE)
- The significance of Abraha's failed attack on Makkah
- The birth of the Prophet and early life in Makkah
- The social and religious conditions of Makkah

#### The Beginning of Islam
- The first revelation in Cave Hira
- The early Muslim community and persecution
- The boycott of Banu Hashim
- The Year of Sorrow and the loss of Khadijah and Abu Talib

#### The Hijra and After
- The migration to Madinah and its significance
- The conquest of Makkah (8 AH/630 CE)
- The cleansing of the Kaaba from idols
- The Farewell Pilgrimage and its eternal significance

### Chapter 3: Makkah After the Prophet
#### The Rashidun Caliphate Period
- The expansion of the Haram during Umar's caliphate
- The first major renovations of the Masjid al-Haram
- The role of Makkah in the expanding Islamic empire
- The governance of Makkah under the Rashidun caliphs

#### Through the Ages
- Umayyad contributions to Makkah's development
- Abbasid period and the care of the holy sites
- Ottoman guardianship and architectural developments
- Modern Saudi custodianship and massive expansions

## Part II: The Illuminated City of Madinah

### Chapter 4: Pre-Islamic Madinah (Yathrib)
#### The Tribes of Yathrib
- The Aws and Khazraj tribes and their conflicts
- The Jewish tribes: Banu Qaynuqa, Banu Nadir, and Banu Qurayza
- The Battle of Bu'ath and its aftermath
- The search for a mediator and the coming of Islam

#### The Geography and Economy
- The oasis city and its agricultural significance
- Trade routes and economic activities
- The strategic importance of Yathrib's location
- Social structure and tribal alliances

### Chapter 5: The Transformation to Madinah
#### The Hijra and Welcome
- The pledge of Aqaba and the Ansar's commitment
- The Prophet's arrival and the construction of the first mosque
- The brotherhood between Muhajirun and Ansar
- The Constitution of Madinah and the first Islamic state

#### The Madinah Period (622-632 CE)
- The establishment of Islamic governance
- Major battles: Badr, Uhud, and the Trench
- The development of Islamic law and society
- The expansion of Islam from Madinah

#### The Prophet's Mosque
- The simple structure of the first mosque
- The role of the mosque in community life
- The Prophet's chambers and family life
- The significance of the minbar and mihrab

### Chapter 6: Madinah After the Prophet
#### The Burial of the Prophet
- The debate over the burial place
- The construction of the Prophet's tomb
- The significance of visiting the Prophet's grave
- The etiquette of ziyarah (visitation)

#### Expansions Through History
- Umayyad expansion under Al-Walid ibn Abd al-Malik
- Abbasid contributions and renovations
- Mamluk period improvements
- Ottoman era developments

#### Modern Madinah
- Saudi custodianship and modern expansions
- The current structure of the Prophet's Mosque
- Facilities for millions of pilgrims
- The preservation of Islamic heritage

## Chapter 7: Sacred Sites and Their Significance

### In Makkah
- The Kaaba and its spiritual significance
- The Black Stone (Hajar al-Aswad)
- Maqam Ibrahim and its historical importance
- The Hills of Safa and Marwah
- The Well of Zamzam
- Cave Hira and the first revelation
- Cave Thawr and the Hijra
- Mount Arafat and the Day of Judgment

### In Madinah
- The Prophet's Mosque and its components
- The Rawdah (the garden of Paradise)
- Quba Mosque - the first mosque in Islam
- The Cemetery of Baqi and its significance
- Mount Uhud and the battlefield
- The Date Palm groves and their blessings

## Chapter 8: Lessons from Sacred History

### Spiritual Lessons
- The continuity of monotheistic tradition
- The importance of sacrifice and dedication
- The role of community in Islamic development
- The significance of place in spiritual practice

### Historical Insights
- The spread of Islam from these sacred centers
- The role of leadership in preserving sacred sites
- The importance of pilgrimage in maintaining unity
- The evolution of Islamic architecture and art

## Conclusion
The histories of Makkah and Madinah are intertwined with the very essence of Islam. These sacred cities continue to serve as beacons of faith, drawing millions of believers annually and reminding us of the profound legacy of Prophet Muhammad and the early Muslim community.

Understanding their history deepens our appreciation for the sacrifices made by our predecessors and strengthens our connection to the global Muslim ummah. May Allah grant us the opportunity to visit these blessed places and benefit from their spiritual atmosphere.
    `
  },
  7: {
    title: "The Golden Age of Islam",
    instructor: "Dr. Hassan Al-Baghdadi",
    duration: "9 hours",
    rating: 4.8,
    students: 2156,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    description: "Explore the scientific, cultural, and intellectual achievements of Islamic civilization.",
    fullContent: `
# The Golden Age of Islam

## Introduction
The Golden Age of Islam, spanning roughly from the 8th to the 13th centuries, represents one of history's most remarkable periods of intellectual, scientific, and cultural achievement. This era saw the Islamic world become the center of learning and innovation.

## Chapter 1: Historical Context and Foundation

### The Rise of Islamic Civilization
- The rapid expansion of Islam in the 7th and 8th centuries
- The establishment of the Umayyad and Abbasid Caliphates
- The founding of Baghdad as the "City of Peace" in 762 CE
- The House of Wisdom (Bayt al-Hikmah) and its role in scholarship

### The Translation Movement
- The preservation and translation of Greek, Persian, and Indian texts
- Key figures: Hunayn ibn Ishaq, Thabit ibn Qurra, and others
- The role of Christian and Jewish scholars in the translation efforts
- The impact of multilingual scholarship on knowledge preservation

## Chapter 2: Scientific Achievements

### Mathematics and Algebra
- Al-Khwarizmi and the development of algebra (al-jabr)
- The introduction of Arabic numerals and the concept of zero
- Advances in geometry by scholars like Al-Battani and Ibn al-Haytham
- The development of trigonometry and its applications

### Astronomy and Navigation
- The establishment of observatories in Baghdad, Damascus, and Cordoba
- Al-Battani's precise astronomical measurements
- The astrolabe and its perfection by Islamic scholars
- Navigation techniques that enabled global exploration

### Medicine and Healthcare
- Al-Razi (Rhazes) and the first accurate description of smallpox
- Ibn Sina (Avicenna) and "The Canon of Medicine"
- The establishment of the first hospitals with medical schools
- Surgical innovations by Al-Zahrawi (Albucasis)

### Chemistry and Alchemy
- Jabir ibn Hayyan and the foundations of experimental chemistry
- The development of distillation, crystallization, and other techniques
- The transition from alchemy to systematic chemistry
- Contributions to pharmacology and drug preparation

### Physics and Optics
- Ibn al-Haytham (Alhazen) and the scientific method
- Groundbreaking work in optics and the nature of light
- The camera obscura and early understanding of vision
- Contributions to the understanding of gravity and motion

## Chapter 3: Philosophy and Theology

### Islamic Philosophy
- Al-Kindi and the introduction of Greek philosophy to Islam
- Al-Farabi's political philosophy and the "Virtuous City"
- Ibn Sina's metaphysics and the proof of God's existence
- Ibn Rushd (Averroes) and the reconciliation of reason and faith

### Theological Developments
- The Mu'tazila school and rational theology
- Al-Ash'ari and orthodox Sunni theology
- The development of Islamic jurisprudence (fiqh)
- The role of the ulema in preserving religious knowledge

## Chapter 4: Literature and Arts

### Poetry and Prose
- The preservation and development of Arabic poetry
- The maqamat genre and its literary innovations
- Persian poetry: Ferdowsi's Shahnameh and Omar Khayyam's Rubaiyat
- The influence of Islamic literature on world literature

### Architecture and Design
- The development of Islamic architectural styles
- The Dome of the Rock and early Islamic monuments
- The Great Mosque of Cordoba and Andalusian architecture
- Geometric patterns and calligraphy as art forms

### Music and Performance
- The development of musical theory and notation
- The oud and other Islamic musical instruments
- The integration of music with poetry and religious expression
- The influence of Islamic music on European musical development

## Chapter 5: Education and Learning Centers

### The Madrasah System
- The development of formal Islamic education
- The Nizamiyah schools and their curriculum
- The integration of religious and secular knowledge
- The role of scholarship in Islamic society

### Major Centers of Learning
- Baghdad: The House of Wisdom and scholarly activity
- Cordoba: The jewel of Islamic Spain
- Cairo: Al-Azhar University and its influence
- Bukhara and Samarkand: Central Asian centers of learning

### Libraries and Book Culture
- The great libraries of the Islamic world
- The House of Wisdom library in Baghdad
- The Cordoba library and its vast collection
- The role of paper-making in spreading knowledge

## Chapter 6: Economic and Social Innovations

### Trade and Commerce
- The development of banking and credit systems
- The role of Muslim merchants in global trade
- Trade routes: the Silk Road and maritime networks
- The influence of Islamic commercial law

### Agriculture and Technology
- Agricultural innovations and crop rotation
- The development of irrigation systems
- Technological advances in manufacturing
- The role of guilds in economic organization

### Urban Planning and Infrastructure
- The development of Islamic cities
- Water supply systems and public works
- The role of the mosque in urban planning
- Public health and sanitation systems

## Chapter 7: Cross-Cultural Exchange

### Intellectual Exchange
- The role of Islamic scholars in preserving and transmitting knowledge
- The influence of Islamic scholarship on medieval Europe
- The Crusades and their impact on cultural exchange
- The translation of Islamic works into Latin

### Technological Transfer
- The spread of Islamic innovations to Europe and Asia
- The role of Islamic Spain in knowledge transmission
- The influence of Islamic medicine on European practice
- Agricultural and industrial techniques

## Chapter 8: The Decline and Legacy

### Factors in the Decline
- The Mongol invasions and the destruction of Baghdad (1258)
- Internal political fragmentation
- The rise of European maritime powers
- Changes in trade routes and economic systems

### The Lasting Legacy
- The preservation of classical knowledge
- Contributions to the European Renaissance
- The ongoing influence of Islamic scholarship
- Modern recognition of Islamic Golden Age achievements

### Lessons for Today
- The importance of intellectual freedom and inquiry
- The value of cross-cultural learning and exchange
- The role of education in societal development
- The integration of religious and secular knowledge

## Chapter 9: Notable Figures of the Golden Age

### Scientists and Mathematicians
- Al-Khwarizmi: The father of algebra
- Ibn al-Haytham: Pioneer of the scientific method
- Al-Biruni: Universal scholar and mathematician
- Ibn Sina: The prince of physicians

### Philosophers and Theologians
- Al-Ghazali: The renewer of religious faith
- Ibn Rushd: The great commentator
- Al-Farabi: The second teacher (after Aristotle)
- Ibn Khaldun: The father of sociology

### Literary Figures
- Al-Jahiz: Master of Arabic prose
- Al-Mutanabbi: The greatest Arabic poet
- Ibn Battuta: The great traveler and chronicler
- Rumi: The mystical poet of love

## Conclusion

The Golden Age of Islam represents a remarkable period when Islamic civilization led the world in learning, innovation, and cultural achievement. This era demonstrates the potential of human intellectual endeavor when supported by a culture that values knowledge, encourages inquiry, and promotes cross-cultural exchange.

The achievements of this period continue to influence our world today, reminding us of the important contributions made by Islamic civilization to human progress. Understanding this golden age helps us appreciate the rich intellectual heritage of Islam and its ongoing relevance to contemporary challenges.

May we draw inspiration from this glorious period to continue the pursuit of knowledge and the advancement of human civilization in accordance with Islamic values and universal human principles.
    `
  },
  5: {
    title: "Islamic Jurisprudence for Pilgrims",
    instructor: "Dr. Ahmad Al-Fiqhi",
    duration: "10 hours",
    rating: 4.7,
    students: 1654,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    description: "Understanding Islamic law as it applies to pilgrimage and daily worship.",
    fullContent: `
# Islamic Jurisprudence for Pilgrims

## Introduction
Islamic jurisprudence (Fiqh) provides comprehensive guidance for Muslims in all aspects of life, including the sacred rituals of Hajj and Umrah. This course explores the legal principles that govern pilgrimage and daily worship.

## Chapter 1: Foundations of Islamic Jurisprudence

### Sources of Islamic Law
- The Quran: The primary source of Islamic guidance
- The Sunnah: Prophetic traditions and their authority
- Ijma: Consensus of Islamic scholars
- Qiyas: Analogical reasoning in Islamic law
- Secondary sources: Istihsan, Maslaha, and others

### The Schools of Islamic Jurisprudence
- Hanafi School: Methodology and characteristics
- Maliki School: The school of Madinah's practice
- Shafi'i School: Systematic approach to jurisprudence
- Hanbali School: Traditional and textual emphasis
- The role of madhabs in Islamic scholarship

### Legal Methodology
- The science of usul al-fiqh (principles of jurisprudence)
- Types of evidence and their hierarchy
- The process of deriving legal rulings
- The role of ijtihad (independent reasoning)
- Contemporary applications of classical principles

## Chapter 2: Purification and Prayer (Taharah and Salah)

### Ritual Purity
- Types of impurity: major (janabah) and minor (hadath)
- The requirements for wudu (ablution)
- Ghusl (full body purification) and its occasions
- Tayammum (dry ablution) and its conditions
- Maintaining purity during travel and pilgrimage

### Prayer Obligations
- The five daily prayers and their times
- Shortened prayers during travel (qasr)
- Combining prayers (jam') and its conditions
- Prayer direction (qiblah) and its determination
- Congregational prayer and its merits

### Special Circumstances
- Prayer during illness and difficulty
- Prayer while traveling and its rulings
- Prayer in different time zones
- Making up missed prayers (qada)
- Prayer in places of worship other than mosques

## Chapter 3: Hajj Jurisprudence

### Prerequisites for Hajj
- The conditions of obligation (wujub)
- Physical and financial capability
- Safety of the journey
- The role of mahram for women (scholarly differences)
- Hajj by proxy (hajj al-badal)

### Ihram and Its Rulings
- The intention (niyyah) for Ihram
- The miqat boundaries and their significance
- Ihram clothing and its requirements
- Prohibited acts during Ihram
- Penalties for violating Ihram restrictions

### The Rituals of Hajj
- Essential (fard) elements of Hajj
- Obligatory (wajib) acts and their penalties
- Recommended (mustahabb) actions
- The sequence of Hajj rituals
- Differences between the schools of jurisprudence

### Common Jurisprudential Issues
- Delegating certain rituals
- Making up for missed or incorrectly performed rituals
- The role of menstruation in Hajj performance
- Hajj during pregnancy and its considerations
- Emergency situations and their rulings

## Chapter 4: Umrah Jurisprudence

### The Legal Status of Umrah
- Scholarly opinions on Umrah's obligation
- The relationship between Hajj and Umrah
- Performing multiple Umrahs
- Umrah during the Hajj months
- Children and Umrah performance

### Umrah Rituals and Their Rulings
- Entering Ihram for Umrah
- Tawaf requirements and their validity
- Sa'i between Safa and Marwah
- Hair cutting or shaving requirements
- Exiting Ihram and its conditions

## Chapter 5: Financial Obligations and Charity

### Zakat and Pilgrimage
- Zakat obligations during travel
- The impact of Hajj expenses on zakat calculation
- Zakat al-fitr and its payment during Hajj
- Giving charity in the holy cities
- The etiquette of receiving and giving charity

### Hajj Expenses and Debt
- Financing Hajj through permissible means
- The prohibition of interest-based Hajj financing
- Hajj when one has outstanding debts
- Using zakat funds for Hajj expenses
- The priority of family obligations over Hajj

## Chapter 6: Family and Social Relations

### Women's Issues in Pilgrimage
- The mahram requirement and its scholarly interpretations
- Menstruation and its impact on rituals
- Pregnancy and pilgrimage considerations
- Elderly women and Hajj requirements
- Modern transportation and mahram requirements

### Marriage and Divorce During Pilgrimage
- The prohibition of marriage contracts during Ihram
- Divorce during pilgrimage and its implications
- Family disputes and their resolution
- The role of Islamic courts in pilgrimage matters
- Mediation and conflict resolution

## Chapter 7: Contemporary Jurisprudential Issues

### Modern Transportation and Technology
- Air travel and its impact on miqat observance
- GPS technology for qiblah direction
- Modern crowd control and its effects on rituals
- Photography and recording during pilgrimage
- Social media use and its etiquette

### Medical and Health Issues
- Vaccination requirements and Islamic law
- Medical treatment during Ihram state
- Wheelchair use and ritual performance
- Diabetes, heart conditions, and pilgrimage
- Mental health considerations

### Financial and Legal Matters
- Insurance for pilgrimage and its permissibility
- Currency exchange and its regulations
- Lost documents and legal procedures
- Inheritance issues during pilgrimage
- Power of attorney for pilgrimage matters

## Chapter 8: Dispute Resolution and Mediation

### Islamic Principles of Conflict Resolution
- The Quranic approach to dispute resolution
- The role of mediation (sulh) in Islamic law
- The importance of justice and fairness
- Forgiveness and reconciliation in Islam
- The role of community leaders in mediation

### Common Pilgrimage Disputes
- Financial disputes between pilgrims
- Conflicts over ritual performance
- Family disagreements during pilgrimage
- Issues with tour operators and service providers
- Disputes over inheritance and property

## Chapter 9: Ethical Guidelines for Pilgrims

### Islamic Ethics and Morality
- The concept of akhlaq (Islamic morality)
- Dealing with fellow pilgrims with kindness
- Patience and forbearance during difficulties
- Honesty in all transactions
- Respect for the sacred sites and their sanctity

### Environmental and Social Responsibility
- Cleanliness and environmental protection
- Water conservation in the holy cities
- Waste management and recycling
- Helping fellow pilgrims in need
- Contributing to the welfare of the community

## Chapter 10: Post-Pilgrimage Obligations

### Maintaining the Spiritual Gains
- Continuing good deeds after pilgrimage
- Sharing knowledge and experiences
- Maintaining connections with fellow pilgrims
- Applying lessons learned during pilgrimage
- The concept of Hajj mabrur (accepted pilgrimage)

### Legal Obligations After Return
- Settling any outstanding debts
- Fulfilling promises made during pilgrimage
- Distributing gifts and sacrificial meat
- Completing any unfinished religious obligations
- Planning for future spiritual journeys

## Conclusion

Understanding Islamic jurisprudence is essential for every Muslim, particularly those undertaking the sacred journey of pilgrimage. This knowledge enables pilgrims to perform their religious duties correctly and deal with various situations that may arise during their spiritual journey.

The principles of Islamic law provide guidance not only for ritual worship but also for ethical conduct, social relations, and personal development. By studying and applying these principles, pilgrims can ensure that their pilgrimage is both legally sound and spiritually meaningful.

May Allah grant us the ability to follow His guidance in all aspects of our lives and accept our acts of worship and devotion. May our pilgrimage be a source of spiritual purification and closeness to our Creator.
    `
  },
  8: {
    title: "Spiritual Preparation for Hajj",
    instructor: "Sheikh Yusuf Al-Qaradawi",
    duration: "4 hours",
    rating: 4.9,
    students: 4321,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    description: "Mental and spiritual readiness for the transformative journey of Hajj.",
    fullContent: `
# Spiritual Preparation for Hajj

## Introduction
The Hajj is not merely a physical journey but a profound spiritual transformation that begins long before one sets foot in the holy lands. This course guides you through the essential spiritual preparations that will help you maximize the benefits of this sacred pilgrimage.

## Chapter 1: Understanding the Spiritual Significance of Hajj

### The Inner Dimension of Pilgrimage
- Hajj as a journey of the soul
- The symbolism behind each ritual
- Connecting with Prophet Ibrahim's (AS) legacy
- The universal message of monotheism (Tawhid)
- Hajj as a rehearsal for the Day of Judgment

### The Transformative Power of Hajj
- Spiritual rebirth and renewal
- The concept of being "reborn" after Hajj
- Shedding the layers of worldly attachments
- Experiencing divine mercy and forgiveness
- The psychological impact of sacred spaces

### Historical and Prophetic Context
- The Prophet's (PBUH) Hajj and his spiritual state
- Lessons from the companions' pilgrimage experiences
- The continuity of pilgrimage from Ibrahim to Muhammad
- The spiritual evolution of the Muslim community
- The role of intention (niyyah) in spiritual transformation

## Chapter 2: Purification of the Soul (Tazkiyah)

### Self-Examination and Reflection
- Honest assessment of one's spiritual state
- Identifying areas for improvement
- The importance of humility and self-awareness
- Recognizing our dependence on Allah
- Preparing for spiritual challenges

### Repentance and Seeking Forgiveness (Tawbah)
- The conditions of sincere repentance
- Making amends with those we have wronged
- Seeking forgiveness from family and friends
- The etiquette of asking for forgiveness
- Clearing the heart from grudges and resentment

### Spiritual Cleansing Practices
- Increased dhikr (remembrance of Allah)
- Night prayers (Tahajjud) and their benefits
- Fasting as spiritual preparation
- Charity and its purifying effects
- Reading and reflecting on the Quran

### Developing God-Consciousness (Taqwa)
- Understanding the concept of Taqwa
- Practical steps to increase God-consciousness
- The role of Taqwa in Hajj rituals
- Maintaining Taqwa after returning from Hajj
- Taqwa as the ultimate goal of pilgrimage

## Chapter 3: Mental and Emotional Preparation

### Managing Expectations
- Understanding the challenges of Hajj
- Preparing for physical discomfort
- Dealing with crowds and congestion
- Managing time and scheduling
- Accepting that perfection is not the goal

### Emotional Readiness
- Preparing for intense spiritual experiences
- Dealing with homesickness and separation
- Managing stress and anxiety
- Cultivating patience and perseverance
- Preparing for emotional overwhelm

### Building Mental Resilience
- Developing coping strategies
- The importance of flexibility
- Preparing for unexpected situations
- Building positive relationships with fellow pilgrims
- Maintaining focus on spiritual goals

### Psychological Benefits of Preparation
- Reduced anxiety and stress
- Enhanced spiritual experiences
- Better ability to help others
- Increased confidence and peace of mind
- Greater appreciation for the journey

## Chapter 4: Preparing the Heart

### Cultivating Love for Allah
- Understanding Allah's names and attributes
- Developing a personal relationship with the Divine
- The role of love in worship
- Finding Allah in daily life
- Preparing the heart to receive divine blessings

### Increasing in Gratitude (Shukr)
- Recognizing the blessing of being chosen for Hajj
- Gratitude for health, wealth, and opportunity
- Expressing thankfulness through actions
- The relationship between gratitude and contentment
- Gratitude as a means of spiritual elevation

### Developing Compassion and Empathy
- Preparing to serve fellow pilgrims
- Understanding the diversity of the Muslim ummah
- Cultivating patience with others
- The etiquette of communal worship
- Building bridges across cultural differences

### Strengthening Trust in Allah (Tawakkul)
- Relying on Allah while taking practical measures
- Surrendering control and trusting divine wisdom
- Finding peace in uncertainty
- The balance between effort and reliance
- Tawakkul as a source of inner strength

## Chapter 5: Preparing Through Worship and Devotion

### Intensifying Prayer (Salah)
- Improving the quality of daily prayers
- Adding voluntary prayers (Nafl)
- Developing concentration (Khushu) in prayer
- Understanding the meanings of recitations
- Prayer as preparation for sacred rituals

### Increased Quran Engagement
- Daily Quran reading and reflection
- Understanding the verses related to Hajj
- Memorizing key supplications (duas)
- Contemplating the stories of previous prophets
- The Quran as a guide for spiritual development

### Dhikr (Remembrance of Allah)
- Establishing a daily dhikr routine
- Learning the specific dhikr for Hajj
- Understanding the power of divine remembrance
- Using dhikr to maintain spiritual focus
- The transformative effect of consistent dhikr

### Fasting and Voluntary Acts
- Voluntary fasting as spiritual training
- Giving charity (Sadaqah) regularly
- Performing additional acts of worship
- Seeking opportunities to serve others
- Building spiritual momentum before departure

## Chapter 6: Learning and Knowledge Preparation

### Understanding the Rituals
- Studying the step-by-step process of Hajj
- Understanding the wisdom behind each ritual
- Learning from scholarly explanations
- Watching educational videos and documentaries
- Attending Hajj preparation classes

### Memorizing Essential Duas
- The Talbiyah and its meaning
- Duas for Tawaf and Sa'i
- Supplications for Arafat and Muzdalifah
- Prayers for seeking forgiveness
- Personal duas in one's native language

### Historical and Cultural Context
- Learning about the history of Makkah and Madinah
- Understanding the multicultural nature of Hajj
- Appreciating the diversity of the Muslim world
- Respecting different cultural practices
- Building cultural sensitivity and awareness

### Practical Islamic Knowledge
- Reviewing the basics of Islamic creed (Aqidah)
- Understanding Islamic ethics and morality
- Learning about the rights of fellow Muslims
- Studying the etiquette of travel and pilgrimage
- Preparing to answer questions about Islam

## Chapter 7: Social and Communal Preparation

### Repairing Relationships
- Resolving conflicts with family members
- Seeking forgiveness from friends and colleagues
- Clearing any outstanding debts or obligations
- Strengthening bonds with loved ones
- Creating positive memories before departure

### Community Engagement
- Participating in mosque activities
- Joining Hajj preparation groups
- Sharing knowledge and experiences
- Supporting other prospective pilgrims
- Building networks of spiritual support

### Preparing for Service
- Developing a servant's heart
- Preparing to help elderly and disabled pilgrims
- Learning basic first aid and emergency response
- Practicing patience and kindness
- Preparing to be a positive representative of Islam

### Creating Support Systems
- Establishing communication plans with family
- Building relationships with fellow travelers
- Preparing emergency contacts and information
- Creating spiritual accountability partnerships
- Planning for continued support after return

## Chapter 8: Physical Preparation with Spiritual Mindset

### Health as a Trust (Amanah)
- Viewing physical health as a divine trust
- The importance of fitness for worship
- Preparing the body as a vehicle for the soul
- Understanding the connection between physical and spiritual health
- Gratitude for the ability to perform pilgrimage

### Dietary Preparation
- Adopting healthy eating habits
- Understanding the spiritual aspects of food
- Preparing for different foods and water
- The etiquette of eating in Islam
- Using nutrition to support spiritual practices

### Sleep and Rest
- Establishing healthy sleep patterns
- Understanding the value of rest in Islam
- Preparing for altered sleep schedules
- Using rest time for spiritual reflection
- The balance between activity and contemplation

### Managing Medications and Health Needs
- Viewing health challenges as spiritual tests
- Finding spiritual meaning in physical limitations
- Preparing adaptive strategies for worship
- Seeking divine healing through pilgrimage
- Accepting Allah's decree with patience

## Chapter 9: Preparing for Specific Hajj Experiences

### The Journey to Sacred Spaces
- Preparing for the first sight of the Kaaba
- Anticipating overwhelming emotions
- Managing expectations of spiritual experiences
- Understanding that everyone's experience is unique
- Preparing for moments of divine connection

### The Day of Arafat
- Understanding the significance of this day
- Preparing for intensive prayer and supplication
- Managing physical and emotional demands
- Planning personal supplications and requests
- Preparing for potential spiritual breakthroughs

### The Ritual of Stoning
- Understanding the symbolism of rejecting evil
- Preparing for the physical challenges
- Managing crowd dynamics spiritually
- Using the ritual for personal purification
- Connecting the ritual to daily life struggles

### Sacrifice and Its Meaning
- Understanding the spiritual significance of Qurbani
- Connecting to Prophet Ibrahim's example
- Preparing for the act of giving and sacrifice
- Understanding the global impact of Hajj charity
- Personal reflection on what needs to be sacrificed

## Chapter 10: Sustaining Spiritual Momentum

### Maintaining Focus During Hajj
- Strategies for staying spiritually centered
- Dealing with distractions and difficulties
- Using challenges as opportunities for growth
- Maintaining regular spiritual practices
- Finding Allah in every moment of the journey

### Preparing for Post-Hajj Life
- Setting spiritual goals for after Hajj
- Planning for continued spiritual growth
- Preparing to share experiences and lessons
- Maintaining connections with fellow pilgrims
- Integrating Hajj lessons into daily life

### The Concept of Hajj Mabrur
- Understanding what makes a Hajj accepted
- The signs of an accepted pilgrimage
- Living the values of Hajj after return
- Becoming a better Muslim and human being
- Sharing the blessings of Hajj with others

## Chapter 11: Practical Spiritual Exercises

### Daily Spiritual Routine (8 weeks before Hajj)
- Morning dhikr and reflection (15 minutes)
- Reading one page of Quran with contemplation
- Making specific duas for Hajj preparation
- Evening self-examination and gratitude
- Weekly spiritual goals and assessment

### Meditation and Contemplation Practices
- Reflecting on Allah's creation and majesty
- Contemplating death and the afterlife
- Meditating on the purpose of life
- Visualizing the Hajj journey and its meanings
- Silent dhikr and heart-centered remembrance

### Spiritual Journaling
- Daily gratitude entries
- Recording spiritual insights and reflections
- Tracking spiritual growth and challenges
- Writing letters to Allah expressing hopes and fears
- Documenting lessons learned and goals set

### Community Spiritual Activities
- Group dhikr sessions
- Shared Quran study and reflection
- Collective prayer and supplication
- Service projects and charity work
- Spiritual mentorship and guidance

## Conclusion: The Prepared Heart

Spiritual preparation for Hajj is an ongoing journey that transforms the individual from within. It is not merely about knowing what to do, but about becoming the person who can fully benefit from this sacred journey.

The prepared heart is one that:
- Recognizes Allah's greatness and mercy
- Understands its own need for purification
- Approaches the journey with humility and gratitude
- Is ready to serve Allah and His creation
- Seeks transformation, not just completion of rituals

Remember that the true pilgrimage is the journey of the soul toward its Creator. The physical journey to Makkah is merely the external manifestation of this internal spiritual reality.

May Allah accept your preparations, bless your journey, and grant you a Hajj that transforms your heart and brings you closer to Him. May you return as one who has been purified, forgiven, and spiritually renewed.

The path to spiritual preparation never truly ends - it continues throughout life, with Hajj serving as a pivotal moment of spiritual awakening and commitment to a life of devotion and service to Allah.
    `
  },
  9: {
    title: "Islamic Architecture and Sacred Spaces",
    instructor: "Arch. Layla Al-Andalusi",
    duration: "7 hours",
    rating: 4.7,
    students: 1432,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    description: "Understanding the design and significance of Islamic architecture, including the Kaaba.",
    fullContent: `
# Islamic Architecture and Sacred Spaces

## Introduction
Islamic architecture represents one of humanity's greatest artistic and spiritual achievements, combining functionality with divine inspiration. This course explores the principles, evolution, and spiritual significance of Islamic architectural traditions.

## Chapter 1: Foundations of Islamic Architecture

### Origins and Early Development
- Pre-Islamic architectural influences in Arabia
- The Prophet's Mosque in Madinah as the first Islamic structure
- Byzantine and Sassanian influences on early Islamic architecture
- The development of distinctly Islamic architectural elements
- Regional variations and local adaptations

### Core Principles and Philosophy
- Architecture as a reflection of Tawhid (unity of Allah)
- The concept of sacred geometry in Islamic design
- The integration of form and function
- Environmental considerations and climate adaptation
- The balance between earthly needs and spiritual aspirations

### Key Architectural Elements
- The mihrab (prayer niche) and its significance
- The minbar (pulpit) and its role in Islamic architecture
- Minarets: evolution from simple towers to architectural marvels
- Domes: symbolism and structural innovations
- Courtyards and their role in Islamic architecture

## Chapter 2: The Sacred Architecture of Makkah

### The Kaaba: The House of Allah
- Historical development from Ibrahim's time to present
- Architectural simplicity and profound symbolism
- The Black Stone and its incorporation into the structure
- The Kiswa (covering) as architectural decoration
- The Kaaba's role as the architectural center of the Islamic world

### Masjid al-Haram: The Sacred Mosque
- Evolution from simple enclosure to modern complex
- Major expansions throughout Islamic history
- Architectural challenges of accommodating millions
- The integration of modern technology with traditional design
- Crowd flow and safety considerations in design

### Supporting Structures and Facilities
- The Zamzam well and its architectural treatment
- Maqam Ibrahim and its protective structure
- The Safa and Marwah hills and their architectural development
- Modern additions: air conditioning, marble floors, and technology
- Accessibility features for disabled pilgrims

## Chapter 3: Madinah's Sacred Architecture

### The Prophet's Mosque (Masjid an-Nabawi)
- The original simple structure and its significance
- Expansions during the Rashidun Caliphate
- Umayyad architectural innovations
- Modern expansions and their architectural challenges
- The integration of the Prophet's tomb into the mosque structure

### Quba Mosque: The First Mosque
- Historical significance and original design
- Architectural evolution over the centuries
- Modern reconstruction and design principles
- The role of Quba in Islamic architectural history
- Symbolic importance in mosque design

### Other Significant Structures in Madinah
- Masjid al-Qiblatayn and its unique history
- Historical houses and their architectural features
- The cemetery of Baqi and its architectural treatment
- Mount Uhud and memorial structures
- Modern Islamic architecture in Madinah

## Chapter 4: Classical Islamic Architectural Styles

### Umayyad Architecture (661-750 CE)
- The Dome of the Rock: architectural masterpiece
- The Great Mosque of Damascus and its innovations
- Desert palaces and their architectural features
- Integration of Byzantine and Islamic elements
- The development of the Islamic architectural vocabulary

### Abbasid Architecture (750-1258 CE)
- Baghdad as an architectural center
- The development of the four-iwan plan
- Samarra and its architectural innovations
- The use of brick and decorative techniques
- Palace architecture and urban planning

### Fatimid and Ayyubid Contributions
- Cairo as a center of Islamic architecture
- The development of the madrasa building type
- Military architecture and fortifications
- Decorative arts and architectural ornamentation
- The integration of Coptic and Islamic elements

## Chapter 5: Regional Islamic Architectural Traditions

### Andalusian Architecture
- The Great Mosque of Cordoba and its unique features
- The Alhambra: palace architecture at its finest
- The development of the horseshoe arch
- Gardens and water features in architecture
- The influence of Andalusian architecture on global design

### Mamluk Architecture (1250-1517 CE)
- Cairo's architectural golden age
- The development of the mosque-madrasa complex
- Innovative stone masonry and dome construction
- The use of colored stone and geometric patterns
- Influence on Ottoman and later Islamic architecture

### Ottoman Architecture (1299-1922 CE)
- The development of the Ottoman mosque type
- Sinan's architectural genius and innovations
- The Süleymaniye Mosque and its architectural significance
- The integration of Byzantine and Islamic traditions
- Provincial Ottoman architecture across the empire

### Safavid Persian Architecture
- Isfahan as an architectural showcase
- The development of Iranian architectural traditions
- The use of colored tiles and decorative arts
- Garden design and its integration with architecture
- The influence of Persian architecture on Mughal traditions

### Mughal Architecture in the Indian Subcontinent
- The Taj Mahal as an architectural masterpiece
- The development of Indo-Islamic architectural synthesis
- Red Fort and its architectural innovations
- The use of red sandstone and white marble
- Regional variations across the subcontinent

## Chapter 6: Decorative Arts and Ornamentation

### Geometric Patterns
- The mathematical basis of Islamic geometric design
- Symbolic meanings of geometric patterns
- The infinite pattern concept and its spiritual significance
- Regional variations in geometric ornamentation
- Modern applications of traditional geometric principles

### Calligraphy as Architectural Decoration
- The development of architectural calligraphy
- Different scripts used in architectural decoration
- The integration of text and design
- Sacred texts and their architectural presentation
- Contemporary calligraphic architecture

### Arabesque and Floral Motifs
- The stylization of natural forms in Islamic art
- Regional variations in arabesque design
- The integration of floral motifs with geometric patterns
- Symbolic meanings of common motifs
- The evolution of decorative vocabulary

### Muqarnas and Stalactite Vaulting
- The development of muqarnas technology
- Structural and decorative functions
- Regional variations in muqarnas design
- The mathematical precision of muqarnas construction
- Modern interpretations of traditional techniques

## Chapter 7: Sacred Geometry and Symbolism

### Mathematical Principles in Islamic Architecture
- The use of proportion and scale
- Golden ratio and its application in Islamic design
- Sacred numbers and their architectural significance
- The geometry of the circle and its spiritual meaning
- Fractal geometry in Islamic architectural decoration

### Symbolic Elements in Sacred Architecture
- The dome as a symbol of the heavens
- The mihrab as a gateway to the divine
- Water features and their symbolic significance
- Light and shadow in Islamic architectural design
- The courtyard as a symbol of paradise

### The Architecture of Paradise
- Quranic descriptions of paradise and their architectural influence
- Gardens and their integration with architecture
- The four-part garden (chahar bagh) and its significance
- Water channels and fountains as architectural elements
- The architectural metaphor in Islamic literature

## Chapter 8: Modern Islamic Architecture

### Revival and Reform Movements
- 19th and 20th-century architectural revivals
- The search for authentic Islamic architectural expression
- Colonial influence and architectural response
- The role of nationalism in architectural development
- Contemporary interpretations of classical traditions

### Hassan Fathy and Vernacular Architecture
- The Architecture for the Poor movement
- The use of traditional materials and techniques
- Community participation in architectural design
- Environmental sustainability in Islamic architecture
- The influence of Fathy on contemporary Islamic architecture

### Contemporary Mosque Design
- Challenges of modern mosque architecture
- The integration of traditional and modern elements
- Contemporary interpretations of classical mosque types
- Technology and its integration into mosque design
- Global mosque architecture and cultural adaptation

### Islamic Architecture in the 21st Century
- Sustainable design principles in Islamic architecture
- The role of technology in contemporary Islamic buildings
- Globalization and its impact on Islamic architectural identity
- Contemporary Islamic architects and their contributions
- Future directions in Islamic architectural development

## Chapter 9: Conservation and Preservation

### Challenges in Preserving Islamic Architecture
- Environmental threats to historic Islamic buildings
- Urban development pressures
- The balance between preservation and modernization
- Documentation and recording of architectural heritage
- International efforts in preservation

### Case Studies in Conservation
- The restoration of the Alhambra
- Conservation efforts at the Great Mosque of Cordoba
- Challenges in preserving Mamluk architecture in Cairo
- Modern conservation techniques and their application
- Community involvement in preservation efforts

### The Role of UNESCO and International Organizations
- World Heritage Sites and Islamic architecture
- International conventions on architectural preservation
- Funding and support for conservation projects
- Training programs for conservation specialists
- Global awareness and appreciation of Islamic architecture

## Chapter 10: Spiritual Dimensions of Sacred Space

### The Experience of Sacred Architecture
- How architecture affects spiritual experience
- The role of proportion and scale in creating sacred atmosphere
- Light, shadow, and their spiritual significance
- Sound and acoustics in Islamic architecture
- The multisensory experience of sacred spaces

### Architecture and Worship
- How architectural design supports Islamic worship
- The qibla orientation and its architectural implications
- Spaces for different types of Islamic worship
- Gender considerations in Islamic architectural design
- Accessibility and inclusivity in mosque design

### The Psychology of Sacred Space
- How Islamic architecture affects human behavior
- The creation of contemplative spaces
- Architecture as a aid to spiritual focus
- The role of beauty in Islamic architectural design
- Therapeutic aspects of Islamic architectural environments

## Conclusion: Living Heritage

Islamic architecture represents more than mere buildings; it embodies the spiritual aspirations, cultural values, and artistic achievements of Islamic civilization. From the simple elegance of the Kaaba to the soaring domes of Ottoman mosques, Islamic architecture continues to inspire and guide contemporary design.

Understanding Islamic architecture helps us appreciate:
- The integration of spiritual and practical considerations
- The universal principles that transcend regional variations
- The ongoing evolution of Islamic architectural traditions
- The importance of preserving our architectural heritage
- The potential for contemporary Islamic architectural innovation

As we face the challenges of the 21st century, Islamic architecture offers valuable lessons in sustainability, community building, and the creation of spaces that nurture both body and soul. The principles developed over fourteen centuries of Islamic architectural evolution remain relevant and inspiring for contemporary architects and planners.

May this understanding of Islamic architecture deepen our appreciation for the built environment and inspire us to create spaces that serve both our earthly needs and our spiritual aspirations. The sacred spaces of Islam continue to call believers to prayer, contemplation, and community, just as they have for over a millennium.

The legacy of Islamic architecture is not merely in stone and mortar, but in the ongoing tradition of creating spaces that bring people closer to Allah and to each other. This living heritage continues to evolve, adapting to new circumstances while maintaining its essential character and purpose.
    `
  },
  11: {
    title: "The Companions of the Prophet",
    instructor: "Sheikh Abdullah Al-Sahabi",
    duration: "11 hours",
    rating: 4.9,
    students: 2876,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    description: "Stories and lessons from the lives of the Prophet's companions (Sahabah).",
    fullContent: `
# The Companions of the Prophet (Sahabah)

## Introduction
The Companions of Prophet Muhammad (peace be upon him) represent the finest generation of Muslims, whose lives serve as eternal examples of faith, sacrifice, and devotion. Their stories illuminate the path for all believers seeking to follow the guidance of Islam.

## Chapter 1: Understanding the Sahabah

### Definition and Significance
- Who qualifies as a Sahabi (Companion)
- The unique status of the Sahabah in Islamic history
- Their role as transmitters of Islamic knowledge
- The Quranic praise for the Companions
- Their position as role models for all Muslims

### Categories of Companions
- The Muhajirun (Emigrants from Makkah)
- The Ansar (Helpers from Madinah)
- Early converts vs. later converts
- Those who participated in key battles
- Special categories: Ashab al-Badr, Ashab al-Hudaybiyyah

### The Promise of Paradise
- The ten promised Paradise (Asharah Mubashsharah)
- Quranic verses praising the Companions
- Prophetic traditions about their excellence
- Their guaranteed entry into Paradise
- The prohibition against speaking ill of them

## Chapter 2: The Rightly-Guided Caliphs (Khulafa ar-Rashidun)

### Abu Bakr as-Siddiq (The Truthful)
- Early conversion and unwavering support
- The nickname "As-Siddiq" and its origin
- Role during the Prophet's lifetime
- Leadership during the Ridda wars
- His humility and simple lifestyle
- Famous sayings and wisdom
- Compilation of the Quran during his reign
- His death and lasting legacy

### Umar ibn al-Khattab (Al-Faruq)
- From enemy to champion of Islam
- The story of his conversion
- His role in expanding the Islamic state
- Administrative genius and just governance
- The establishment of the Islamic calendar
- His fear of accountability before Allah
- Assassination and martyrdom
- Innovations in Islamic governance

### Uthman ibn Affan (Dhu'n-Nurayn)
- The generous and modest Companion
- Marriage to two daughters of the Prophet
- His role in preserving the Quran
- The standardization of the Quranic text
- His generosity and charitable works
- The trials and tribulations of his later reign
- His patient endurance during the siege
- Martyrdom while reading the Quran

### Ali ibn Abi Talib (The Lion of Allah)
- The young hero of Islam
- His early acceptance of Islam
- Bravery in battles and devotion to the Prophet
- Knowledge and wisdom as the "Gate of Knowledge"
- His justice and piety as Caliph
- The challenges faced during his caliphate
- His eloquent speeches and letters
- Martyrdom while in prayer

## Chapter 3: The Mothers of the Believers (Ummahaat al-Mu'mineen)

### Aisha bint Abu Bakr (The Beloved)
- The young and intelligent wife
- Her role in transmitting Islamic knowledge
- The incident of Ifk and her vindication
- Her scholarly contributions to Islam
- Leadership during political upheavals
- Her relationship with other Companions
- Her deep love for the Prophet
- Legacy as a teacher and scholar

### Khadijah bint Khuwaylid (The Pure)
- The first believer and supporter
- Her successful business and marriage proposal
- Financial and emotional support during difficult times
- Mother of the Prophet's children
- Her death during the "Year of Sorrow"
- The Prophet's continued love and remembrance
- Her role in the early Islamic community
- Symbol of strong Muslim womanhood

### Hafsa bint Umar
- Daughter of Umar and wife of the Prophet
- Keeper of the Quranic manuscripts
- Her role in preserving Islamic texts
- Relationship with other wives
- Her knowledge of Islamic jurisprudence
- Participation in community affairs
- Her piety and devotion
- Contribution to Islamic scholarship

### Other Noble Wives
- Sawdah bint Zam'ah: The supportive companion
- Umm Salamah: The wise counselor
- Zaynab bint Jahsh: The generous and pious
- Juwayriyyah bint al-Harith: The blessed
- Safiyyah bint Huyayy: The noble convert
- Umm Habibah: The daughter of Abu Sufyan
- Maymunah bint al-Harith: The last wife

## Chapter 4: The Early Believers

### The First Muslims
- Khadijah: The first believer
- Ali: First male to accept Islam
- Zayd ibn Harithah: The beloved freedman
- Abu Bakr: The first adult male convert
- The significance of being among the first

### The Sabiqun al-Awwalun (The Foremost)
- Talha ibn Ubaydullah: The living martyr
- Az-Zubayr ibn al-Awwam: The disciple of the Prophet
- Abd ar-Rahman ibn Awf: The successful merchant
- Sa'd ibn Abi Waqqas: The answered prayer
- Sa'id ibn Zayd: The promised Paradise
- Abu Ubaydah ibn al-Jarrah: The trustworthy of the nation

### The Persecuted Believers
- Bilal ibn Rabah: From slavery to the call to prayer
- Ammar ibn Yasir: The family of martyrs
- Sumayyah: The first martyr in Islam
- Yasir: The patient believer
- Khabbab ibn al-Aratt: The tortured believer
- Their steadfastness under persecution

## Chapter 5: The Ansar (Helpers of Madinah)

### The Pledge of Aqaba
- The first meeting with the Prophet
- The second pledge and its significance
- Their commitment to protect Islam
- The courage to invite the Prophet to Madinah
- Their role in establishing the first Islamic state

### Leaders of the Ansar
- Sa'd ibn Mu'adh: The chief whose death shook the Throne
- Sa'd ibn Ubadah: The generous leader
- Usayd ibn Hudayr: The beloved of his people
- Abu Ayyub al-Ansari: Host of the Prophet
- Anas ibn Malik: The young servant of the Prophet

### The Ansari Women
- Umm Sulaim: The devoted mother and wife
- Asma bint Abu Bakr: The brave daughter
- Umm Ayman: The second mother of the Prophet
- Rufayda al-Aslamiyya: The first nurse in Islam
- Their contributions to the Islamic community

### The Brotherhood of Faith
- Pairing of Muhajirun and Ansar
- Examples of sacrifice and generosity
- Economic and social integration
- The lasting bonds of brotherhood
- Lessons for contemporary Muslim communities

## Chapter 6: The Warriors and Commanders

### Khalid ibn al-Walid (Sayf Allah al-Maslul)
- From enemy commander to Muslim general
- His conversion and immediate contributions
- The undefeated commander
- Role in the Ridda wars
- Conquests in Iraq and Syria
- His humility despite military genius
- Death and the weeping of Umar

### Amr ibn al-As (The Conqueror of Egypt)
- The diplomat and strategist
- His conversion and early contributions
- Conquest of Egypt and its significance
- Administrative skills and governance
- His wit and intelligence
- Relationship with other Companions
- Legacy in Islamic expansion

### Sa'd ibn Abi Waqqas (The Conqueror of Persia)
- One of the ten promised Paradise
- His role in the Battle of Qadisiyyah
- Conquest of the Sassanian Empire
- His justice and piety as a ruler
- Relationship with his mother
- His prayers and their acceptance
- Death and burial in Madinah

### Other Notable Warriors
- Hamza ibn Abd al-Muttalib: The Lion of Allah
- Ja'far ibn Abi Talib: The one with two wings
- Abdullah ibn Rawaha: The poet warrior
- Zayd ibn Harithah: The beloved of the Prophet
- Their sacrifices for Islam

## Chapter 7: The Scholars and Transmitters

### Abdullah ibn Abbas (Hibr al-Ummah)
- The young scholar blessed by the Prophet
- His vast knowledge of Quranic interpretation
- Role in preserving Islamic scholarship
- His wisdom and understanding
- Teaching methods and students
- Contributions to Islamic jurisprudence
- His humility despite great knowledge

### Abdullah ibn Masud
- One of the earliest converts
- His close relationship with the Prophet
- Master of Quranic recitation
- His role in teaching the Quran
- Contributions to Islamic law
- His simple lifestyle and piety
- Death and the respect he commanded

### Abu Hurairah (The Companion of the Prophet)
- Late conversion but intense dedication
- The most prolific narrator of hadith
- His amazing memory and dedication to learning
- His poverty and contentment
- Service to Islamic scholarship
- His love for the Prophet
- Legacy in hadith preservation

### Other Scholarly Companions
- Abdullah ibn Umar: The careful follower
- Aisha bint Abu Bakr: The scholar among women
- Abdullah ibn Amr ibn al-As: The scribe
- Jabir ibn Abdullah: The narrator of events
- Their collective contribution to Islamic knowledge

## Chapter 8: The Merchants and Philanthropists

### Abd ar-Rahman ibn Awf
- From rags to riches through honest trade
- His generosity and charitable works
- Support for the Islamic community
- His business ethics and principles
- Distribution of wealth before death
- Example of righteous wealth
- His fear of accountability for his wealth

### Uthman ibn Affan (The Generous)
- His immense wealth and its proper use
- Financing the Muslim army (Jaysh al-Usrah)
- Purchase of the well of Rumah
- Expansion of the Prophet's Mosque
- His charitable endowments
- Simplicity despite wealth
- The proper use of worldly resources

### Talha ibn Ubaydullah (The Generous)
- His business acumen and success
- Daily charity and support for the poor
- Investment in community development
- His sacrifices for Islam
- Balance between business and worship
- His death and the mourning of the community

## Chapter 9: Lessons from the Companions

### Faith and Certainty (Iman and Yaqin)
- Unwavering belief despite trials
- Sacrifice of wealth, family, and life for Islam
- Trust in Allah's promise and guidance
- Acceptance of divine decree
- The transformation of character through faith

### Brotherhood and Unity
- The bond that transcended tribal loyalties
- Mutual support and sacrifice
- Resolution of conflicts through Islamic principles
- Respect for diversity within unity
- The example for contemporary Muslim communities

### Knowledge and Wisdom
- The pursuit of knowledge as worship
- Practical application of Islamic teachings
- Teaching and preserving Islamic heritage
- Balance between worldly and religious knowledge
- The responsibility of knowledge bearers

### Leadership and Service
- Leadership as service to the community
- Justice and fairness in governance
- Consultation and collective decision-making
- Accountability and humility in power
- The integration of spiritual and worldly leadership

### Character and Morality
- The transformation of pre-Islamic values
- Honesty, trustworthiness, and integrity
- Forgiveness and reconciliation
- Patience and perseverance in trials
- The embodiment of Quranic values

## Chapter 10: The Companions and Contemporary Muslims

### Following Their Example
- Adapting their principles to modern contexts
- Learning from their mistakes and successes
- Applying their methods in contemporary challenges
- Drawing inspiration from their dedication
- Understanding the timeless nature of their example

### Their Relevance Today
- Models for modern Muslim leadership
- Examples of successful integration of faith and worldly life
- Patterns for community building and social cohesion
- Guidance for personal spiritual development
- Templates for Islamic governance and society

### Honoring Their Memory
- Studying their biographies and teachings
- Following their example in daily life
- Teaching their stories to the next generation
- Defending their honor and reputation
- Continuing their mission of spreading Islam

## Conclusion: The Golden Generation

The Companions of Prophet Muhammad represent the golden standard of Islamic excellence. Their lives demonstrate that ordinary human beings can achieve extraordinary spiritual heights through faith, dedication, and divine guidance.

Key lessons from their lives include:
- The transformative power of faith in Allah
- The importance of following the Prophet's example
- The value of sacrifice for the greater good
- The beauty of Islamic brotherhood and sisterhood
- The integration of spiritual and worldly success
- The responsibility of knowledge and leadership
- The eternal nature of righteous deeds

Their stories remind us that:
- True success lies in Allah's pleasure, not worldly achievement
- Character and morality are more important than wealth and status
- Unity and brotherhood can overcome all divisions
- Knowledge without action is incomplete
- Leadership is a trust and responsibility
- Every Muslim has a role to play in serving Islam

The Companions continue to guide us through their preserved sayings, actions, and examples. Their biographies serve as practical manuals for living Islam in any age or context.

May Allah be pleased with all the Companions and grant us the ability to follow their example. May we strive to embody their virtues and continue their mission of spreading the message of Islam with wisdom, patience, and love.

Their legacy lives on in every Muslim who strives to follow the path of righteousness, and their example continues to inspire generations of believers to reach for the highest levels of faith and character.

May we be reunited with them in Paradise, where their faces will shine with the light of their righteousness, and where they will intercede for those who honored and followed their example in this world.
    `
  },
  12: {
    title: "Quranic Studies for Beginners",
    instructor: "Qari Mahmoud Al-Hafez",
    duration: "8 hours",
    rating: 4.8,
    students: 4567,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    description: "Introduction to understanding and reflecting on the Holy Quran.",
    fullContent: `
# Quranic Studies for Beginners

## Introduction
The Holy Quran is the final revelation from Allah to humanity, sent through Prophet Muhammad (peace be upon him). This course provides beginners with a comprehensive introduction to understanding, appreciating, and reflecting upon the sacred text that guides over 1.8 billion Muslims worldwide.

## Chapter 1: Understanding the Quran

### What is the Quran?
- The final revelation from Allah to humanity
- The literal word of Allah, not the word of Prophet Muhammad
- The complete and unchanged guidance for all times
- The miracle of Prophet Muhammad (peace be upon him)
- The source of Islamic law, ethics, and spirituality

### The Revelation Process
- The role of Angel Gabriel (Jibril) in revelation
- The gradual revelation over 23 years
- The circumstances of revelation (Asbab al-Nuzul)
- The difference between Makki and Madani chapters
- The preservation of the Quran during the Prophet's lifetime

### The Structure of the Quran
- 114 chapters (Surahs) of varying lengths
- Over 6,000 verses (Ayahs)
- 30 sections (Juz/Para) for easy reading
- The arrangement of chapters by divine guidance
- The significance of chapter names and their meanings

### The Uniqueness of the Quran
- Linguistic miracle and literary excellence
- Scientific facts and historical accuracy
- Prophetic predictions fulfilled
- Universal and timeless guidance
- The challenge to produce something similar

## Chapter 2: The Compilation and Preservation of the Quran

### During the Prophet's Lifetime
- Memorization by the Companions (Huffaz)
- Written records on various materials
- The Prophet's verification of each revelation
- The role of scribes in recording the Quran
- The arrangement of verses and chapters

### The First Compilation (Abu Bakr's Era)
- The Battle of Yamama and loss of many memorizers
- Umar's suggestion to compile the Quran
- Zayd ibn Thabit's careful compilation process
- Verification through multiple sources
- The creation of the first complete written copy

### The Standardization (Uthman's Era)
- Differences in recitation styles causing confusion
- The decision to create a standard text
- The committee led by Zayd ibn Thabit
- The burning of non-standard copies
- The distribution of the Uthmani copies

### The Science of Quranic Preservation
- The role of memorization (Hifz) in preservation
- Chain of transmission (Sanad) for Quranic recitation
- The seven canonical recitations (Qira'at)
- Comparison with other religious texts
- Modern verification of Quranic authenticity

## Chapter 3: The Language and Style of the Quran

### Arabic: The Language of Revelation
- Why Arabic was chosen for the final revelation
- The richness and precision of Classical Arabic
- The importance of understanding Arabic for Quranic study
- Resources for learning Quranic Arabic
- The role of translation in Quranic understanding

### Literary Excellence of the Quran
- The unique style that amazed Arab poets
- Rhythm, rhyme, and musical quality
- The balance between meaning and beauty
- Metaphors, similes, and literary devices
- The inimitable nature of Quranic expression

### Levels of Meaning in the Quran
- The apparent (Zahir) and hidden (Batin) meanings
- Literal, metaphorical, and symbolic language
- The role of context in understanding verses
- The interconnectedness of Quranic themes
- The depth that reveals itself through reflection

### Translation Challenges
- The impossibility of perfect translation
- Loss of linguistic nuances and multiple meanings
- The role of commentary in translation
- Comparing different translations
- The importance of referring to the original Arabic

## Chapter 4: Major Themes of the Quran

### Monotheism (Tawhid)
- The absolute unity and uniqueness of Allah
- Rejection of polytheism and idolatry
- The attributes and names of Allah
- The relationship between Creator and creation
- The implications of Tawhid for human life

### Prophethood (Risalah)
- The role of prophets in human guidance
- The stories of previous prophets
- Muhammad as the final messenger
- The universal message of all prophets
- The proof of prophethood through miracles

### The Afterlife (Akhirah)
- Life after death and resurrection
- The Day of Judgment and divine justice
- Paradise and Hell as ultimate destinations
- The accounting for deeds
- The role of faith and good works

### Divine Guidance and Human Responsibility
- The Quran as guidance for humanity
- Free will and moral responsibility
- The test of this worldly life
- Divine mercy and justice
- The consequences of choices

### Social Justice and Ethics
- Economic justice and fair distribution
- Rights of the poor and needy
- Gender relations and family values
- Racial equality and human dignity
- Environmental stewardship

## Chapter 5: Stories in the Quran

### The Purpose of Quranic Stories
- Moral and spiritual lessons
- Historical examples for guidance
- Encouragement for believers
- Warning against disobedience
- Universal themes across cultures and times

### Stories of Earlier Prophets
- Adam: The first human and prophet
- Noah: Saved from the flood through faith
- Abraham: The friend of Allah and monotheism
- Moses: Liberation from oppression
- Jesus: The word and spirit from Allah
- Other prophets and their missions

### Lessons from Quranic Narratives
- The consequences of pride and rebellion
- The power of faith and patience
- Divine intervention and support
- The importance of following guidance
- The ultimate victory of truth over falsehood

### Historical Accounts
- The People of the Cave (Ashab al-Kahf)
- The story of Mary and Jesus
- The account of the Exodus
- The destruction of rebellious nations
- Lessons for contemporary believers

## Chapter 6: Science and the Quran

### Scientific Accuracy in the Quran
- Embryology and human development
- Astronomy and the cosmos
- Geology and earth sciences
- Biology and the natural world
- Physics and natural phenomena

### The Quran's Approach to Nature
- Encouragement to observe and study creation
- Signs of Allah in the natural world
- The balance and harmony in creation
- Human responsibility as stewards
- The integration of spiritual and scientific knowledge

### Modern Discoveries and Quranic Verses
- Recent scientific findings confirming Quranic statements
- The expanding universe
- The water cycle
- Mountain formation and stability
- The protective atmosphere

### The Relationship Between Faith and Science
- Quran encouraging scientific inquiry
- No conflict between true faith and genuine science
- The complementary nature of revelation and reason
- Islamic contributions to scientific advancement
- The responsibility of Muslim scientists

## Chapter 7: The Quran and Daily Life

### Prayer and Worship
- Quranic verses about prayer (Salah)
- The spiritual significance of reciting Quran
- Quran as a source of comfort and guidance
- The etiquette of reading and handling the Quran
- The rewards of Quranic recitation and memorization

### Moral and Ethical Guidance
- Honesty and truthfulness
- Justice and fairness
- Compassion and mercy
- Patience and perseverance
- Gratitude and contentment

### Social Relations
- Family relationships and responsibilities
- Community cooperation and mutual support
- Business ethics and fair trade
- Treatment of non-Muslims
- Conflict resolution and peace-making

### Personal Development
- Self-reflection and spiritual growth
- Overcoming negative traits
- Developing good character
- Seeking knowledge and wisdom
- Striving for excellence (Ihsan)

## Chapter 8: Approaches to Quranic Study

### Memorization (Hifz)
- The tradition of memorizing the entire Quran
- Benefits of memorization for spiritual development
- Techniques for effective memorization
- The role of memorizers (Huffaz) in preservation
- Maintaining and reviewing memorized portions

### Recitation (Tilawah)
- The art of beautiful Quranic recitation
- Rules of Tajweed (proper pronunciation)
- Different styles of recitation
- The spiritual impact of melodious recitation
- Listening to expert reciters

### Reflection and Contemplation (Tadabbur)
- The importance of understanding meanings
- Pondering over verses and their implications
- Connecting Quranic teachings to daily life
- Seeking guidance through reflection
- The transformative power of contemplation

### Study and Commentary (Tafsir)
- Classical commentaries and their authors
- Modern approaches to Quranic interpretation
- Thematic and analytical studies
- Comparative analysis of different interpretations
- The role of scholarly guidance in understanding

## Chapter 9: The Quran in Islamic Worship

### The Quran in Daily Prayers
- Recitation of Quranic chapters in Salah
- The significance of Al-Fatiha (The Opening)
- The spiritual connection through Quranic recitation
- Understanding the meaning while praying
- The impact of prayer on character development

### Special Quranic Prayers
- Night prayers (Tahajjud) with longer recitations
- Tarawih prayers during Ramadan
- Recitation during pilgrimage (Hajj and Umrah)
- Special occasions and Quranic supplications
- The comfort found in Quranic verses during difficulties

### The Quran During Ramadan
- Increased recitation during the holy month
- Completing the Quran during Ramadan
- Community reading programs
- The spiritual atmosphere of Quranic recitation
- Breaking fast with Quranic supplications

### Life Cycle Events
- Quranic recitation at birth (Adhan)
- Marriage ceremonies and Quranic verses
- Seeking blessings through Quranic recitation
- Comfort during illness and hardship
- Quranic verses at the time of death

## Chapter 10: Resources for Quranic Study

### Traditional Resources
- Classical commentaries (Tafsir al-Tabari, Ibn Kathir)
- Hadith collections explaining Quranic verses
- Arabic dictionaries and linguistic resources
- Historical works on revelation circumstances
- Biographical works on Quranic scholars

### Modern Resources
- Contemporary translations and commentaries
- Digital Quran applications and websites
- Audio recitations and teaching materials
- Video lectures and online courses
- Interactive learning platforms

### Learning Communities
- Local mosque study groups
- Islamic centers and educational institutions
- Online communities and forums
- Scholarly guidance and mentorship
- Peer learning and discussion groups

### Practical Study Tools
- Color-coded translations
- Word-by-word analysis tools
- Thematic indices and concordances
- Cross-reference systems
- Note-taking and reflection journals

## Chapter 11: Etiquette of Quranic Study

### Physical Etiquette
- Purification (Wudu) before touching the Quran
- Appropriate clothing and posture
- Facing the Qiblah while reading
- Proper handling and storage of the Quran
- Respect for the physical text

### Spiritual Etiquette
- Seeking refuge from Satan before reading
- Reading with presence of heart and mind
- Humility and reverence during recitation
- Supplicating for guidance and understanding
- Avoiding reading during states of major impurity

### Mental Approach
- Reading with the intention of seeking guidance
- Approaching with an open and receptive heart
- Avoiding preconceived notions and biases
- Seeking to understand rather than to argue
- Patience with difficult or unclear passages

### Social Etiquette
- Respecting others during group reading
- Maintaining quiet during individual recitation
- Sharing insights and learning from others
- Avoiding showing off knowledge or ability
- Teaching others with wisdom and patience

## Chapter 12: The Transformative Power of the Quran

### Personal Transformation
- Stories of individuals changed by the Quran
- The gradual process of spiritual development
- Overcoming bad habits through Quranic guidance
- Finding purpose and meaning in life
- Developing a strong relationship with Allah

### Social Transformation
- The Quran's role in reforming Arabian society
- Historical examples of communities changed by Quranic teachings
- The ongoing influence of Quranic values
- Building just and compassionate societies
- The Quran as a source of social reform

### Intellectual Development
- The Quran's encouragement of learning and knowledge
- Development of critical thinking skills
- Appreciation for the complexity of existence
- Understanding the relationship between faith and reason
- Inspiration for scientific and philosophical inquiry

### Emotional and Psychological Healing
- Finding comfort in times of distress
- Healing from trauma and loss
- Developing emotional resilience
- Finding peace and tranquility
- Building positive mental health

## Conclusion: Beginning the Journey

This introduction to Quranic studies marks the beginning of a lifelong journey of learning, growth, and spiritual development. The Quran is not merely a book to be read but a guide to be lived, a light to be followed, and a source of constant inspiration and wisdom.

Key principles for continuing Quranic study:
- Approach the Quran with humility and sincerity
- Seek authentic knowledge from qualified teachers
- Balance memorization with understanding
- Apply Quranic teachings in daily life
- Make regular recitation and reflection a habit
- Share knowledge and insights with others
- Continuously seek to improve your relationship with the Quran

Remember that the Quran is:
- A healing for what is in the hearts
- A guidance for those who are conscious of Allah
- A mercy for all mankind
- A light that illuminates the path to truth
- A criterion between right and wrong

The journey of Quranic study never truly ends. Each reading reveals new insights, each reflection brings new understanding, and each application of its teachings brings us closer to Allah and to the fulfillment of our purpose in life.

May Allah grant us the ability to benefit from His book, to understand its meanings, to follow its guidance, and to be among those who are transformed by its light. May the Quran be our companion in this life and our intercessor in the next.

As you continue your studies, remember that the greatest scholars of Islam continued learning from the Quran until their last breath. The depth of the Quran is infinite, and its treasures are inexhaustible. Every sincere seeker will find in it exactly what they need for their spiritual journey.

Begin with small steps, be consistent in your efforts, and trust that Allah will guide you to deeper understanding as you sincerely seek His guidance through His noble book.
    `
  },
  10: {
    title: "Health and Safety During Hajj",
    instructor: "Dr. Khalid Al-Tabib",
    duration: "3 hours",
    rating: 4.8,
    students: 3654,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    description: "Medical advice and safety tips for a healthy pilgrimage experience.",
    fullContent: `
# Health and Safety During Hajj

## Introduction
Hajj is a physically demanding journey that requires careful health preparation and safety awareness. This course provides essential medical advice and safety guidelines to ensure a healthy and safe pilgrimage experience.

## Chapter 1: Pre-Hajj Health Preparation

### Medical Checkup and Clearance
- Comprehensive health assessment 2-3 months before travel
- Cardiovascular evaluation for heart conditions
- Respiratory system check for asthma and lung conditions
- Blood sugar monitoring for diabetics
- Blood pressure management for hypertensive patients
- Kidney function tests for elderly pilgrims
- Obtaining medical clearance from your physician

### Vaccination Requirements
- Mandatory vaccinations: Meningitis (ACWY)
- Seasonal influenza vaccination
- COVID-19 vaccination requirements
- Yellow fever vaccination (if traveling from endemic areas)
- Hepatitis A and B vaccinations
- Polio vaccination updates
- Timing of vaccinations for optimal effectiveness

### Fitness and Physical Preparation
- Cardiovascular fitness through regular walking
- Building stamina for extended periods of standing
- Strengthening exercises for leg muscles
- Flexibility exercises to prevent injuries
- Gradual increase in physical activity
- Consulting with fitness professionals
- Special considerations for elderly and disabled pilgrims

### Chronic Disease Management
- Diabetes management and blood sugar control
- Hypertension medication optimization
- Asthma control and inhaler techniques
- Arthritis and joint pain management
- Heart disease precautions and medication
- Kidney disease and dialysis considerations
- Mental health medication management

## Chapter 2: Medications and Medical Supplies

### Essential Medications to Carry
- Prescription medications in original containers
- Extra supply for extended stay
- Pain relievers (paracetamol, ibuprofen)
- Anti-diarrheal medications
- Rehydration salts (ORS)
- Antacids for stomach upset
- Allergy medications (antihistamines)
- Topical antiseptics and bandages

### Prescription Medication Guidelines
- Carrying doctor's prescription and medical records
- Medication names in Arabic or English
- Proper storage conditions (temperature, humidity)
- Time zone adjustments for medication schedules
- Insulin storage and administration for diabetics
- Blood pressure medication consistency
- Emergency medications (inhalers, nitrates)

### First Aid Kit Essentials
- Digital thermometer
- Blood pressure monitoring device (if needed)
- Glucose monitoring kit for diabetics
- Antiseptic wipes and alcohol-based sanitizer
- Adhesive bandages and gauze
- Elastic bandages for sprains
- Scissors and tweezers
- Emergency contact information

### Herbal and Traditional Remedies
- Honey for throat and digestive issues
- Black seed oil for general health
- Ginger for nausea and motion sickness
- Mint tea for digestive comfort
- Dates for quick energy and nutrition
- Zamzam water and its benefits
- Integration with modern medicine

## Chapter 3: Hydration and Nutrition

### The Critical Importance of Hydration
- High temperatures and humidity in Saudi Arabia
- Increased fluid loss through sweating
- Signs and symptoms of dehydration
- Daily water intake recommendations (3-4 liters)
- Electrolyte replacement needs
- Monitoring urine color as hydration indicator
- Special needs for elderly and diabetic pilgrims

### Safe Drinking Water Practices
- Bottled water vs. tap water considerations
- Zamzam water availability and access
- Water purification methods if needed
- Avoiding ice from unknown sources
- Hotel and accommodation water safety
- Refillable water bottle recommendations
- Water stations during Hajj rituals

### Nutritional Guidelines During Hajj
- Maintaining balanced nutrition during travel
- Familiar foods vs. local cuisine adaptation
- Food safety in different environments
- Timing of meals around prayer and ritual times
- Energy-rich foods for physical demands
- Avoiding heavy meals before strenuous activities
- Special dietary requirements and restrictions

### Food Safety and Hygiene
- Choosing reputable restaurants and food vendors
- Avoiding raw or undercooked foods
- Fruit and vegetable washing procedures
- Personal hygiene before eating
- Recognizing signs of food poisoning
- Safe food storage in accommodation
- Cultural sensitivity in food choices

## Chapter 4: Climate and Environmental Health

### Understanding the Saudi Arabian Climate
- High temperatures (often 35-45°C/95-113°F)
- Low humidity vs. high humidity periods
- Seasonal variations in weather
- Sandstorm occurrences and preparation
- Air quality considerations
- UV radiation exposure risks
- Altitude effects in different locations

### Heat-Related Illness Prevention
- Heat exhaustion: signs, symptoms, and treatment
- Heat stroke: emergency recognition and response
- Heat cramps and their management
- Risk factors for heat-related illness
- Cooling techniques and first aid
- When to seek immediate medical attention
- Prevention strategies for high-risk groups

### Sun Protection Measures
- Sunscreen application (SPF 30+ recommended)
- Protective clothing choices
- Hat and sunglasses importance
- Seeking shade during peak sun hours
- Umbrella use during outdoor rituals
- Sunburn treatment and prevention
- Special considerations for fair-skinned pilgrims

### Air Quality and Respiratory Health
- Dust and sand exposure management
- Respiratory protection (masks when needed)
- Asthma triggers and avoidance
- Air conditioning vs. outdoor air quality
- Crowd-related air quality issues
- Smoking cessation before and during Hajj
- Managing pre-existing respiratory conditions

## Chapter 5: Crowd Safety and Injury Prevention

### Understanding Crowd Dynamics
- Peak times and locations for crowding
- Flow patterns during major rituals
- Recognizing dangerous crowd situations
- Emergency exit awareness
- Communication in crowded areas
- Staying with your group
- Technology aids for location tracking

### Personal Safety in Crowds
- Protective positioning in dense crowds
- Avoiding pushing and aggressive behavior
- Maintaining personal space when possible
- Protective gear (comfortable shoes, loose clothing)
- Crowd surge recognition and response
- Emergency evacuation procedures
- Helping others while ensuring personal safety

### Common Injuries and Prevention
- Foot injuries from extensive walking
- Ankle sprains and twisted joints
- Cuts and bruises from falls
- Shoulder and back strain from carrying items
- Eye injuries from sun and dust
- Skin abrasions from crowded conditions
- Prevention through proper preparation

### Emergency Response Procedures
- Saudi Arabian emergency services (Red Crescent)
- Hospital locations and contact information
- Travel insurance emergency contacts
- Embassy or consulate emergency services
- Group leader or tour guide notification
- Documentation for emergency treatment
- Communication with family during emergencies

## Chapter 6: Infectious Disease Prevention

### Common Infectious Diseases During Hajj
- Upper respiratory tract infections
- Gastrointestinal infections
- Skin infections and rashes
- Conjunctivitis (pink eye)
- Foot infections from walking
- Urinary tract infections
- Prevention strategies for each condition

### Personal Hygiene Practices
- Hand washing frequency and technique
- Hand sanitizer use when water unavailable
- Personal toiletry management
- Dental hygiene maintenance
- Body cleansing and shower routines
- Laundry and clothing hygiene
- Wound care and infection prevention

### Communicable Disease Prevention
- Respiratory etiquette (cough/sneeze covering)
- Social distancing when feasible
- Mask usage in appropriate situations
- Avoiding contact with obviously ill individuals
- Sharing personal items precautions
- Vaccination status verification
- Reporting illness to authorities when required

### Healthcare Facility Utilization
- Identifying legitimate healthcare providers
- Understanding Saudi healthcare system
- Insurance coverage and payment procedures
- Language barriers and communication aids
- Prescription medication availability
- Emergency vs. non-emergency care
- Cultural sensitivity in healthcare settings

## Chapter 7: Special Populations and Considerations

### Elderly Pilgrims (65+ years)
- Enhanced medical clearance requirements
- Mobility assistance and equipment
- Medication management complexity
- Heat tolerance and temperature regulation
- Increased infection susceptibility
- Cardiovascular stress management
- Family or caregiver support needs

### Pilgrims with Chronic Diseases
- Diabetes management and monitoring
- Hypertension control and medication
- Heart disease precautions and limitations
- Kidney disease and dialysis planning
- Respiratory conditions and medication
- Arthritis and mobility considerations
- Mental health condition management

### Pregnant Women
- Medical clearance and gestational age limits
- Travel safety and comfort measures
- Nutritional needs and supplement requirements
- Hydration and rest importance
- Emergency obstetric care availability
- Physical limitation adjustments
- Spiritual significance and alternative arrangements

### Disabled Pilgrims
- Accessibility accommodations and planning
- Wheelchair and mobility device management
- Caregiver assistance and support
- Modified ritual performance allowances
- Transportation and accommodation needs
- Medical equipment and supply management
- Dignity and independence balance

## Chapter 8: Mental Health and Psychological Well-being

### Psychological Preparation
- Managing expectations and potential disappointments
- Coping with cultural and language differences
- Homesickness and separation anxiety
- Crowd-related anxiety and claustrophobia
- Financial stress and budgeting concerns
- Physical discomfort and pain management
- Spiritual preparation and mental readiness

### Stress Management Techniques
- Deep breathing and relaxation exercises
- Prayer and dhikr as stress relief
- Adequate rest and sleep importance
- Social support and community connection
- Flexibility and adaptability cultivation
- Problem-solving skills development
- Professional counseling resources

### Cultural Adjustment and Adaptation
- Language barriers and communication strategies
- Cultural differences in healthcare approaches
- Food preferences and dietary adjustments
- Religious practice variations
- Social interaction and etiquette
- Time management and schedule flexibility
- Technology use and communication home

### Crisis Intervention and Support
- Recognizing mental health emergencies
- Panic attack management and response
- Depression and anxiety symptom recognition
- Suicide risk assessment and intervention
- Professional mental health resources
- Peer support and group assistance
- Family notification and support systems

## Chapter 9: Technology and Health Monitoring

### Health Monitoring Devices
- Blood pressure monitors and proper usage
- Blood glucose meters for diabetics
- Pulse oximeters for respiratory monitoring
- Fitness trackers for activity monitoring
- Smart watches with health features
- Temperature monitoring devices
- Medication reminder applications

### Communication and Emergency Technology
- Emergency contact applications
- Location sharing with family/group
- Health information storage applications
- Translation applications for healthcare
- Telemedicine and remote consultation
- Emergency alert systems
- Insurance and medical record access

### Navigation and Safety Applications
- GPS navigation for healthcare facilities
- Crowd density monitoring applications
- Weather and environmental monitoring
- Public transportation and safety information
- Government health alerts and updates
- Social media for real-time information
- Digital health passport requirements

## Chapter 10: Post-Hajj Health Considerations

### Health Monitoring After Return
- Post-travel health assessment
- Infection incubation period awareness
- Symptom monitoring and reporting
- Medication adjustment needs
- Chronic disease follow-up
- Vaccination status updates
- Mental health transition support

### Common Post-Hajj Health Issues
- Post-travel fatigue and recovery
- Gastrointestinal adjustment problems
- Respiratory infections and treatment
- Skin conditions and wound healing
- Joint pain and muscle soreness
- Sleep pattern disruption
- Emotional adjustment and depression

### Integration of Hajj Experience
- Maintaining physical health improvements
- Continuing healthy lifestyle changes
- Sharing health experiences with others
- Preparing for future pilgrimage
- Community health education and awareness
- Supporting other pilgrims' preparation
- Long-term spiritual and physical well-being

## Conclusion: A Healthy and Safe Pilgrimage

Health and safety during Hajj require careful preparation, constant vigilance, and adaptive responses to changing conditions. The physical demands of pilgrimage are part of the spiritual challenge, but with proper preparation and awareness, pilgrims can minimize health risks while maximizing spiritual benefits.

Key principles for Hajj health and safety:
- Prepare thoroughly before departure
- Maintain situational awareness at all times
- Prioritize hydration and nutrition
- Practice preventive medicine
- Seek help when needed
- Support fellow pilgrims' health and safety
- Balance physical limitations with spiritual goals

Remember that taking care of your health during Hajj is not only a personal responsibility but also a religious obligation. Allah does not burden a soul beyond its capacity, and maintaining your health enables you to worship Him properly and serve others effectively.

The Saudi Arabian government and healthcare system provide excellent support for pilgrims, but personal responsibility and preparation remain crucial. By following these guidelines and maintaining awareness of your health status, you can focus on the spiritual aspects of Hajj while ensuring your physical well-being.

May Allah grant all pilgrims good health, safety, and a blessed Hajj experience. May your pilgrimage be a source of physical, mental, and spiritual renewal that benefits you for the rest of your life.

Your health is a trust from Allah, and caring for it properly during Hajj demonstrates gratitude for the opportunity to perform this sacred journey. Return home not only spiritually enriched but also physically strengthened by the experience of overcoming challenges with faith and preparation.
    `
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id || '1');
  const course = coursesData[courseId as keyof typeof coursesData];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navbar />
        <div className="marketplace-container py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')} className="bg-emerald-600 hover:bg-emerald-700">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      <div className="marketplace-container py-8">
        <Button 
          onClick={() => navigate('/courses')} 
          className="mb-6 bg-emerald-600 hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-8">
          <div className="h-64 overflow-hidden rounded-t-lg">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">{course.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.students.toLocaleString()} students
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {course.rating}
              </div>
            </div>
            <p className="text-gray-600 mt-2">Instructor: {course.instructor}</p>
            <p className="text-gray-700 mt-2">{course.description}</p>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <BookOpen className="h-5 w-5 mr-2" />
              Course Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-emerald max-w-none">
              {course.fullContent.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold text-gray-800 mt-6 mb-4">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold text-gray-700 mt-5 mb-3">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-medium text-gray-600 mt-4 mb-2">{line.substring(4)}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="text-gray-600 ml-4 mb-1">{line.substring(2)}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="text-gray-600 mb-2">{line}</p>;
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
