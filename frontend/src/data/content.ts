import type { Doctor, Service, FAQ, Testimonial } from '../types';

export const defaultServices: Service[] = [
  { id: '1', name: 'Acne & Acne Scars', name_te: 'మొటిమలు & మొటిమల గుర్తులు', description: 'Cleaner skin for a more confident you', description_te: 'మరింత ఆత్మవిశ్వాసం కోసం శుభ్రమైన చర్మం', icon: 'Sparkles', category: 'dermatology' },
  { id: '2', name: 'Hair Fall', name_te: 'జుట్టు రాలడం', description: 'Stronger, healthier hair with the right care', description_te: 'సరైన సంరక్షణతో బలమైన, ఆరోగ్యకరమైన జుట్టు', icon: 'Heart', category: 'trichology' },
  { id: '3', name: 'Pigmentation & Melasma', name_te: 'వర్ణద్రవ్యం & మెలాస్మా', description: 'Even-toned skin, restored confidence', description_te: 'ఏకరీతి చర్మం, పునరుద్ధరించబడిన ఆత్మవిశ్వాసం', icon: 'Sun', category: 'dermatology' },
  { id: '4', name: 'Skin Allergies', name_te: 'చర్మ అలర్జీలు', description: 'Relief from itching, rashes and irritation', description_te: 'దురద, దద్దుర్లు మరియు చికాకు నుండి ఉపశమనం', icon: 'Shield', category: 'dermatology' },
  { id: '5', name: 'Psoriasis', name_te: 'సోరియాసిస్', description: 'Better control. A more comfortable tomorrow.', description_te: 'మెరుగైన నియంత్రణ. మరింత సౌకర్యవంతమైన రేపు.', icon: 'Zap', category: 'dermatology' },
  { id: '6', name: 'Mole / Skin Lesion Screening', name_te: 'మోల్ / చర్మ గాయాల స్క్రీనింగ్', description: 'Early detection for peace of mind', description_te: 'మనశ్శాంతి కోసం ముందస్తు గుర్తింపు', icon: 'Eye', category: 'screening' },
  { id: '7', name: 'Pre-Bridal Skin Prep', name_te: 'ప్రీ-బ్రైడల్ చర్మ సిద్ధం', description: 'Put your best skin for life\u2019s special days', description_te: 'జీవితంలోని ప్రత్యేక రోజుల కోసం మీ ఉత్తమ చర్మం', icon: 'Crown', category: 'cosmetology' },
  { id: '8', name: 'Anti-Aging', name_te: 'యాంటీ-ఏజింగ్', description: 'Healthy, youthful skin at every age', description_te: 'ప్రతి వయస్సులో ఆరోగ్యకరమైన, యవ్వన చర్మం', icon: 'Clock', category: 'cosmetology' },
];

export const defaultDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anjali Reddy',
    name_te: 'డాక్టర్ అంజలి రెడ్డి',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    specializations: 'Consultant Dermatologist',
    specializations_te: 'కన్సల్టెంట్ చర్మ వ్యాధి నిపుణురాలు',
    experience_years: 8,
    bio: 'Consultant Dermatologist at TejAI Multi-Specialty Hospital, dedicated to honest, evidence-based skin and hair care.',
    bio_te: 'TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్‌లో కన్సల్టెంట్ చర్మ వ్యాధి నిపుణురాలు, నిజాయితీగల, ఆధార-ఆధారిత చర్మ మరియు జుట్టు సంరక్షణకు అంకితం.',
  },
  {
    id: '2',
    name: 'Dr. Karthik Varma',
    name_te: 'డాక్టర్ కార్తీక్ వర్మ',
    qualifications: 'MBBS, MD (Dermatology)',
    specializations: 'Consultant Dermatologist',
    specializations_te: 'కన్సల్టెంట్ చర్మ వ్యాధి నిపుణుడు',
    experience_years: 8,
    bio: 'Consultant Dermatologist at TejAI Multi-Specialty Hospital, focused on personalized treatment plans for every skin type and tone.',
    bio_te: 'TejAI మల్టీ-స్పెషాలిటీ హాస్పిటల్‌లో కన్సల్టెంట్ చర్మ వ్యాధి నిపుణుడు, ప్రతి చర్మ రకం మరియు టోన్ కోసం వ్యక్తిగత చికిత్స ప్రణాళికలపై దృష్టి సారిస్తారు.',
  },
];

