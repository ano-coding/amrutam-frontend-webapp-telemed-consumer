import Question from "./Question";
const question = {
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
}

function ForumPost() {
	return (
		<Question question={question} showAllReplies={true}></Question>
	);
}

export default ForumPost;