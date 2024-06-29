import { ReportFormContext } from "./ReportContext";
import ReportForm from "./ReportForm";
import AskQuestion from "./AskQuestion";
import Chat from "./Chat";
import SearchBar from "./SearchBar";

function Forum() {


	return (
		<>
				<SearchBar></SearchBar>
				<AskQuestion></AskQuestion>

				<ReportFormContext>
					<Chat></Chat>
					<ReportForm></ReportForm>
				</ReportFormContext>
			
		</>

	);
}

export default Forum;