export const defaultFAQs: FAQ[] = [
  { id: '1', question: 'How much does a consultation cost?', question_te: 'సంప్రదింపు ఖర్చు ఎంత?', answer: 'Consultation pricing is confirmed when you book. Please contact us or reach us on WhatsApp for current fees. Any treatment cost is always explained clearly before you begin.', answer_te: 'మీరు బుక్ చేసినప్పుడు సంప్రదింపు ధర నిర్ధారించబడుతుంది. ప్రస్తుత ఫీజుల కోసం దయచేసి మమ్మల్ని సంప్రదించండి లేదా WhatsApp ద్వారా చేరుకోండి. ఏ చికిత్స ఖర్చు అయినా ప్రారంభించే ముందు స్పష్టంగా వివరించబడుతుంది.', category: 'pricing', sort_order: 1 },
  { id: '2', question: 'Is the treatment painful?', question_te: 'చికిత్స బాధాకరమా?', answer: 'Experience varies by procedure. Your doctor explains what to expect, including any discomfort, and tailors the plan to keep you as comfortable as possible.', answer_te: 'అనుభవం ప్రక్రియను బట్టి మారుతుంది. మీ డాక్టర్ అసౌకర్యంతో సహా ఏమి ఆశించాలో వివరిస్తారు మరియు మిమ్మల్ని సాధ్యమైనంత సౌకర్యవంతంగా ఉంచడానికి ప్రణాళికను సర్దుబాటు చేస్తారు.', category: 'treatment', sort_order: 2 },
  { id: '3', question: 'How many sessions will I need?', question_te: 'నాకు ఎన్ని సెషన్లు అవసరం?', answer: 'The number of sessions depends on your condition and how your skin responds to treatment. Your doctor outlines a clear plan with expected milestones after your consultation.', answer_te: 'సెషన్ల సంఖ్య మీ పరిస్థితి మరియు చికిత్సకు మీ చర్మం ఎలా స్పందిస్తుందనే దానిపై ఆధారపడి ఉంటుంది. మీ సంప్రదింపు తర్వాత మీ డాక్టర్ ఆశించిన మైలురాళ్లతో స్పష్టమైన ప్రణాళికను వివరిస్తారు.', category: 'treatment', sort_order: 3 },
  { id: '4', question: 'Does insurance or government health scheme apply?', question_te: 'బీమా లేదా ప్రభుత్వ ఆరోగ్య పథకం వర్తిస్తుందా?', answer: 'Coverage depends on your plan and the specific service. Our team can guide you on the documentation you may need. Please check with your provider for eligibility details.', answer_te: 'కవరేజ్ మీ ప్లాన్ మరియు నిర్దిష్ట సేవపై ఆధారపడి ఉంటుంది. మీకు అవసరమైన డాక్యుమెంటేషన్‌పై మా బృందం మీకు మార్గనిర్దేశం చేయగలదు. అర్హత వివరాల కోసం దయచేసి మీ ప్రొవైడర్‌ను తనిఖీ చేయండి.', category: 'billing', sort_order: 4 },
  { id: '5', question: 'What should I expect in my first visit?', question_te: 'నా మొదటి సందర్శనలో నేను ఏమి ఆశించాలి?', answer: 'Your doctor listens to your concern, reviews your history, examines the affected area and explains your options clearly. You can ask questions at any time.', answer_te: 'మీ డాక్టర్ మీ సమస్యను వింటారు, మీ చరిత్రను సమీక్షిస్తారు, ప్రభావిత ప్రాంతాన్ని పరిశీలిస్తారు మరియు మీ ఎంపికలను స్పష్టంగా వివరిస్తారు. మీరు ఎప్పుడైనా ప్రశ్నలు అడగవచ్చు.', category: 'consultation', sort_order: 5 },
];

export const sampleTestimonials: Testimonial[] = [
  {
    id: 's1',
    name: 'Patient Feedback',
    designation: 'Pending verification',
    quote: 'Verified patient feedback will be added here.',
    is_sample: true,
  },
  {
    id: 's2',
    name: 'Patient Feedback',
    designation: 'Pending verification',
    quote: 'Patient testimonial pending verification.',
    is_sample: true,
  },
  {
    id: 's3',
    name: 'Patient Feedback',
    designation: 'Pending verification',
    quote: 'Verified patient feedback will be added here.',
    is_sample: true,
  },
];