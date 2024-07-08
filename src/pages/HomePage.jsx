import LandingPage from '../components/HomePage/LandingPage';
import Main from '../components/HomePage/Main';
import Specialities from '../components/HomePage/Specialities';
import Approach from '../components/HomePage/Approach';
import Reviews from '../components/HomePage/Reviews';
import Experts from '../components/HomePage/Experts';
import HomeApp from '../components/HomePage/HomeApp';
import Footer from '../components/HomePage/Footer';
import Concerns from '../components/HomePage/Concerns';
import FAQ from '../components/HomePage/FAQ';




function HomePage() {
	return (
		<div className='font-dinpro'>
			<LandingPage></LandingPage>
			<Main></Main>
			<Specialities></Specialities>
			<Concerns></Concerns>
			<Approach></Approach>
			<Reviews></Reviews>
			<Experts></Experts>
			<FAQ></FAQ>
			<HomeApp></HomeApp>
			<Footer></Footer>
		</div>

	);
}

export default HomePage;