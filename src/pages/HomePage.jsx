import LandingPage from '../components/HomePage/LandingPage';
import Main from '../components/HomePage/Main';
import Specialities from '../components/HomePage/Specialities';
import Approach from '../components/HomePage/Approach';
import Feedback from '../components/HomePage/Feedback';
import Experts from '../components/HomePage/Experts';
import HomeApp from '../components/HomePage/HomeApp';
import Footer from '../components/HomePage/Footer';




function HomePage() {
	return (
		<>
			<LandingPage></LandingPage>
			<Main></Main>
			<Specialities></Specialities>
			<Approach></Approach>
			<Feedback></Feedback>
			<Experts></Experts>
			<HomeApp></HomeApp>
			<Footer></Footer>
		</>

	);
}

export default HomePage;