
export const chats = [
	{
		type: 'Thought',
		author: 'Dr. Celine Roy',
		authorImg: '/celina.png',
		time: '5 days ago',
		title: 'I have an interesting fact about Ayurveda',
		description: `Ayurveda, one of the world's oldest holistic healing systems, 
		originated in India over 3,
		000 years ago and is still widely practiced today.
		It is based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
		Unlike conventional medicine, Ayurveda emphasizes prevention and the personalized treatment of diseases through a
		combination of diet, herbal remedies, exercise, and lifestyle adjustments.
		One fascinating aspect is its concept of "doshas" – Vata, Pitta, and Kapha – which are believed to be the primary life
		forces or energies that govern our physiological and psychological activities.
		Ayurvedic practitioners tailor treatments to balance these doshas in each individual,
		promoting harmony and health.This ancient system also integrates mental health care, recognizing the profound
		connection between emotional and physical well- being.
		Its holistic approach has influenced many modern wellness practices and continues to garner
		global interest for its natural and preventive methodologies.`,
		files: [
			{
				path: '/acceptance-letter.pdf',
				name: 'Healthy Lifestyle',
				size: '1.2 MB',
				type: 'pdf'
			}
		],
		favours: 23,
        shares: 32,
		comments: [
			{
				type: 'comment',
				author: 'Akash Kaur',
				authorImg: '/akash.png',
				time: '3 mins ago',
				description: `I have recently started Ayurvedic practices and am feeling much better and calmer than before. 
				Going Ayurvedic is one of the best choices I have taken!`,
				favours: 3
			},
			{
				type: 'comment',
				author: 'Diya Sen',
				authorImg: '/diya.png',
				time: '1 hour ago',
				description: `I have recently started Ayurvedic practices and am feeling much better and calmer than before. 
				Going Ayurvedic is one of the best choices I have taken!`,
				favours: 2
			}
		]
	},
	{
		type: 'Question',
		tags: ['General Ayurveda', 'Basics of Ayurveda'],
		author: 'Dr. Mathew Adams',
		authorImg: '/mathew.png',
		time: '5 days ago',
		title: 'Can Ayurveda help with stress and mental health issues?',
		description: `Explores the potential benefits of traditional Ayurvedic 
		practices in managing stress and improving mental well-being, examining
		holistic approaches like herbal remedies, meditation, and lifestyle adjustments.`,
		favours: 23,
		shares: 32,
		replies: [
			{
				type: 'reply',
				author: 'Dr. Mathew Adams',
				authorImg: '/mathew.png',
				time: '5 days ago',
				description: `Ayurveda offers holistic approaches like herbal remedies, lifestyle adjustments, 
				and relaxation techniques to alleviate stress and support mental well-being. It emphasizes personalized
				care and natural methods to address the root causes of mental health challenges, promoting balance and
				harmony in mind and body.`,
				images: ['/ayurveda.png'],
			},
			{
				type: 'reply',
				author: 'Dr. Mathew Adams',
				authorImg: '/mathew.png',
				time: '5 days ago',
				description: `Ayurveda offers holistic approaches like herbal remedies, lifestyle adjustments, 
				and relaxation techniques to alleviate stress and support mental well-being. It emphasizes personalized
				care and natural methods to address the root causes of mental health challenges, promoting balance and
				harmony in mind and body.`,
			},
			{
				type: 'reply',
				author: 'Dr. Mathew Adams',
				authorImg: '/mathew.png',
				time: '5 days ago',
				description: `Ayurveda offers holistic approaches like herbal remedies, lifestyle adjustments, 
				and relaxation techniques to alleviate stress and support mental well-being. It emphasizes personalized
				care and natural methods to address the root causes of mental health challenges, promoting balance and
				harmony in mind and body.`,
			},
			{
				type: 'reply',
				author: 'Dr. Mathew Adams',
				authorImg: '/mathew.png',
				time: '5 days ago',
				description: `Ayurveda offers holistic approaches like herbal remedies, lifestyle adjustments, 
				and relaxation techniques to alleviate stress and support mental well-being. It emphasizes personalized
				care and natural methods to address the root causes of mental health challenges, promoting balance and
				harmony in mind and body.`,
			},
			{
				type: 'reply',
				author: 'Dr. Mathew Adams',
				authorImg: '/mathew.png',
				time: '5 days ago',
				description: `Ayurveda offers holistic approaches like herbal remedies, lifestyle adjustments, 
				and relaxation techniques to alleviate stress and support mental well-being. It emphasizes personalized
				care and natural methods to address the root causes of mental health challenges, promoting balance and
				harmony in mind and body.`,
			},
		],
		comments: [
			{
				type: 'comment',
				author: 'Akash Kaur',
				authorImg: '/akash.png',
				time: '3 mins ago',
				description: `I have recently started Ayurvedic practices and am feeling much better and calmer than before. 
				Going Ayurvedic is one of the best choices I have taken!`,
				favours: 3
			},
			{
				type: 'comment',
				author: 'Diya Sen',
				authorImg: '/diya.png',
				time: '1 hour ago',
				description: `I have recently started Ayurvedic practices and am feeling much better and calmer than before. 
				Going Ayurvedic is one of the best choices I have taken!`,
				favours: 2
			}
		]
	},
]

