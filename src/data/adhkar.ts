/**
 * Adhkar data for MarjanAlarm
 *
 * Contains morning adhkar organized by intensity level
 */

import { Dua, AdhkarSet } from '../types';

// Individual duas
export const duas: Dua[] = [
  // Morning protection duas
  {
    id: 'dua_bismillah_protection',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillāhil-ladhī lā yaḍurru maʿas-mihi shay\'un fil-arḍi wa lā fis-samā\'i wa Huwas-Samīʿul-ʿAlīm',
    translation: 'In the Name of Allah, with whose Name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    category: 'morning',
    repetitions: 3,
  },
  {
    id: 'dua_morning_master',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah',
    translation: 'We have entered the morning and with it all dominion belongs to Allah. All praise is for Allah. There is no god but Allah alone, without partner.',
    category: 'morning',
    repetitions: 1,
  },
  {
    id: 'dua_allahumma_bika_asbahna',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allāhumma bika aṣbaḥnā wa bika amsaynā wa bika naḥyā wa bika namūtu wa ilaykan-nushūr',
    translation: 'O Allah, by Your grace we have entered the morning, and by Your grace we enter the evening. By You we live and by You we die, and to You is the resurrection.',
    category: 'morning',
    repetitions: 1,
  },
  {
    id: 'dua_sayyidul_istighfar',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa ana ʿabduka, wa ana ʿalā ʿahdika wa waʿdika mā staṭaʿtu, aʿūdhu bika min sharri mā ṣanaʿtu, abū\'u laka biniʿmatika ʿalayya, wa abū\'u bidhanbī, faghfirlī fa innahu lā yaghfirudh-dhunūba illā anta',
    translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant. I uphold Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your blessings upon me, and I acknowledge my sins. So forgive me, for none forgives sins but You.',
    category: 'morning',
    repetitions: 1,
  },
  {
    id: 'dua_subhanallah_x33',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subḥānallāh',
    translation: 'Glory be to Allah.',
    category: 'general',
    repetitions: 33,
  },
  {
    id: 'dua_alhamdulillah_x33',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alḥamdulillāh',
    translation: 'All praise is for Allah.',
    category: 'general',
    repetitions: 33,
  },
  {
    id: 'dua_allahuakbar_x33',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    translation: 'Allah is the Greatest.',
    category: 'general',
    repetitions: 33,
  },
  {
    id: 'dua_ayatul_kursi',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm, lā ta\'khudhuhū sinatun wa lā nawm, lahū mā fis-samāwāti wa mā fil-arḍ, man dhal-ladhī yashfaʿu ʿindahū illā bi\'idhnih, yaʿlamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bishay\'in min ʿilmihī illā bimā shā\', wasiʿa kursiyyuhus-samāwāti wal-arḍ, wa lā ya\'ūduhū ḥifẓuhumā, wa Huwal-ʿAliyyul-ʿAẓīm',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    category: 'morning',
    repetitions: 1,
  },
  {
    id: 'dua_raditu_billah',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    transliteration: 'Raḍītu billāhi Rabban, wa bil-Islāmi dīnan, wa bi-Muḥammadin ṣallallāhu ʿalayhi wa sallama nabiyyan',
    translation: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.',
    category: 'morning',
    repetitions: 3,
  },
  {
    id: 'dua_allahumma_inni_asbahtu',
    arabic: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    transliteration: 'Allāhumma innī aṣbaḥtu ushhiduka wa ushhidu ḥamalata ʿarshika wa malā\'ikataka wa jamīʿa khalqika annaka antallāhu lā ilāha illā anta waḥdaka lā sharīka laka wa anna Muḥammadan ʿabduka wa rasūluk',
    translation: 'O Allah, I have entered the morning and call upon You and upon the bearers of Your Throne, Your angels and all creation, to bear witness that You are Allah. There is no god but You, alone, without partner, and that Muhammad is Your servant and messenger.',
    category: 'morning',
    repetitions: 4,
  },
  {
    id: 'dua_allahumma_afini',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',
    transliteration: 'Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī, lā ilāha illā anta',
    translation: 'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no god but You.',
    category: 'morning',
    repetitions: 3,
  },
  {
    id: 'dua_hasbiallah',
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration: 'Ḥasbiyallāhu lā ilāha illā Huwa, ʿalayhi tawakkaltu, wa Huwa Rabbul-ʿArshil-ʿAẓīm',
    translation: 'Allah is sufficient for me. There is no god but He. In Him I have placed my trust, and He is the Lord of the Mighty Throne.',
    category: 'morning',
    repetitions: 7,
  },
];

// Snooze dhikr (short dhikr for snooze)
export const snoozeDhikr: Dua = {
  id: 'dua_snooze_subhanallah',
  arabic: 'سُبْحَانَ اللَّهِ',
  transliteration: 'Subḥānallāh',
  translation: 'Glory be to Allah.',
  category: 'general',
  repetitions: 10,
};

// Adhkar sets by intensity
export const adhkarSets: AdhkarSet[] = [
  {
    id: 'set_light',
    name: 'Light',
    description: '1–2 short duas, ~20 seconds',
    intensity: 'light',
    estimatedDuration: '~20 seconds',
    duas: [
      duas.find(d => d.id === 'dua_bismillah_protection')!,
      duas.find(d => d.id === 'dua_allahumma_bika_asbahna')!,
    ],
  },
  {
    id: 'set_standard',
    name: 'Standard',
    description: 'Core morning adhkar, ~1–2 minutes',
    intensity: 'standard',
    estimatedDuration: '~1–2 minutes',
    duas: [
      duas.find(d => d.id === 'dua_bismillah_protection')!,
      duas.find(d => d.id === 'dua_morning_master')!,
      duas.find(d => d.id === 'dua_allahumma_bika_asbahna')!,
      duas.find(d => d.id === 'dua_sayyidul_istighfar')!,
    ],
  },
  {
    id: 'set_full',
    name: 'Full',
    description: 'Extended adhkar set, ~5+ minutes',
    intensity: 'full',
    estimatedDuration: '~5+ minutes',
    duas: [
      duas.find(d => d.id === 'dua_bismillah_protection')!,
      duas.find(d => d.id === 'dua_morning_master')!,
      duas.find(d => d.id === 'dua_allahumma_bika_asbahna')!,
      duas.find(d => d.id === 'dua_sayyidul_istighfar')!,
      duas.find(d => d.id === 'dua_ayatul_kursi')!,
      duas.find(d => d.id === 'dua_raditu_billah')!,
      duas.find(d => d.id === 'dua_allahumma_inni_asbahtu')!,
      duas.find(d => d.id === 'dua_allahumma_afini')!,
      duas.find(d => d.id === 'dua_hasbiallah')!,
      duas.find(d => d.id === 'dua_subhanallah_x33')!,
      duas.find(d => d.id === 'dua_alhamdulillah_x33')!,
      duas.find(d => d.id === 'dua_allahuakbar_x33')!,
    ],
  },
];

// Helper to get adhkar set by ID
export const getAdhkarSetById = (id: string): AdhkarSet | undefined => {
  return adhkarSets.find(set => set.id === id);
};

// Helper to get adhkar set by intensity
export const getAdhkarSetByIntensity = (intensity: string): AdhkarSet | undefined => {
  return adhkarSets.find(set => set.intensity === intensity);
};