export const categories = [
	{
		category: "General Ayurveda",
		categoryList: [
			"Basics of Ayurveda",
			"History and Philosophy",
			"Doshas (Vata, Pitta, Kapha)",
			"Ayurvedic Lifestyle",
			"Others"
		]
	},
	{
		category: "Ayurvedic Treatments",
		categoryList: [
			"Herbal Remedies",
			"Panchakarma",
			"Detoxification",
			"Rejuvenation Therapies"
		]
	},
	{
		category: "Diet and Nutrition",
		categoryList: [
			"Ayurvedic Diet Principles",
			"Seasonal Eating",
			"Food for Specific Doshas",
			"Recipes and Meal Plans"
		]
	},
	{
		category: "Health Conditions and Ayurveda",
		categoryList: [
			"Digestive Issues",
			"Skin Problems",
			"Respiratory Ailments",
			"Chronic Diseases (e.g., Diabetes, Arthritis)",
			"Mental Health",
			"List of Concerns"
		]
	},
	{
		category: "Ayurvedic Herbs and Ingredients",
		categoryList: [
			"Common Herbs (e.g., Ashwagandha, Turmeric)",
			"Herbal Preparations",
			"Medicinal Properties",
			"Sourcing and Quality"
		]
	},
	{
		category: "Ayurvedic Practices",
		categoryList: [
			"Yoga and Ayurveda",
			"Meditation Techniques",
			"Daily Routines (Dinacharya)",
			"Seasonal Routines (Ritucharya)"
		]
	},
	{
		category: "Consultation and Personal Experiences",
		categoryList: [
			"Finding an Ayurvedic Practitioner",
			"Personal Healing Stories",
			"Success Stories",
			"Challenges and Advice"
		]
	},
	{
		category: "Modern Ayurveda",
		categoryList: [
			"Integration with Western Medicine",
			"Research and Studies",
			"Innovations and Trends",
			"Ayurveda in Different Cultures"
		]
	},
	{
		category: "Ayurvedic Products and Brands",
		categoryList: [
			"Reviews and Recommendations",
			"DIY Ayurvedic Products",
			"Quality and Safety",
			"Where to Buy"
		]
	},
	{
		category: "Spirituality and Ayurveda",
		categoryList: [
			"Connection between Body, Mind, and Spirit",
			"Spiritual Practices",
			"Mantras and Chants",
			"Ayurvedic Astrology (Jyotish)"
		]
	},
	{
		category: "FAQs and Troubleshooting",
		categoryList: [
			"Common Questions",
			"Myths and Misconceptions",
			"Troubleshooting Issues",
			"Tips and Tricks"
		]
	},
	{
		category: "Events and Workshops",
		categoryList: [
			"Upcoming Events",
			"Workshops and Seminars",
			"Webinars",
			"Community Gatherings"
		]
	}
];

